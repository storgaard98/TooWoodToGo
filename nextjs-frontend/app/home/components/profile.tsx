import React from "react";
import PropTypes from "prop-types";
import Image from "next/image";

type ProfileProps = {
  pathToProfile: string;
  profileName: string;
  phone: string;
  email: string;
};

const profile = (props: ProfileProps) => {
  return (
    <div className="hero">
      <div className="hero-content flex-col lg:flex-row">
        <div className="bg-black overflow-hidden rounded-3xl">
          <Image
            src="/image.png"
            alt={`Profile Picture of ${props.profileName}`}
            className="max-w-sm shadow-2xl "
            width={400}
            height={400}
          />
        </div>
        <div className=" text-black ml-5">
          {" "}
          {/* Added ml-4 for left margin */}
          <h1 className="text-5xl font-bold text-stark-blue">
            {props.profileName}
          </h1>
          <div className="py-3"></div>
          <div className="flex flex-col">
            <p className="py-1 text-slate-400">Phone : {props.phone}</p>
            <p className="py-1 text-slate-400">Emil : {props.email}</p>
            <div className="py-3"></div>
            <button className="bg-transparent hover:bg-stark-blue text-stark-blue font-semibold hover:text-white py-  px-4 border border-stark-blue hover:border-transparent rounded w-64">
              Edit profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

profile.propTypes = {
  pathToProfile: PropTypes.string.isRequired,
  profileName: PropTypes.string.isRequired,
  phone: PropTypes.number.isRequired,
  email: PropTypes.string.isRequired,
};

export default profile;
