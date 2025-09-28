import { useState } from "react";
import { Loader2, ShipWheelIcon } from "lucide-react";
import { Link } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signup } from "../lib/api";

const SignupPage = () => {
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const queryClient = useQueryClient();

  const {
    mutate: signupMutation,
    isPending,
    error,
  } = useMutation({
    mutationFn: signup,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["authUser"] }),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    signupMutation(signupData);
  };
  
  return (
    <div
      className="h-screen  flex items-center justify-center p-4 sm:p-6 md:p-8"
      data-theme="forest"
    >
      <div className="flex flex-col border border-primary/25 bg-base-100 lg:flex-row w-full max-w-5xl mx-auto overflow-hidden rounded-lg shadow-lg ">
        {/* signup left side */}
        <div className=" w-full flex flex-col lg:w-1/2 p-4 sm:p-8  ">
          {/* logo */}
          <div className="flex  items-center gap-2 mb-4">
            <ShipWheelIcon className="size-9 text-primary" />
            <span className=" text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wide">
              ChatMe
            </span>
          </div>
          {/* signup form */}
          <div className="w-full">
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <h2 className="font-semibold text-xl">Create an Account</h2>
                  <p className="text-sm opacity-70">
                    Join ChatMe and start a language learning adventure
                  </p>
                </div>
                <div className="space-y-3">
                  {/* FullName input */}
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text"> Full Name</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Iqra Tariq"
                      className="input input-bordered w-full"
                      value={signupData.fullName}
                      onChange={(e) =>
                        setSignupData({
                          ...signupData,
                          fullName: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  {/* Email input */}
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">Email</span>
                    </label>
                    <input
                      type="email"
                      placeholder="iqra@gmail.com"
                      className="input input-bordered w-full"
                      value={signupData.email}
                      onChange={(e) =>
                        setSignupData({
                          ...signupData,
                          email: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  {/* Password input */}
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text"> Password</span>
                    </label>
                    <input
                      type="password"
                      placeholder="******"
                      className="input input-bordered w-full"
                      value={signupData.password}
                      onChange={(e) =>
                        setSignupData({
                          ...signupData,
                          password: e.target.value,
                        })
                      }
                      required
                    />
                    <p className="text-xs mt-1 opacity-70">
                      {" "}
                      Password must be at lesat 6 characters long
                    </p>
                  </div>
                  <div className="form-control">
                    <label className=" cursor-pointer justify-start label gap-2">
                      <input
                        type="checkbox"
                        className="checkbox  checkbox-sm"
                        required
                      />
                      <span className="text-xs leading-tight">
                        I agree to the{" "}
                        <span className="text-primary hover:underline ">
                          {" "}
                          terms of service
                        </span>{" "}
                        and{" "}
                        <span className="text-primary hover:underline ">
                          {" "}
                          privacy policy
                        </span>
                      </span>
                    </label>
                  </div>
                </div>
                {error?.message && (
                  <p className="alert alert-error  mt-2">
                    {" "}
                    {error.response?.data?.message || error.message}
                  </p>
                )}
                <button className=" btn btn-primary w-full" type="submit">
                  {isPending ? (
                    <Loader2 className="m-auto size-15 animate-spin" />
                  ) : (
                    " Sign Up"
                  )}
                </button>
                <div className=" text-center text-sm">
                  <p>
                    {" "}
                    Already have an account ?{" "}
                    <Link to="/login" className=" text-primary hover:underline">
                      SignIn
                    </Link>{" "}
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
        {/* signup right side */}
        <div className="hidden lg:flex w-full  lg:w-1/2  bg-primary/10 justify-center items-center ">
          <div className="max-w-md p-8">
            <div className=" relative aspect-square max-w-sm mx-auto">
              <img src="/call.png" alt="Language connection illustration" />
            </div>
            <div className="text-center space-y-3 mt-6">
              <h2 className="text-xl font-semibold">
                {" "}
                Connect with language partners worldwide
              </h2>
              <p className="opacity-70">
                Practice conversations,make friends, and improve your language
                skills.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
