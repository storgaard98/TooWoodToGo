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
      <div className="hero-content flex">
        <Image
          src={props.pathToProfile}
          alt={`Profile Picture of ${props.profileName}`}
          className="max-w-sm shadow-xl mr-4"
          width={150}
          height={150}
        />
        <div>
          <h3 className="font-bold text-stark-blue">{props.profileName}</h3>
          <div className="flex flex-col">
            <p className="py-1 text-slate-400">Phone : {props.phone}</p>
            <p className="py-1 text-slate-400">Email : {props.email}</p>
            <button className="bg-transparent hover:bg-stark-blue text-stark-blue font-semibold hover:text-white border border-stark-blue hover:border-transparent rounded">
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
  phone: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

export default profile;
