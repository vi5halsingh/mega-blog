import React from "react";

const Button = ({ children, onClick, className = "" ,
    type = "button",
    bgColor = "bg-blue-600",
    textColor = "text-white",
    ...props
 }) => {
    return (
        <button className={`px-4 ${textColor} p-2 rounded ${bgColor} ${className}`} onClick={onClick} type={type} {...props}>
            {children}
        </button>
    );
};

export default Button;
