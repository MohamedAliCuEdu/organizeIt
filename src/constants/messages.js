const MESSAGES = {
  errors: {
    default: "error has occured!",
    failedLoadData:
      "Something went wrong while trying to load the information. Please refresh or come back soon!",
    invalidUsername:
      "5 to 20 charaters,\n must being with a letter, letters, numbers, underscores allowed.",
    invalidPassword:
      "Password must be at least 8 characters,\n long and must include uppercase letters & lowercase letters, numbers, special characters: @#$%^&+=!.",
    wrongPassword: "The password you entered is incorrect. Please try again.",
    sameOldPassword: "New password cannot match the old password.",
    passwordMismatch: "Passwords do not match!",
    requiredField: "This field is required.",
    invalidTag:
      "Invalid tag! Tags must be 1-10 characters long and can include letters, numbers, dashes, and underscores.",
    updateUserInfo: "failed to update your personal information!",
  },
  success: {
    login: "Logged in successfully!",
    sendMessage: "Message sent successfully!",
    signup: "Registration completed successfully!",
    updateProfile: "Profile updated successfully!",
    addNote: "Note added successfully!",
    changeCredentials: "Your username and password have been updated. Logging out...",
    updateUserInfo: "your information updated successfully.",
  },
  confirm: {
    deleteAllNotes: "Are you sure you want to delete all notes?",
    deleteSingleNote: "Are you sure you want to delete this note?",
    archiveAllNotes: "do you want to archive all notes?",
    archiveSingleNote: "do you want to archive this note?",
    unArchiveAllNotes: "do you want to unArchive all notes?",
    urAchiveSingleNote: "do you want to unarchive this note?",
    logout: "Are you sure you want to log out?",
    removeQuote: "Are you sure quotewant remove quote?",
    unsavedChanges:
      "You have unsaved changes. Are you sure you want to leave without saving?",
    resetSettings:
      "Are you sure you want to reset all settings to default values?",
  },
};

export default MESSAGES;
