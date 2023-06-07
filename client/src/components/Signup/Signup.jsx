import { useForm } from "react-hook-form";
import "./Signup.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchSignup, selectIsAuth } from "../../redux/slices/auth";
import { Link, Navigate } from "react-router-dom";
const Login = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  console.log(isAuth);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = async (values) => {
    const data = await dispatch(fetchSignup(values));
    if (!data.payload) {
      return alert("Authorization failed");
    }

    if ("token" in data.payload) {
      window.localStorage.setItem("token", data.payload.token);
      console.log(data.payload.token);
    } else {
      console.log("error");
    }
    console.log(data);
  };
  if (isAuth) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-sm h-[500px]">
        <div className="custom-shadow shadow-mb px-8 pt-6 pb-8 rounded-lg bg-slate-900 relative h-full overflow-hidden ">
          <div
            className="absolute w-full h-full bg-gradient-to-r from-transparent  -top-[50%] -left-[50%]
          animate-spin-slow origin-bottom-right to-[#45f3ff]"
          ></div>
          <div
            className="absolute w-full h-full bg-gradient-to-r from-transparent -top-[50%] -left-[50%]
          animate-spin-delay origin-bottom-right to-[#45f3ff]"
          ></div>
          <div className="absolute inset-1.5 bg-slate-900 rounded-lg z-10 p-5">
            <form onSubmit={handleSubmit(onSubmit)} className="text-center">
              <h1 className="relative text-blue-500  mx-auto max-w-fit text-3xl font-semibold mb-12 custom-text">
                Sign up
              </h1>
              <div className="relative flex flex-col mb-12 inputBox w-full">
                <input
                  type="text"
                  name=""
                  id="fullName"
                  required
                  className="w-full relative bg-transparent border-none outline-none shadow-none text-gray-900 text-sm transition duration-500"
                  {...register("fullName", {
                    required: "please enter Username",
                  })}
                />
                {errors.email && (
                  <div className="text-red-500 text-xs absolute -bottom-5">
                    {errors.email.message}
                  </div>
                )}

                <span className="absolute left-0 py-2 px-0 text-gray-500 text-sm transition duration-500">
                  Username
                </span>
                <i></i>
              </div>
              <div className="relative flex flex-col mb-12 inputBox w-full">
                <input
                  type="text"
                  name=""
                  id="email"
                  required
                  className="w-full py-2 px-2 bg-transparent border-none outline-none shadow-none text-gray-900 text-sm transition duration-500"
                  {...register("email", {
                    required: "please enter valid email",
                    pattern: {
                      value:
                        /[A-Za-z-z0-9._%+-]+@[A-Za-z0-0.-]+\.[A-Za-z]{1,63}$/i,
                      message: "please enter valid email",
                    },
                  })}
                />
                {errors.email && (
                  <div className="text-red-500 text-xs absolute -bottom-5">
                    {errors.email.message}
                  </div>
                )}

                <span className="absolute left-0 py-2 px-0 text-gray-500 text-sm transition duration-500">
                  Email
                </span>
                <i></i>
              </div>
              <div className="relative flex flex-col mb-12 inputBox w-full">
                <input
                  type="password"
                  name=""
                  id="password"
                  required
                  className="w-full py-2 px-1 bg-transparent border-none outline-none shadow-none text-gray-900 text-sm transition duration-500"
                  {...register("password", {
                    required: "please enter valid password",
                    minLength: {
                      value: 5,
                      message: "password must be more than 4 symbols",
                    },
                  })}
                />
                {errors.password && (
                  <div className="text-red-500 text-xs absolute -bottom-5">
                    {errors.password.message}
                  </div>
                )}
                <span className="absolute left-0 py-2 px-0 text-gray-500 text-sm transition duration-500">
                  Password
                </span>
                <i></i>
              </div>

              <button
                type="submit"
                className="relative text-[#03e9f4] uppercase tracking-[4px]
                text-[16px] border-2 border-[#03e9f4] px-[22px] py-[7px] hover:text-white
                hover:bg-[#03e9f4] custom-shadow custom-text rounded-lg hover:-translate-y-2"
              >
                Sign up
              </button>
              <div className="flex justify-center gap-5 text-gray-500 mt-3">
                Already have an account?
                <Link
                  to={"/login"}
                  className="text-sm text-[#03e9f4] custom-text hover:scale-125"
                >
                  Login
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
