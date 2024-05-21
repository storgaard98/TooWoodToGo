import React from "react";

const LoginFormular = () => {
  return (
    <>
      <label className="form-control w-full max-w-xl pt-11">
        <div className="label">
          <span className="label-text text-white text-4xl">Company Mail</span>
        </div>
        <div className="relative w-full max-w-xl">
          <input
            type="text"
            //placeholder="Type here"
            className="input w-full max-w-xl rounded-3px pr-8 pl-14 text-4xl h-24"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="absolute top-1/2 left-3 transform -translate-y-1/2 w-8 h-8 opacity-50"
          >
            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
          </svg>
        </div>
      </label>
      <label className="form-control w-full max-w-xl pt-11">
        <div className="label">
          <span className="label-text text-white text-4xl">Password</span>
        </div>
        <div className="relative w-full max-w-xl">
          <input
            type="password"
            //placeholder="Type here"
            className="input w-full max-w-xl rounded-3px pr-8 pl-14 text-4xl h-24"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="absolute top-1/2 left-3 transform -translate-y-1/2 w-8 h-8 opacity-50"
          >
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </label>
    </>
  );
};

export default LoginFormular;
