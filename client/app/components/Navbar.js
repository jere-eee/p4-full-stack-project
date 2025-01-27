'use client';
import { Nunito } from 'next/font/google';
import Link from 'next/link';
import React, { useState } from 'react';
import { MenuAlt3Icon, XIcon } from '@heroicons/react/outline';

const nunito = Nunito({
  weight: ["200", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
  display: "swap",
});

const Navbar = ({ user, setUser }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    // Clear user state on logout and delete in backend
    fetch("http://localhost:5000/logout", {
      method: "DELETE",
      credentials: "include"
    }).then(r => {
      if (r.ok) {
        setUser(null); // This will trigger a re-render with the user set to null
      }
    })
  };

  return (
    <nav className={`${nunito.className} antialiased bg-gradient-to-r from-[#141B21] to-[#313e48] fixed w-full z-10 shadow-md`}>
      <div className="container mx-auto flex items-center justify-between py-6 px-4 md:px-40">
        {/* Logo */}
        <Link href="/" className="text-3xl text-[#FFFFFF] font-extrabold">
          GamerzHub
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-14">
          <Link href="/" className="text-[#FFFFFF] hover:text-[#343434] transition duration-300">
            Home
          </Link>
          <Link href="/tournaments" className="text-[#FFFFFF] hover:text-[#343434] transition duration-300">
            Tournaments
          </Link>
          <Link href="/games" className="text-[#FFFFFF] hover:text-[#343434] transition duration-300">
            Games
          </Link>
          <Link href="/contact" className="text-[#FFFFFF] hover:text-[#343434] transition duration-300">
            Contact us
          </Link>
        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center space-x-14">
          {user ? (
            <>
              {/* Display profile picture and name */}
              <div className="flex items-center space-x-4">
                {user.profile_picture ? (
                  <img
                    src={user.profile_picture}
                    alt="Profile"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-xl">{user?.name?.charAt(0).toUpperCase() || ""}</div> // Placeholder if no picture
                )}
                <div>
                  <p className="font-semibold text-white">{user.name}</p>
                  <button onClick={handleLogout} className="text-blue-500 hover:text-blue-700">
                    Logout
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <Link href='/login' className="text-[#FFFFFF] hover:text-[#343434] border border-white rounded-md py-2 px-6 hover:bg-[#0F161C] transition duration-300">
                Login
              </Link>
              <Link href='/signup' className="text-[#FFFFFF] hover:text-[#F1F1F1] border border-white rounded-md py-2 px-6 hover:bg-[#0F161C] transition duration-300">
                Sign-up
              </Link> 
            </>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-[#FFFFFF] focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? (
            <XIcon className="h-6 w-6" />
          ) : (
            <MenuAlt3Icon className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#0F161C] space-y-4 py-4 px-4">
          <Link href="/" className="block text-[#FFFFFF] hover:text-[#F1F1F1] transition duration-300">
            Home
          </Link>
          <Link href="/tournaments" className="block text-[#FFFFFF] hover:text-[#F1F1F1] transition duration-300">
            Tournaments
          </Link>
          <Link href="/games" className="block text-[#FFFFFF] hover:text-[#F1F1F1] transition duration-300">
            Games
          </Link>
          <Link href="/contact" className="block text-[#FFFFFF] hover:text-[#F1F1F1] transition duration-300">
            Contact us
          </Link>

          {/* Profile Information in Mobile Menu */}
          {user ? (
            <div className="flex items-center space-x-4 mt-4">
              {user.profile_picture ? (
                <img
                  src={user.profile_picture}
                  alt="Profile"
                  className="w-12 h-12 rounded-full object-cover"
                />
              ) : (
                <div className="w-12 h-12 bg-gray-300 rounded-full"></div> // Placeholder if no picture
              )}
              <div>
                <p className="font-semibold text-white">{user.name}</p>
                <button onClick={handleLogout} className="text-blue-500 hover:text-blue-700">
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <Link href='/login' className="block text-[#FFFFFF] hover:text-[#F1F1F1] bg-[#0F161C] w-full text-left rounded-md py-2 px-6 transition duration-300">
                Login
              </Link>
              <Link href='/signup' className="block text-[#FFFFFF] hover:text-[#F1F1F1] bg-[#0F161C] w-full text-left rounded-md py-2 px-6 transition duration-300">
                Sign-up
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
