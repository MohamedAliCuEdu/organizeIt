import React, { useState } from "react";
import arrOfCountries from "../../assets/countries.json";
import useProfileContext from "../../hooks/useProfileContext";
import FormBtns from "../buttons/formBtns";
import { BsPersonLinesFill } from "react-icons/bs";
import formatDateToInput from "../../utils/formatDateToInput";

function PersonalInfoSection() {
  const { userData, updateUserInfoApi } = useProfileContext();
  // 1. states:
  const [infoEditing, setInfoEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({});

  React.useEffect(() => {
    setUserInfo({
      fname: userData.fname,
      lname: userData.lname,
      gender: userData.gender,
      birthDate: formatDateToInput(userData.birthDate),
      country: userData.country,
      education: userData.education,
    });
  }, [userData]);

  // 2. handle user info editing state:
  const handleInfoEditing = () => {
    setInfoEditing(!infoEditing);
  };
  // 3. handle inputs change:
  const handleInputChange = (e) => {
    setUserInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  return (
    <section className="personal-info-section">
      <h3>
        <BsPersonLinesFill />
        personal info:
      </h3>
      <form
        method="POST"
        className={`user-info-form ${infoEditing && "open-form"}`}
        onSubmit={(e) => updateUserInfoApi(e, userInfo)}
      >
        <div className="input-div fname-div required-field">
          <label htmlFor="fname">first name:</label>
          <input
            type="text"
            className="input-full-wd"
            id="fname"
            name="fname"
            value={userInfo?.fname || ""}
            onChange={handleInputChange}
            minLength="3"
            maxLength="30"
            disabled={!infoEditing}
            required
          />
        </div>
        <div className="input-div lname-div required-field">
          <label htmlFor="lname">last name:</label>
          <input
            type="text"
            className="input-full-wd"
            id="lname"
            name="lname"
            value={userInfo?.lname || ""}
            onChange={handleInputChange}
            minLength="3"
            maxLength="30"
            disabled={!infoEditing}
            required
          />
        </div>
        <div className="input-div gender-div required-field">
          <label htmlFor="gender">gender:</label>
          <select
            name="gender"
            id="gender"
            value={userInfo?.gender || "male"}
            onChange={handleInputChange}
            disabled={!infoEditing}
            required
          >
            <option value="male">male</option>
            <option value="female">female</option>
          </select>
        </div>
        <div className="input-div birthDate-div required-field">
          <label htmlFor="birthDate">birth date:</label>
          <input
            name="birthDate"
            id="birthDate"
            type="date"
            value={userInfo?.birthDate || ""}
            onChange={handleInputChange}
            disabled={!infoEditing}
            required
          ></input>
        </div>
        <div className="input-div country-div required-field">
          <label htmlFor="country">country:</label>
          <select
            name="country"
            id="country"
            value={userInfo?.country || ""}
            onChange={handleInputChange}
            disabled={!infoEditing}
            required
          >
            <option value="">-- select country --</option>
            {arrOfCountries.map((c) => {
              return (
                <option key={c.code} value={c.name}>
                  {c.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="input-div education-div">
          <label htmlFor="education">education:</label>
          <input
            type="text"
            className="input-full-wd"
            id="education"
            name="education"
            minLength="3"
            maxLength="50"
            value={userInfo?.education || ""}
            onChange={handleInputChange}
            disabled={!infoEditing}
          />
        </div>
        {infoEditing ? (
          <FormBtns
            submitValue="save"
            backValue="back"
            handleBackBtn={handleInfoEditing}
          />
        ) : (
          <div className="form-btns">
            <button className="md-btn blue-btn" onClick={handleInfoEditing}>
              edit
            </button>
          </div>
        )}
      </form>
    </section>
  );
}

export default PersonalInfoSection;
