import React from "react";
import ProfileIndex from "../components/profile/profileIndex";
import useProfileContext from "../hooks/useProfileContext";

import { MdLocalMovies } from "react-icons/md";
import { IoIosMusicalNotes } from "react-icons/io";
import { IoFastFood } from "react-icons/io5";
import { RiDrinks2Fill } from "react-icons/ri";
import ErrorDiv from "../components/error-div";
import MESSAGES from "../constants/messages";

function Profile() {
  console.log("---profile page");
  const { isLoading, fetchDataErr, avatarEditView, bannerEditView } =
    useProfileContext();

  return (
    <main className="profile-page">
      <div className="container">
        {isLoading ? (
          <ProfileIndex.SkeletonProfileLoader />
        ) : fetchDataErr ? (
          <ErrorDiv msg={MESSAGES.errors.failedLoadData} />
        ) : (
          <>
            <ProfileIndex.ProfileHeader />
            <ProfileIndex.QuoteSection />
            <ProfileIndex.PersonalInfoSection />
            <ProfileIndex.favouriteRowSection
              sectionName="fav-foods"
              title="favourite foods"
              name="favFoods"
              metaColor="orange"
              placeholder="add food's name..."
            >
              <IoFastFood />
            </ProfileIndex.favouriteRowSection>
            <ProfileIndex.favouriteRowSection
              sectionName="fav-drinks"
              title="favourite drinks"
              name="favDrinks"
              metaColor="blue"
              placeholder="add drinks's name..."
            >
              <RiDrinks2Fill />
            </ProfileIndex.favouriteRowSection>
            <ProfileIndex.favouriteRowSection
              sectionName="fav-movies"
              title="favourite movies"
              name="favMovies"
              metaColor="purple"
              placeholder="add movies's name..."
            >
              <MdLocalMovies />
            </ProfileIndex.favouriteRowSection>
            <ProfileIndex.favouriteRowSection
              sectionName="fav-songs"
              title="favourite songs"
              name="favSongs"
              metaColor="green"
              placeholder="add songs's name..."
            >
              <IoIosMusicalNotes />
            </ProfileIndex.favouriteRowSection>
          </>
        )}
      </div>
      {avatarEditView && <ProfileIndex.AvatarEditPopup />}
      {bannerEditView && <ProfileIndex.BannerEditPopup />}
    </main>
  );
}

export default Profile;
