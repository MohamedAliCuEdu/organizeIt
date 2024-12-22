import React from "react";
import { GiNotebook } from "react-icons/gi";

function HomeIntro() {
  return (
    <div className="home-intro">
      <GiNotebook className="home-icon" />
      <h1>welcome, to OrganizeIt!</h1>
      <p>
        welcome to OrganizeIt, your all-in-one solution for organizing your
        life. whether you're managing your to-do lists, planning your next big
        project, storing important files, or keeping your study notes in order,
        OrganizeIt is here to help
      </p>
    </div>
  );
}

export default React.memo(HomeIntro);
