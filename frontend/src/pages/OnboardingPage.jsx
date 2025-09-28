import { use, useState } from "react";
import useAuthuser from "../hooks/useAuthuser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { onBoarding } from "../lib/api";
import {
  CameraIcon,
  Loader,
  Loader2,
  MapPinIcon,
  ShipWheelIcon,
  ShuffleIcon,
} from "lucide-react";
import { LANGUAGES } from "../constants";

const OnboardingPage = () => {
  const { authUser } = useAuthuser();

  const queryClient = useQueryClient();

  const [userData, setUserData] = useState({
    fullName: authUser?.fullName || "",
    bio: authUser?.bio || "",
    profilePic: authUser?.profilePic || "",
    nativeLanguage: authUser?.nativeLanguage || "",
    learningLanguage: authUser?.learningLanguage || "",
    location: authUser?.location || "",
  });

  // console.log("user profile", authUser?.profilePic);
  const { mutate: onBoardingMutation, isPending } = useMutation({
    mutationFn: onBoarding,
    onSuccess: () => {
      toast.success("profile Successfully updated"),
        queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: (error) => {
      // console.log("error in onboarding", error);
      toast.error(error?.response?.data?.message || "Error in onboarding");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onBoardingMutation(userData);
  };
  const handleRandomAvatar = (e) => {
    e.preventDefault();
    const indx = Math.floor(Math.random() * 100) + 1;
    const avatar = `https://avatar.iran.liara.run/public/${indx}.png`;
    setUserData({ ...userData, profilePic: avatar });

    toast.success("Random image generated");
  };

  return (
    <div className="min-h-screen  flex items-center justify-center p-4 bg-base-100">
      <div className="card w-full max-w-4xl  bg-base-200 shadow-xl ">
        <div className="card-body p-6 sm:p-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6">
            Complete Your Profile
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* image container */}

            <div className="flex flex-col items-center space-y-4 ">
              {/* image preview */}
              <div className="size-32 rounded-full overflow-hidden  bg-base-300">
                {userData?.profilePic ? (
                  <img
                    src={userData.profilePic}
                    alt="Profile Picture"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="h-full flex items-center justify-center">
                    <CameraIcon className="size-24 text-base-content opacity-40" />
                  </div>
                )}
              </div>
              {/* generate random avatar image btn */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className="btn btn-accent"
                  onClick={handleRandomAvatar}
                >
                  <ShuffleIcon className="size-4 mr-2" />
                  Generate Random Avatar
                </button>
              </div>
              <div className="space-y-3 w-full ">
                <div className="form-control ">
                  <label className="label">
                    <span className="label-text">Full Name</span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    value={userData.fullName}
                    disabled={true}
                  />
                </div>
                <div className="form-control ">
                  <label className="label">
                    <span className="label-text">bio</span>
                  </label>
                  <input
                    name="bio"
                    className="textarea textarea-bordered h-24"
                    value={userData.bio}
                    onChange={(e) =>
                      setUserData({ ...userData, bio: e.target.value })
                    }
                    placeholder="Tell others about yourself and your language learning goals..."
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* native language */}
                  <div className="form-control ">
                    <label className="label">
                      <span className="label-text">Native Language</span>
                    </label>
                    <select
                      className="select  select-bordered w-full"
                      name="nativeLanguage"
                      value={userData.nativeLanguage}
                      onChange={(e) =>
                        setUserData({
                          ...userData,
                          nativeLanguage: e.target.value,
                        })
                      }
                    >
                      <option value="">Select your native language</option>
                      {LANGUAGES.map((lang) => (
                        <option
                          key={`native-${lang}`}
                          value={lang.toLowerCase()}
                        >
                          {lang}
                        </option>
                      ))}
                    </select>
                  </div>
                  {/* learning language */}
                  <div className="form-control ">
                    <label className="label">
                      <span className="label-text">Learning Language</span>
                    </label>
                    <select
                      className="select  select-bordered w-full"
                      name="learningLanguage"
                      value={userData.learningLanguage}
                      onChange={(e) =>
                        setUserData({
                          ...userData,
                          learningLanguage: e.target.value,
                        })
                      }
                    >
                      <option value="">
                        Select the language you are learning
                      </option>
                      {LANGUAGES.map((lang) => (
                        <option
                          key={`learning-${lang}`}
                          value={lang.toLowerCase()}
                        >
                          {lang}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
            {/* location */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Location</span>
              </label>
              <div className="relative">
                <MapPinIcon className="absolute  top-1/2 transform -translate-y-1/2 left-3 size-5 text-base-content opacity-70" />
                <input
                  type="text"
                  name="location"
                  className="input input-bordered w-full pl-10"
                  value={userData.location}
                  onChange={(e) =>
                    setUserData({ ...userData, location: e.target.value })
                  }
                  placeholder="City, Country"
                />
              </div>
            </div>
            {/* submit button */}
            <button
              disabled={isPending}
              className="btn btn-primary w-full"
              type="submit"
            >
              {!isPending ? (
                <>
                  <ShipWheelIcon className=" size-5 mr-2 " />
                  <span>Complete Profile</span>
                </>
              ) : (
                <>
                  <Loader className="size-5 animate-spin mr-2" />
                  <span>Updating....</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;
