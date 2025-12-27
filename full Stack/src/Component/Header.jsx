import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { CiMenuBurger } from "react-icons/ci";
import { IoCloseOutline } from "react-icons/io5";
const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenueOpen, setIsMenueOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const avatar_Url = "https://plus.unsplash.com/premium_photo-1664536392896-cd1743f9c02c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D";
  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-2xl font-bold text-orange-600">
                Blogify
              </Link>
            </div>

            {/* Navigation */}
            <nav className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium
                  ${
                    isActive
                      ? "border-orange-500 text-gray-900"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`
                }
              >
                Home
              </NavLink>

              <NavLink
                to="/articles"
                className={({ isActive }) =>
                  `inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium
                  ${
                    isActive
                      ? "border-orange-500 text-gray-900"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`
                }
              >
                Articles
              </NavLink>

              <NavLink
                to="/write"
                className={({ isActive }) =>
                  `inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium
                  ${
                    isActive
                      ? "border-orange-500 text-gray-900"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`
                }
              >
                Write
              </NavLink>

              <NavLink
                to="/myArticles"
                className={({ isActive }) =>
                  `inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium
                  ${
                    isActive
                      ? "border-orange-500 text-gray-900"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`
                }
              >
                My Articles
              </NavLink>
            </nav>
          </div>
          {/* right */}
          <div className="flex items-center gap-2">
            {/* profile */}
            {isLoggedIn ? (
              <>
              <div className="text-sm text-gray-700">
                <span>Hello omar</span>
              </div>
              <div className="relative">
                <button onClick={() => setIsDropdownOpen(prev => !prev)} className='flex items-center justify-center h-8 w-8 
                rounded-full bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2
                 focus:ring-amber-500'
                 
                 >
                  {
                    avatar_Url ? (
                      <img className="w-8 h-8 rounded-full" src={avatar_Url} alt="" />
                    ):(
                     <FaUser className="text-gray-600 cursor-pointer" />
                    )
                  }
                </button>
                {/* drodownMenue */}
                {
                  isDropdownOpen && (
                  <div className="absolute right-0 w-48 bg-white mt-1 rounded-md shadow-lg z-10">
                  
                  <Link className="block px-4 py-2 text-gray-700 text-sm hover:bg-gray-100">Your Profile</Link>
                  <Link className="block px-4 py-2 text-gray-700 text-sm hover:bg-gray-100">Manage Aricles</Link>
                  <Link className="block px-4 py-2 text-gray-700 text-sm hover:bg-gray-100">SingnOut</Link>
                </div>   
                  )
                }
               
              </div>
              </>
            ) : (
              <>
                <div className="flex items-cemter gap-2">
                  <NavLink
                    to="/signin"
                    className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium 
                    rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 
                    focus:ring-orange-500"
                  >
                    Sign In
                  </NavLink>

                  <NavLink
                    to="/signup"
                    className="hidden sm:inline-flex items-center justify-center px-4 py-2 border text-sm font-medium rounded-md 
                    text-orange-600 bg-white border-orange-600 hover:bg-orange-50 focus:outline-none focus:ring-2 focus:ring-offset-2 
                    focus:ring-orange-500"
                  >
                    Sign Up
                  </NavLink>
                </div>
              </>
            )}

            {/* {
              !isLoggedIn && (
                <>
                <NavLink
                    to="/singin"
                    className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium 
                    rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 
                    focus:ring-orange-500"
                  >
                    Sign In
                  </NavLink>

                  <NavLink
                    to="/signup"
                    className="hidden sm:inline-flex items-center justify-center px-4 py-2 border text-sm font-medium rounded-md 
                    text-orange-600 bg-white border-orange-600 hover:bg-orange-50 focus:outline-none focus:ring-2 focus:ring-offset-2 
                    focus:ring-orange-500"
                  >
                    Sign Up
                  </NavLink>
                  </>
              )
            } */}

            {/* buttons */}
          </div>

        {/* hamburger */}
        <div className="mr-2 flex items-center sm:hidden">
          <button onClick={()=> setIsMenueOpen(prev => !prev)} className="inline-flex size={24} items-center justify-center p-2 rounded-md text-gray-400hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-500">
            {
              isMenueOpen ? <IoCloseOutline className="w-6 h-6 block" /> : <CiMenuBurger className="w-6 h-6 block" />
            }
          </button>
       
        </div>
        
        </div>
      </div>
      {/* mobile menue */}
      {
        isMenueOpen && (
              <div className="sm:hidden">
  <div className="mt-2 space-y-1 rounded-lg bg-white shadow-md ring-1 ring-black/5">

    <NavLink
      to="/"
      className={({ isActive }) =>
        `block px-4 py-3 text-sm font-medium rounded-md border-l-4 border-orange-500 text-base font-meddium
        ${
          isActive
            ? "bg-orange-50 text-orange-600"
            : "text-gray-700 hover:bg-gray-100"
        }`
      }
    >
      Home
    </NavLink>

    <NavLink
      to="/articles"
      className={({ isActive }) =>
        `block px-4 py-3 text-sm font-medium rounded-md border-l-4 border-orange-500 text-base font-meddium
        ${
          isActive
            ? "bg-orange-50 text-orange-600"
            : "text-gray-700 hover:bg-gray-100"
        }`
      }
    >
      Articles
    </NavLink>

    <NavLink
      to="/write"
      className={({ isActive }) =>
        `block px-4 py-3 text-sm font-medium rounded-md border-l-4 border-orange-500 text-base font-meddium
        ${
          isActive
            ? "bg-orange-50 text-orange-600"
            : "text-gray-700 hover:bg-gray-100"
        }`
      }
    >
      Write
    </NavLink>

    <NavLink
      to="/myArticles"
      className={({ isActive }) =>
        `block px-4 py-3 text-sm font-medium rounded-md border-l-4 border-orange-500 text-base font-meddium
        ${
          isActive
            ? "bg-orange-50 text-orange-600"
            : "text-gray-700 hover:bg-gray-100"
        }`
      }
    >
      My Articles
    </NavLink>

   <NavLink
      to="/profile"
      className={({ isActive }) =>
        `block px-4 py-3 text-sm font-medium rounded-md border-l-4 border-orange-500 text-base font-meddium
        ${
          isActive
            ? "bg-orange-50 text-orange-600"
            : "text-gray-700 hover:bg-gray-100"
        }`
      }
    >
     Profile
    </NavLink>

    <button className="blog w-full text-left pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium
    text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 ">Sign Out</button>
  </div>
</div>
        )
      }
     
    </header>
  );
};

export default Header;
