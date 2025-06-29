import React from 'react';
import backgroundImg from '../assets/background.jpg';

function BackgroundLayout({ children }) {
    return (
        <div className="page">
            <div className="background">
                <img
                    src={backgroundImg}
                    alt="Background"
                    className="background-image"
                />
                <div className="background-image-overlay"></div>
            </div>
            {children}
        </div>
    );
}

export default BackgroundLayout;