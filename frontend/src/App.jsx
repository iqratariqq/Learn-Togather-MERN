import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
// pages
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import OnboardingPage from "./pages/OnboardingPage";
import HomePage from "./pages/HomePage";
import CallPage from "./pages/CallPage";
import ChatPage from "./pages/ChatPage";
import NotificationsPage from "./pages/NotificationsPage";
//component
import Loader from "./components/Loader.jsx";
//custom hook
import useAuthuser from "./hooks/useAuthuser.js";
import Layout from "./components/Layout.jsx";
import { useThemeStore } from "./store/useTheme.js";

const App = () => {
  const { isLoading, authUser } = useAuthuser();

  const isAuthenticated = Boolean(authUser);
  const { theme } = useThemeStore();

  // console.log(authUser);
  const isOnboard = authUser?.isOnboardered;
  // console.log("isOnboard", isOnboard);

  if (isLoading) return <Loader />;

  //to redircet authenticate user to home page
  const RedirectedRoute = ({ children }) => {
    if (isAuthenticated && isOnboard) {
      return <Navigate to="/" replace />;
    }
    if (isAuthenticated) {
      return <Navigate to="/onboarding" replace />;
    }
    return children;
  };
  //for protect user pages
  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }
    if (isAuthenticated && !isOnboard) {
      return <Navigate to="/onboarding" replace />;
    }
    return children;
  };

  return (
    <div className="h-screen overflow-x-hidden" data-theme={theme}>
      <Routes>
        <Route
          path="/signup"
          element={
            <RedirectedRoute>
              <SignupPage />
            </RedirectedRoute>
          }
        />
        <Route
          path="/login"
          element={
            <RedirectedRoute>
              <LoginPage />
            </RedirectedRoute>
          }
        />
        <Route
          path="/onboarding"
          element={
            isAuthenticated ? (
              !isOnboard ? (
                <OnboardingPage />
              ) : (
                <Navigate to="/" replace />
              )
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout showSidebar={true}>
                <HomePage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/call/:id"
          element={
            <ProtectedRoute>
              <CallPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/chat/:id"
          element={
            
            <ProtectedRoute>
              <Layout>
                <ChatPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/notifications"
          element={
            <ProtectedRoute>
              <Layout showSidebar={true}>
                <NotificationsPage />
              </Layout>
            </ProtectedRoute>
          }
        />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
