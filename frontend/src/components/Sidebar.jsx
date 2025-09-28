import { Link, useLocation } from "react-router-dom";
import useAuthuser from "../hooks/useAuthuser";
import {
  BellIcon,
  HomeIcon,
  ShipWheelIcon,

  UsersIcon,
} from "lucide-react";

const Sidebar = () => {
  const { authUser } = useAuthuser();
  const location = useLocation();
  const currentPath = location.pathname;
  return (
    <aside className="w-60 bg-base-200 border-r border-base-300 hidden lg:flex flex-col h-screen sticky top-0">
      <div className=" p-5 border-b border-base-300">
        <Link to="/" className="flex items-center gap-2.5">
          <ShipWheelIcon className="size-9 text-primary" />
          <span className=" text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wide">
            ChatMe
          </span>
        </Link>
      </div>
      <nav className="flex-1 p-5 space-y-1 ">
        {/* Home */}
        <Link
          to={"/"}
          className={`btn btn-ghost w-full justify-start gap-3 normal-case ${
            currentPath === "/" ? "btn-active" : ""
          }`}
        >
          <HomeIcon className={`size-5 text-base-content opacity-70`} />
          <span>Home</span>
        </Link>
        {/* Friends */}
        <Link
          to={"/friends"}
          className={`btn btn-ghost w-full justify-start gap-3 normal-case ${
            currentPath === "/friends" ? "btn-active" : ""
          }`}
        >
          <UsersIcon className={`size-5 text-base-content opacity-70`} />
          <span>Friends</span>
        </Link>
        {/* Notifications */}
        <Link
          to={"/notifications"}
          className={`btn btn-ghost w-full justify-start gap-3 normal-case ${
            currentPath === "/notifications" ? "btn-active" : ""
          }`}
        >
          <BellIcon className={`size-5 text-base-content opacity-70`} />
          <span>Notifications</span>
        </Link>
      </nav>
      {/* userProfile */}
      <div className="mt-auto p-5 flex items-center gap-3 border-t border-base-300">
        <div className="avatar">
          <div className="w-6 rounded-full overflow-hidden">
            <img src={authUser?.profilePic} alt="User Profile" />
          </div>
        </div>
        <div className="flex-1 ">
          <p className="font-semibold text-sm">{authUser?.fullName}</p>
          <p className="text-xs flex text-success items-center gap-1">
            <span className="inline-block w-2 h-2 rounded-full bg-success" />
            Online
          </p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
