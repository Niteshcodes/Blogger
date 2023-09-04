// import React from 'react'
import Navbar from './Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from '../../pages/Home'
import Blog from '../../pages/Blog'
import WriteBlog from '../../pages/WriteBlog'
// import Signup from '../../pages/Signup'

export default function RouteManager() {
    return (
        <div className='relative'>
            <div className='h-[10vh] sticky top-0 z-50'>
                <Navbar />
            </div>
            <div className="mb-auto w-full">
                <div className="h-full items-center justify-center">
                    {
                        <Routes >

                            <Route path='/' element={<Home />} />
                            <Route path='/blog/*' element={<Blog />} />
                            <Route path='/write/*' element={<WriteBlog />} />
                        </Routes>
                    }
                </div>
            </div>
        </div >
    )
}
