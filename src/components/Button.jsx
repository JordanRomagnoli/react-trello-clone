import React from "react";

const Button = ({ bgColor, hoverBgColor, handleFunction, Icon, iconClass }) => {
    return (
        <button
            className={`h-9 w-9 rounded-full  leading-7 ${bgColor} hover:${hoverBgColor} transition-colors active:scale-90`}
            onClick={handleFunction}
        >
            <Icon className={`mx-auto text-lg ${iconClass}`} />
        </button>
    );
};

export default Button;
