import axiosInstance from "./axios";

export const signup = async (signupData) => {
  const res = await axiosInstance.post("/auth/signup", signupData);
  return res.data;
};

export const login = async (loginData) => {
  const res = await axiosInstance.post("/auth/login", loginData);
  return res.data;
};

export const logout = async () => {
  try {
    const res = await axiosInstance.post("/auth/logout");
    return res.data;
  } catch (error) {
    console.log("Logout error:", error);
  }
};

export const authuser = async () => {
  try {
    const res = await axiosInstance.get("auth/me");
    return res.data;
  } catch (error) {
    console.error("Error fetching auth user:", error);
    return null;
  }
};

export const onBoarding = async (userData) => {
  const res = await axiosInstance.post("/auth/onboarding", userData);
  return res.data;
};

export const getReccomendedUsers = async () => {
  const res = await axiosInstance.get("/users/reccomendedUsers");
  return res.data;
};

export const getMyFriends = async () => {
  const res = await axiosInstance.get("/users/friends");
  return res.data;
};

export const outgoingFriendRequest = async () => {
  const res = await axiosInstance.get("/users/outgoing-request");
  return res.data;
};

export const sendFriendRequest = async (friendId) => {
  const res = await axiosInstance.post(`/users/friend-request/${friendId}`);
  return res.data;
};

export const getFriendRequest = async () => {
  const res = await axiosInstance.get("/users/friend-request");
  return res.data;
};
export const acceptFriendRequest = async (requestId) => {
  try {

    const res = await axiosInstance.put(`/users/friend-request/${requestId}/accept`);
    return res.data;
  } catch (error) {
    console.log("error in acceptFriendRequests ",error)
  }
};

export const getStreamToken=async()=>{
    const res = await axiosInstance.get("/chat/token");
    console.log("res",res.data)
  return res.data;
}

