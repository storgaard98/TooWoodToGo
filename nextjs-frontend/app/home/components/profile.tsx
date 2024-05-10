import React from 'react'
import PropTypes from 'prop-types'
import Image from 'next/image'

type ProfileProps = {
    pathToProfile: string;
    profileName: string;
    phone: string;
    email: string;
  };

const profile = (props: ProfileProps) => {
    return (
        <div>
                <Image src={""} alt="profilePciture" width={100} height={100} herf="https://tkpbyg.dk/media/leyd4fqj/white_logo.png"/>
                <h1>{props.profileName}</h1>
                <div>
                <p>{props.phone}</p>
                <p>{props.email}</p>
                </div>


        </div>
    )
}

profile.propTypes = {pathToProfile: PropTypes.string.isRequired, profileName: PropTypes.string.isRequired, phone: PropTypes.number.isRequired, email: PropTypes.string.isRequired}

export default profile