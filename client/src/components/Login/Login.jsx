import React from "react";
import { useForm } from "react-hook-form";
import "./Login.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchLogin, selectIsAuth } from '../../redux/slices/auth';
import { Navigate } from "react-router-dom";
const Login = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const {
    handleSubmit,
    register,
    formState: { errors, isDirty, isValid },
  } = useForm();

  const onSubmit = async(values) => {
    const data = await dispatch(fetchLogin(values));
    if(!data.payload){
      return alert('Authorization failed');
    }

    if('token' in data.payload){
      window.localStorage.setItem('token', data.payload.token);
    }
    console.log(data);
    // You can perform your login logic here
  };
  if(isAuth){
    return <Navigate to={'/'} />
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-sm h-[400px]">
        <div className="custom-shadow shadow-mb px-8 pt-6 pb-8 rounded-lg bg-slate-900 relative h-full overflow-hidden ">
          <div
            className="absolute w-full h-full bg-gradient-to-r from-blue-500 via-blue-500 -top-[50%] -left-[50%]
          animate-spin-slow origin-bottom-right to-transparent"
          ></div>
          <div
            className="absolute w-full h-full bg-gradient-to-r from-blue-500 via-blue-500 -top-[50%] -left-[50%]
          animate-spin-delay origin-bottom-right to-transparent"
          ></div>
          <div className="absolute inset-1.5 bg-slate-900 rounded-lg z-10 p-5">
            <form onSubmit={handleSubmit(onSubmit)} className="text-center">
              <h1 className="relative text-blue-600 text-center text-3xl font-semibold mb-12 custom-text">
                Login
              </h1>
              <div className="relative flex flex-col mb-12">
                <input
                  type="text"
                  id="email"
                  autoFocus
                  placeholder=" "
                  className="relative z-10 border-0 border-b-2 border-blue-500 h-10 bg-transparent text-gray-100 outline-none px-2 peer"
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
                <i
                  className="bg-blue-500 rounded w-full 
                bottom-0 left-0 absolute h-10 -z-10 
                duration-500 origin-bottom transform
                peer-focus:h-10 peer-placeholder-shown:h-[0.5px]"
                />
                <label
                  className="peer-focus:font-medium 
                   absolute text-sm duration-500
                   text-gray-500
                   transform -translate-y-8 scale-75
                   top-3 left-0 -z-10 origin-[0]
                   peer-focus:left:0 
                 peer-focus:text-blue-500 text-blue-peer-placeholder-shown:scale-100 
                   peer-placeholder-shown:translate-y-0
                   peer-placeholder-shown:text-gray-500
                   peer-focus:scale-75 peer-focus:-translate-y-8"
                   htmlFor="email"
                >
                  Enter Email
                </label>
              </div>
              <div className="relative flex flex-col mb-12">
                <input
                  type="password"
                  id="password"
                  placeholder=" "
                  className="relative z-10 border-0 border-b-2 border-blue-500 h-10 bg-transparent text-gray-100 outline-none px-2 peer"
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
                <i
                  className="bg-blue-500 rounded w-full 
                bottom-0 left-0 absolute h-10 -z-10 
                duration-500 origin-bottom transform
                peer-focus:h-10 peer-placeholder-shown:h-[0.5px]"
                />
                <label
                  className="peer-focus:font-medium 
                   absolute text-sm duration-500
                   text-gray-500
                   transform -translate-y-8 scale-75
                   top-3 left-0 -z-10 origin-[0]
                   peer-focus:left:0 
                 peer-focus:text-blue-500 text-blue-peer-placeholder-shown:scale-100 
                   peer-placeholder-shown:translate-y-0
                   peer-placeholder-shown:text-gray-500
                   peer-focus:scale-75 peer-focus:-translate-y-8"
                   htmlFor="password"
                >
                  Enter Password
                </label>
              </div>
              <button
                type="submit"
                className="relative text-[#03e9f4] uppercase tracking-[4px]
                text-[16px] border-2 border-[#03e9f4] px-[22px] py-[7px] hover:text-white
                hover:bg-[#03e9f4] custom-shadow custom-text rounded m"
                
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
