import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className=" h-screen bg-black flex flex-col justify-center items-center ">
            <div className="notfound">
                <div className="notfound-404">
                    <img src='/404.png' />
                </div>
                <div className='m-auto w-full flex justify-center items-center'>
                    <Link to={"/"} className="text-white text-lg mt-4  border p-3  rounded-lg hover:border-pink-600 hover:text-blue-600">Homepage</Link>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
