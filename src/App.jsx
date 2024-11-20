import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";

// pages:
import Layout from "./layouts/layouts";
import Home from "./pages/home";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Soon from "./pages/soon";
import NotFound from "./pages/notfound";
import Tasks from "./pages/tasks";
import AllNotes from "./pages/allNotes";
import ArchiveNotes from "./pages/archiveNotes";
import Profile from "./pages/profile";
import Contact from "./pages/contact";

// authentication context:
import PresistLogin from "./components/auth/presistLogin";

// style files:
import "./scss/main.scss";

import { LayoutProvider } from "./context/layoutContext";
import AuthRequire from "./components/auth/authRequire";
import { AuthProvider } from "./context/authContext";
import { LoginProvider } from "./context/loginContext";
import { SignupProvider } from "./context/signupContext";
import { AllNotesProvider } from "./context/allNotesContext";
import { NoteProvider } from "./context/noteContext";
import { TasksProvider } from "./context/tasksContext";
import Note from "./pages/note";
import { ArchiveNotesProvider } from "./context/archiveNotesContext";
import { PopupProvider } from "./context/popupContext";
import { ProfileProvider } from "./context/profileContext";

if (process.env.NODE_ENV === "production") disableReactDevTools();

function App() {
  return (
    <BrowserRouter>
      <LayoutProvider>
        <PopupProvider>
          <AuthProvider>
            <Routes>
              <Route element={<Layout />}>
                <Route element={<PresistLogin />}>
                  <Route
                    path="/login"
                    element={
                      <LoginProvider>
                        <Login />
                      </LoginProvider>
                    }
                  ></Route>
                  <Route
                    path="/signup"
                    element={
                      <SignupProvider>
                        <Signup />
                      </SignupProvider>
                    }
                  ></Route>
                  <Route index element={<Home />}></Route>
                  <Route element={<AuthRequire />}>
                    <Route
                      path="/profile"
                      element={
                        <ProfileProvider>
                          <Profile />
                        </ProfileProvider>
                      }
                    ></Route>
                    <Route
                      path="/all-notes"
                      element={
                        <AllNotesProvider>
                          <AllNotes />
                        </AllNotesProvider>
                      }
                    >
                      <Route path="?tag" />
                    </Route>
                    <Route
                      path="/all-notes/note"
                      element={
                        <AllNotesProvider>
                          <NoteProvider>
                            <Note />
                          </NoteProvider>
                        </AllNotesProvider>
                      }
                    >
                      <Route path="?noteId" />
                    </Route>
                    <Route
                      path="/all-notes/archive"
                      element={
                        <AllNotesProvider>
                          <ArchiveNotesProvider>
                            <ArchiveNotes />
                          </ArchiveNotesProvider>
                        </AllNotesProvider>
                      }
                    />
                    <Route
                      path="/tasks"
                      element={
                        <TasksProvider>
                          <Tasks />
                        </TasksProvider>
                      }
                    >
                      <Route path="?status" />
                    </Route>
                    <Route path="/files" element={<Soon />}></Route>
                    <Route path="/plans" element={<Soon />}></Route>
                    <Route path="/calender" element={<Soon />}></Route>
                    <Route path="/settings" element={<Soon />}></Route>
                    <Route path="/contact-us" element={<Contact />}></Route>
                  </Route>
                </Route>
                <Route path="*" element={<NotFound />}></Route>
              </Route>
            </Routes>
          </AuthProvider>
        </PopupProvider>
      </LayoutProvider>
    </BrowserRouter>
  );
}

export default App;
