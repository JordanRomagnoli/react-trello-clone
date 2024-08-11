import React from "react";

const ScrollXContainer = ({ children }) => {
    return (
        <div className="overflow-x-auto whitespace-nowrap pb-20">
            {children}
        </div>
    );
};

export default ScrollXContainer;
