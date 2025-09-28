import { useState } from "react";
import { Loader2, ShipWheelIcon } from "lucide-react";
import { Link } from "react-router";
import useLogin from "../hooks/useLogin.js";

const LoginPage = () => {
  // const queryClient = useQueryClient();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  //without custom hook
  // const {
  //   mutate: loginMutation,
  //   isPending,
  //   error,
  // } = useMutation({
  //   mutationFn: login,
  //   onSuccess: () => queryClient.invalidateQueries({ queryKey: ["authUser"] }),
  // });
  const { isPending, error, loginMutation } = useLogin();

  const handleSubmit = (e) => {
    e.preventDefault();
    loginMutation(loginData);
  };

  return (
    <div className="h-screen  flex items-center justify-center p-4 sm:p-6 md:p-8"      data-theme="forest">
      <div className="flex flex-col border border-primary/25 lg:flex-row w-full max-w-5xl shadow-xl bg-base-100 mx-auto overflow-hidden rounded-lg  ">
        {/* logo */}
        <div className="flex flex-col lg:w-1/2 w-full max-w-5xl p-4 sm:p-8  ">
          <div className="flex  items-center gap-2 mb-4">
            <ShipWheelIcon className="size-9 text-primary" />
            <span className=" text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wide">
              ChatMe
            </span>
          </div>
          {/* left side of signup page */}
          <div className="w-full">
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <h2 className="font-semibold text-xl">Welcome Back</h2>
                  <p className="text-sm opacity-70">
                    Log in to your account and continue your language learning
                    journey
                  </p>
                </div>
                {/* email */}
                <div className="form-control ">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    placeholder="jone@gmail.com"
                    className="input input-bordered"
                    value={loginData.email}
                    onChange={(e) =>
                      setLoginData({ ...loginData, email: e.target.value })
                    }
                    required
                  />
                </div>
                {/* password */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    type="password"
                    placeholder="********"
                    className="input input-bordered"
                    value={loginData.password}
                    onChange={(e) =>
                      setLoginData({ ...loginData, password: e.target.value })
                    }
                    required
                  />
                </div>
                {/* submit button  and error display*/}
                {error?.message && (
                  <p className="alert alert-error  mt-2">
                    {" "}
                    {error.response?.data?.message || error.message}
                  </p>
                )}
                <button className=" btn btn-primary w-full " type="submit">
                  {isPending ? (
                    <Loader2 className="m-auto size-15 animate-spin" />
                  ) : (
                    " Login"
                  )}
                </button>
                <div className="text-sm opacity-70">
                  <p>
                    Don't have an account?{" "}
                    <Link to="/signup" className="text-primary hover:underline">
                      Sign Up
                    </Link>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* right side of signup */}
        <div className="hidden lg:w-1/2 lg:flex justify-center items-center bg-primary/10 ">
          <div className="max-w-md">
            <div className="relative aspect-square mx-auto max-w-sm">
              <img src="/call.png" alt="Language connection illustration" />
            </div>
            <div className="text-center space-y-3 mt-6 mb-5">
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

export default LoginPage;
