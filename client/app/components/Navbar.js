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
    <nav className={`${nunito.className} antialiased bg-[#2F463B] fixed w-full z-10 shadow-md`}>
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <Link href="/" className="text-3xl text-[#FFFFFF] font-extrabold">
          GamerzHub
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-14">
          <Link href="/" className="text-[#FFFFFF] hover:text-black">
            Home
          </Link>
          <Link href="/tournaments" className="text-[#FFFFFF] hover:text-black">
            Tournaments
          </Link>
          <Link href="/games" className="text-[#FFFFFF] hover:text-black">
            Games
          </Link>
        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <button className="text-[#FFFFFF] hover:text-black">Login</button>
          <button className="text-[#FFFFFF] hover:text-black">Sign-up</button>
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
        <div className="md:hidden bg-[#2F463B] space-y-4 py-4 px-6">
          <Link href="/" className="block text-[#FFFFFF] hover:text-black">
            Home
          </Link>
          <Link href="/tournaments" className="block text-[#FFFFFF] hover:text-black">
            Tournaments
          </Link>
          <Link href="/games" className="block text-[#FFFFFF] hover:text-black">
            Games
          </Link>
          <div className="space-y-2">
            <button className="block text-[#FFFFFF] hover:text-black w-full text-left">
              Login
            </button>
            <button className="block text-[#FFFFFF] hover:text-black w-full text-left">
              Sign-up
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
