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

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className={`${nunito.className} antialiased bg-gradient-to-r from-[#00472D] to-[#00663f] fixed w-full z-10 shadow-md`}>
      <div className="container mx-auto flex items-center justify-between py-6 px-10">
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
        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center space-x-14">
          <button className="text-[#FFFFFF] hover:text-[#343434] border border-white rounded-md py-2 px-6 hover:bg-[#00472D] transition duration-300">
            Login
          </button>
          <button className="text-[#FFFFFF] hover:text-[#F1F1F1] border border-white rounded-md py-2 px-6 hover:bg-[#00472D] transition duration-300">
            Sign-up
          </button>
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
        <div className="md:hidden bg-gradient-to-r from-[#2F463B] via-[#3D6450] to-[#2F463B] space-y-4 py-4 px-6">
          <Link href="/" className="block text-[#FFFFFF] hover:text-[#F1F1F1] transition duration-300">
            Home
          </Link>
          <Link href="/tournaments" className="block text-[#FFFFFF] hover:text-[#F1F1F1] transition duration-300">
            Tournaments
          </Link>
          <Link href="/games" className="block text-[#FFFFFF] hover:text-[#F1F1F1] transition duration-300">
            Games
          </Link>
          <div className="space-y-2">
            <button className="block text-[#FFFFFF] hover:text-[#F1F1F1] bg-gradient-to-b from-[#2F463B] to-[#00472D] w-full text-left rounded-md py-2 px-6 transition duration-300">
              Login
            </button>
            <button className="block text-[#FFFFFF] hover:text-[#F1F1F1] bg-gradient-to-b from-[#2F463B] to-[#00472D] w-full text-left rounded-md py-2 px-6 transition duration-300">
              Sign-up
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
