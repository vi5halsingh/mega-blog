import React from "react";
import authServices from "../../appwrite/auth";
import { useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";

const LogOut = () => {
    const dispatch = useDispatch();
    const handleLogout = () => {
        // Implement logout functionality here
        authServices.logout().then(() => {
            dispatch(logout());
            console.log("User logged out");
            // Optionally, you can dispatch a logout action to Redux store here
        }).catch((error) => {
            console.error("Logout failed:", error);
        });
    };
    return (
        <button className="bg-red-600 text-white p-2 rounded" onClick={handleLogout}>
            Log Out
        </button>
    );
};

export default LogOut;
