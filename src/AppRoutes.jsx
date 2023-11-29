import { Route, Routes, Outlet, Navigate } from "react-router-dom";
import {
  Container,
  SignUpForm,
  ForgotPasswordForm,
  RegistrationForm,
  PasswordFormModal,
} from "./components";
import { Registration, Home, Notifications, Post, Profile } from "./pages";
import { useSelector } from "react-redux";
import { CurrentUser } from "./pages/СurrentUser/CurrenUser";

export default function AppRoutes() {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  return (
    <Routes>
      <Route
        path="/"
        element={
          isAuthenticated ? (
            <Container>
              <Outlet />
            </Container>
          ) : (
            <Navigate to="/login" />
          )
        }>
        <Route index element={<Home />} />
        <Route path="/explore" element={<div>Explore</div>} />

        <Route path="/notifications" element={<Notifications />} />
        <Route path="/messages" element={<div>Messages</div>} />
        <Route path="/lists" element={<div>Lists</div>} />
        <Route path="/communities" element={<div>Communities</div>} />
        <Route path="/verified" element={<div>Verified</div>} />
        <Route
          path="/profile"
          element={
            <div>
              <Profile />
            </div>
          }
        />
        <Route path="/more" element={<div>More</div>} />
        <Route path="/post/:id" element={<Post />} />
        <Route path="/user/:id" element={<CurrentUser />} />

        <Route
          path="/registration"
          element={
            <>
              <Registration />
              <RegistrationForm />
            </>
          }
        />
        <Route
          path="/passwordForm"
          element={
            <>
              <Registration />
              <PasswordFormModal />
            </>
          }
        />

        <Route path="/bookmarks" element={<div>Bookmarks</div>} />
      </Route>
      <Route
        path="/signUpForm"
        element={
          <>
            <Registration />
            <SignUpForm />
          </>
        }></Route>
      <Route path="/forgotPasswordForm" element={<ForgotPasswordForm />}></Route>
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/" /> : <Registration />}
      />
    </Routes>
  );
}
