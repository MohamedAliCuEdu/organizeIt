import React, { useState, lazy, Suspense } from "react";
import useProfileContext from "../../hooks/useProfileContext";
import SectionPopup from "../popups/components/section.popup";
import FormBtns from "../buttons/formBtns";

const BannerOptions = lazy(() => import("./bannerOptions"));

function BannerEditPopup() {
  const { userData, handleBannerPopupView, updateBannerUrlApi } =
    useProfileContext();
  // 1. states:
  const [bannerUrl, setBannerUrl] = useState(
    userData?.bannerUrl || "./banners/banner-01.jpg"
  );
  // handle bannerUrl change:
  const handleBannerUrl = (val) => {
    console.log(val)
    setBannerUrl(val);
  };
  // reset bannerUrl:
  const handleReset = () => {
    setBannerUrl("./banners/banner-01.jpg");
  };
  return (
    <SectionPopup
      popupName="banner-edit-popup"
      callBack={handleBannerPopupView}
    >
      <form
        className="select-banner-form"
        method="POST"
        onSubmit={(e) => updateBannerUrlApi(e, bannerUrl)}
      >
        <h3 className="popup-title">change banner:</h3>
        <Suspense fallback={<h2 className="loading">loading...</h2>}>
          <BannerOptions
            bannerUrl={bannerUrl}
            handleBannerUrl={handleBannerUrl}
          />
        </Suspense>
        <FormBtns
          submitValue="save"
          backValue="reset"
          disabled={userData.bannerUrl === bannerUrl}
          handleBackBtn={handleReset}
        />
      </form>
    </SectionPopup>
  );
}

export default React.memo(BannerEditPopup);
