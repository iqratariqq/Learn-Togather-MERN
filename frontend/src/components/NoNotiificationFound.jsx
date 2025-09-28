import { BellIcon } from "lucide-react";

const NoNotiificationFound = () => {
  return (
    <div className=" flex flex-col items-center justify-center  ">
      <div className="bg-base-300 rounded-full  size-16 flex items-center justify-center mb-4 ">
        <BellIcon className=" size-10 text-base-content opacity-40 " />
      </div>
      <h3 className="font-semibold text-lg mb-2">No Notifications Yet</h3>
      <p className="opacity-70 text-base-content max-w-md">When you recieve friends requests or messages, they'll appear here</p>
    </div>
  );
};

export default NoNotiificationFound;
