import React from "react";

const LoginFormular = () => {
  return (
    <>
      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Company Mail</span>
        </div>
        <input
          type="text"
          //placeholder="Type here"
          className="input input-bordered w-full max-w-xs"
        />
      </label>
      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Password</span>
        </div>
        <input
          type="password"
          //placeholder="Type here"
          className="input input-bordered w-full max-w-xs"
        />
      </label>
    </>
  );
};

export default LoginFormular;
