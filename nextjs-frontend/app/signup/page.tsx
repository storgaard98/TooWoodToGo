import Link from "next/link";
import React from "react";

const signUp = () => {
  return (
    <>
      <>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Company</span>
          </div>
          <input
            type="text"
            //placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
          />
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">E-mail</span>
          </div>
          <input
            type="email"
            //placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
          />
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Phone Number</span>
          </div>
          <input
            type="tel"
            //placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
          />
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">CVR Number</span>
          </div>
          <input
            type="tel"
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
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Repeat Password</span>
          </div>
          <input
            type="password"
            //placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
          />
        </label>
      </>
      <button type="submit" onClick={signUpButton}>
        Sign In
      </button>
    </>
  );
};
function signUpButton() {
  //<Link href="./components/home"></Link>;
  console.log("Click");
}

export default signUp;
