import { useQuery } from "@tanstack/react-query";
import { authuser } from "../lib/api.js";

const useAuthuser = () => {
  const authUser= useQuery({
    queryKey: ["authUser"],
    queryFn:authuser, 
    retry: false,
  });
  // console.log("in usequery",authUser.data?.user)
  //   console.log("query status in usequery", authUser.status); // loading | error | success
  // console.log("query error in usequery", authUser.error);
  return {isLoading:authUser.isLoading,authUser:authUser.data?.user}
}

export default useAuthuser
