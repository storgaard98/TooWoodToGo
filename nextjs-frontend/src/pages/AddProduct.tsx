import React from 'react';

interface Props {
    text: string;
}

const MyComponent: React.FC<Props> = ({ text }) => {
    return <div>{text}</div>;
};

export default MyComponent;