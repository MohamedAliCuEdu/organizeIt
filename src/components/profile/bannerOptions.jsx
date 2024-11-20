import React from "react";
import bannerImgs from "../../assets/bannerImgs.json";
import { FaCheck } from "react-icons/fa6";

function BannerOptions({ bannerUrl, handleBannerUrl }) {
  return (
    <div className="options">
      {bannerImgs.map((img) => {
        let { id, imgName, imgUrl } = img;
        let checked = bannerUrl === imgUrl;
        return (
          <div key={id} className="banner-option-container">
            <input
              type="radio"
              name={imgName}
              id={imgName}
              value={imgUrl}
              checked={checked}
              onChange={() => handleBannerUrl(imgUrl)}
            />
            <label htmlFor={imgName}>
              <div className="img-box">
                <img src={imgUrl} alt={imgName} />
                {checked && <FaCheck className="check-mark" />}
              </div>
            </label>
          </div>
        );
      })}
    </div>
  );
}

export default BannerOptions;
