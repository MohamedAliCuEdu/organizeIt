import React, { useState, createContext } from "react";
import useAuth from "../hooks/useAuth";
import usePrivateAxios from "../hooks/usePrivateAxios";
import useAxiosGetData from "../hooks/useAxiosGetData";
import usePopupContext from "../hooks/usePopupContext";
import MESSAGES from "../constants/messages";

const ProfileContext = createContext({});

export function ProfileProvider({ children }) {
  const { auth, setAuth } = useAuth();
  const axiosPrivateApi = usePrivateAxios();
  const { handleErrMsg, handleSuccess } = usePopupContext();

  const URL = `users/${auth.userInfo.userId}/`;

  // 1) profile states:
  // 1. managing user data:
  const [userData, setUserData] = useState({});
  const [userFavourites, setUserFavourites] = useState({});
  // 2. header states:
  const [avatarEditView, setAvatarEditView] = useState(false);
  const [bannerEditView, setBannerEditView] = useState(false);

  // 1. fetch user data:
  const { data, isLoading, fetchDataErr } = useAxiosGetData({
    axiosInstance: axiosPrivateApi,
    url: URL,
  });
  React.useEffect(() => {
    if (data) {
      const { favourites, ...info } = data;
      setUserData(info);
      setUserFavourites(favourites);
    }
  }, [data]);

  // 1. handle popups view:
  const handleAvatarPopupView = () => {
    setAvatarEditView(!avatarEditView);
  };
  const handleBannerPopupView = () => {
    setBannerEditView(!bannerEditView);
  };

  // 2. update avatar bg color api:
  const updateAvatarColorApi = async (e, avatarColor) => {
    e.preventDefault();
    // 1. Backup the current states:
    const originalUserData = { ...userData };
    const originalAuth = { ...auth };
    try {
      // check if avatarColor is exist & its not the same:
      if (avatarColor && userData?.avatarColor !== avatarColor) {
        // 2. update state:
        setAuth((prev) => ({
          ...prev,
          userInfo: { ...prev.userInfo, avatarColor },
        }));
        setUserData((prev) => ({ ...prev, avatarColor }));
        // 3. make patch request api:
        await axiosPrivateApi.patch(URL + "profile", { avatarColor });
        handleSuccess(
          "avatar color changed successfully.",
          handleAvatarPopupView
        );
      }
    } catch (err) {
      console.log(err);
      handleErrMsg("failed to change avatar color!");
      // Rollback state if the request fails:
      setUserData({ ...originalUserData });
      setAuth([...originalAuth]);
    }
  };
  // 3. update banner url color api:
  const updateBannerUrlApi = async (e, bannerUrl) => {
    e.preventDefault();
    // 1. Backup the current state:
    const originalUserData = { ...userData };
    try {
      // check if bannerUrl is exist & its not the same:
      if (bannerUrl && userData?.bannerUrl !== bannerUrl) {
        // 2. update state:
        setUserData((prev) => ({ ...prev, bannerUrl }));
        // 3. make patch request api:
        await axiosPrivateApi.patch(URL + "profile", { bannerUrl });
        handleSuccess("banner changed successfully.", handleBannerPopupView);
      }
    } catch (err) {
      console.log(err);
      handleErrMsg("failed to change banner img!");
      // Rollback state if the request fails:
      setUserData({ ...originalUserData });
    }
  };
  // 3) quote section functions:
  // 1. update quote api:
  const updateQuoteApi = async (e, quote) => {
    e.preventDefault();
    // 1. Backup the current state:
    const originalUserData = { ...userData };
    try {
      // 2. update state:
      setUserData((prev) => ({ ...prev, quote }));
      // 3. make patch request api:
      await axiosPrivateApi.patch(URL + "profile", { quote });
      handleSuccess("your quote changed successfully.");
    } catch (err) {
      console.log(err);
      handleErrMsg("failed to change quote!");
      // Rollback state if the request fails:
      setUserData({ ...originalUserData });
    }
  };
  // 3. remove quote api:
  const removeQuoteApi = async () => {
    // 1. Backup the current state:
    const originalUserData = { ...userData };
    try {
      // 2. update state:
      setUserData((prev) => ({ ...prev, quote: "" }));
      // 3. make patch request api:
      await axiosPrivateApi.patch(URL + "profile", { quote: "" });
    } catch (err) {
      console.log(err);
      handleErrMsg("failed to remove quote!");
      // Rollback state if the request fails:
      setUserData({ ...originalUserData });
    }
  };
  // update user info api:
  const updateUserInfoApi = async (e, userInfo) => {
    e.preventDefault();
    // 1. Backup the current state:
    const originalUserData = { ...userData };
    try {
      // 2. update state:
      setUserData((prev) => ({ ...prev, ...userInfo }));
      // 3. make put request api:
      await axiosPrivateApi.put(URL + "personal_info", userInfo);
      handleSuccess(MESSAGES.success.updateUserInfo);
    } catch (err) {
      console.log(err);
      // Rollback state if the request fails:
      setUserData({ ...originalUserData });
      handleErrMsg(MESSAGES.errors.updateUserInfo);
    }
  };
  // 3. add favourite item api:
  const addFavouriteItemApi = async (e, favouriteType, newItem) => {
    e.preventDefault();
    // 1. Backup the current state:
    const originalList = { ...userFavourites };
    try {
      // 2. update state:
      // create new fav list array:
      let updatedList = [...userFavourites[favouriteType], newItem];
      // update favourite state1:
      setUserFavourites((prev) => ({
        ...prev,
        [favouriteType]: updatedList,
      }));
      // 2. make patch request api:
      await axiosPrivateApi.patch(URL + "favourites", {
        [favouriteType]: updatedList,
      });
    } catch (err) {
      console.log(err);
      handleErrMsg("failed to update list!");
      // Rollback state if the request fails:
      setUserFavourites({...originalList});
    }
  };
  // 3.remove favourite item api:
  const removeFavouriteItemApi = async (favouriteType, targetItem) => {
    // 1. Backup the current state:
    const originalList = { ...userFavourites };
    try {
      // 2. update state:
      // filter favourite items by create new array:
      let filterList = userFavourites[favouriteType].filter(
        (e) => e !== targetItem
      );
      setUserFavourites((prev) => ({ ...prev, [favouriteType]: filterList }));
      // 2. make patch request api:
      await axiosPrivateApi.patch(URL + "favourites", {
        [favouriteType]: filterList,
      });
    } catch (err) {
      console.log(err);
      handleErrMsg("failed to remove item!");
      // Rollback state if the request fails:
      setUserFavourites({...originalList});
    }
  };

  return (
    <ProfileContext.Provider
      value={{
        isLoading,
        fetchDataErr,
        userData,
        userFavourites,
        avatarEditView,
        bannerEditView,
        handleAvatarPopupView,
        handleBannerPopupView,
        updateAvatarColorApi,
        updateBannerUrlApi,
        updateQuoteApi,
        removeQuoteApi,
        updateUserInfoApi,
        addFavouriteItemApi,
        removeFavouriteItemApi,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}

export default ProfileContext;
