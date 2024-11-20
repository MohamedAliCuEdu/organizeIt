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
      console.log(data);
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
    try {
      // check if avatarColor is exist & its not the same:
      if (avatarColor && userData?.avatarColor !== avatarColor) {
        await axiosPrivateApi.patch(URL + "profile", { avatarColor });
        setAuth((prev) => ({
          ...prev,
          userInfo: { ...prev.userInfo, avatarColor },
        }));
        setUserData((prev) => ({ ...prev, avatarColor }));
        handleSuccess(
          "avatar color changed successfully.",
          handleAvatarPopupView
        );
      }
    } catch (err) {
      console.log(err);
      handleErrMsg("failed to change avatar color!");
    }
  };
  // 3. update banner url color api:
  const updateBannerUrlApi = async (e, bannerUrl) => {
    e.preventDefault();
    try {
      // check if bannerUrl is exist & its not the same:
      if (bannerUrl && userData?.bannerUrl !== bannerUrl) {
        await axiosPrivateApi.patch(URL + "profile", { bannerUrl });
        handleSuccess("banner changed successfully.", handleBannerPopupView);
        setUserData((prev) => ({ ...prev, bannerUrl }));
      }
    } catch (err) {
      console.log(err);
      handleErrMsg("failed to change banner img!");
    }
  };
  // 3) quote section functions:
  // 3. update quote api:
  const updateQuoteApi = async (e, quote) => {
    e.preventDefault();
    try {
      await axiosPrivateApi.patch(URL + "profile", { quote });
      setUserData((prev) => ({ ...prev, quote }));
      handleSuccess("your quote changed successfully.");
    } catch (err) {
      console.log(err);
      handleErrMsg("failed to change quote!");
    }
  };
  // 3. remove quote api:
  const removeQuoteApi = async () => {
    try {
      await axiosPrivateApi.patch(URL + "profile", { quote: "" });
      setUserData((prev) => ({ ...prev, quote: "" }));
    } catch (err) {
      console.log(err);
      handleErrMsg("failed to remove quote!");
    }
  };
  // update user info api:
  const updateUserInfoApi = async (e, userInfo) => {
    e.preventDefault();
    try {
      await axiosPrivateApi.put(URL + "personal_info", userInfo);
      setUserData((prev) => ({ ...prev, ...userInfo }));
      handleSuccess(MESSAGES.success.updateUserInfo);
    } catch (err) {
      console.log(err);
      handleErrMsg(MESSAGES.errors.updateUserInfo);
    }
  };
  // 3. add favourite item api:
  const addFavouriteItemApi = async (e, favouriteType, newItem) => {
    e.preventDefault();
    try {
      // 1. create new fav list array:
      let updatedList = [...userFavourites[favouriteType], newItem];
      // 1. make api request:
      await axiosPrivateApi.patch(URL + "favourites", {
        [favouriteType]: updatedList,
      });
      // 2. update favourite state1:
      setUserFavourites((prev) => ({
        ...prev,
        [favouriteType]: updatedList,
      }));
    } catch (err) {
      console.log(err);
      handleErrMsg("failed to update list!");
    }
  };
  // 3.remove favourite item api:
  const removeFavouriteItemApi = async (favouriteType, targetItem) => {
    try {
      // 1. filter favourite items by create new array:
      let filterList = userFavourites[favouriteType].filter(
        (e) => e !== targetItem
      );
      // 2. make api request:
      await axiosPrivateApi.patch(URL + "favourites", {
        [favouriteType]: filterList,
      });
      // 3. update user favourites state:
      setUserFavourites((prev) => ({ ...prev, [favouriteType]: filterList }));
    } catch (err) {
      console.log(err);
      handleErrMsg("failed to remove item!");
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
