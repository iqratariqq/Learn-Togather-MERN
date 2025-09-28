import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAuthuser from "../hooks/useAuthuser";
import { logout } from "../lib/api";
import { Link, useLocation } from "react-router-dom";
import { BellIcon, LogOutIcon, ShipWheelIcon } from "lucide-react";
import SelectTheme from "./SelectTheme";

const Navbar = () => {
  const { authUser } = useAuthuser();
  const queryClient = useQueryClient();
  const location = useLocation();
  const chatPage = location.pathname.startsWith("/chat");
  // console.log("chatPage", chatPage);

  const { mutate: lougOutMutation } = useMutation({
    mutationFn: logout,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["authUser"] }),
  });
  const handleSubmit = () => {
    lougOutMutation();
  };
  return (
    <nav className="w-full bg-base-200 border-b border-base-300 h-16 flex items-center  sticky top-0 z-30">
      <div className="container  mx-auto px-4 lg:px-8 sm:px-6">
        <div className="flex  items-center w-full">
          {/* logo */}
          {chatPage && (
            <div className="pl-5">
              <Link to="/" className="flex items-center gap-2.5">
                <ShipWheelIcon className="size-9 text-primary" />
                <span className=" text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wide">
                  ChatMe
                </span>
              </Link>
            </div>
          )}

          {/* notification */}
          <div className="flex  ml-auto  items-center sm:gap-5 gap-5">
            <div>

            <Link to="/notifications">
              <button className="btn btn-ghost rounded-full">
                <BellIcon className="size-6 text-base-content opacity-70 " />
              </button>
            </Link>
            </div>
            {/* selectTheme */}
            <SelectTheme />

            {/* user profile */}
            <div className="avatar">
              <div className="w-6 rounded-full overflow-hidden">
                <img src={authUser?.profilePic} alt="User Profile" />
              </div>
            </div>
            {/* 
          logout */}
            <div>
              <button
                className="btn btn-ghost btn-circle"
                onClick={handleSubmit}
              >
                <LogOutIcon className="size-6 text-base-content opacity-70 " />
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
