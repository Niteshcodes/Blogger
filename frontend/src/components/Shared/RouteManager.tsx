import { Navigate, Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const PrivateComponent = () => {
    const token = localStorage.getItem("auth");
    
    return token ? (
        <>
            <div className='h-[10vh] sticky top-0 z-50'>
                <Navbar />
            </div>
            <Outlet />
        </>
    ) : (
        <Navigate to="/user/login" />
    );
};

export default PrivateComponent;