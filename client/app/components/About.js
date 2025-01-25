'use client';
import React from 'react'
import { Lato, Nunito } from "next/font/google";
import { UserGroupIcon, StarIcon, ChatAltIcon } from '@heroicons/react/solid';
import Image from 'next/image';
// import communityImage from '/public/community.jpg'; // Replace with your actual image path
import playerplaying from '../../public/playerplaying.jpg'
const lato = Lato({
  weight: ["100", "300", "400", "700", "900"],
  subsets: ["latin"],
  display: "swap",
});

const nunito = Nunito({
  weight: ["200", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
  display: "swap",
});

const About = () => {
  return (
    <section className="bg-[#F1F1F1] text-[#2F463B] py-16 px-4 sm:px-10 md:px-40">
      <div className="container mx-auto flex flex-col md:flex-row items-center gap-10 min-h-screen">
        {/* Content Section */}
        <div className="md:w-1/2 space-y-6">
          <h2 className="text-4xl font-extrabold">About GamerzHub</h2>
          <p className="text-lg">
            GamerzHub is your go-to platform for local gaming tournaments and an engaging online gaming community.
            Join our network to connect with fellow gamers, compete in tournaments, and stay updated on gaming trends.
          </p>

        </div>

        {/* Image Section */}
        <div className="md:w-1/2">
          <Image
            src={playerplaying}
            alt="Gaming community"
            className="rounded-lg shadow-md"
            width={600}
            height={400}
          />
        </div>
      </div>


      {/* Statistics */}
      <div className="my-16 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-300">
        {/* Member Statistic */}
        <div className="flex flex-col items-start px-4">
          <div className="flex items-center justify-center bg-[#2F463B] text-white rounded-full h-24 w-24">
            <UserGroupIcon className="h-12 w-12" />
          </div>
          <p className="mt-4 text-4xl font-bold">10K+ Members</p>
          <p className='mt-4 text-lg'>Our ever-growing community is active and vibrant.</p>
        </div>
        {/* Tournament Statistic */}
        <div className="flex flex-col items-start px-4">
          <div className="flex items-center justify-center bg-[#2F463B] text-white rounded-full h-24 w-24">
            <StarIcon className="h-12 w-12" />
          </div>
          <p className="mt-4 text-4xl font-bold">500+ Tournaments</p>
          <p className='mt-4 text-lg'>Successfully held since establishment in 2022.</p>
        </div>
        {/* Reviews Statistic */}
        <div className="flex flex-col items-start px-4">
          <div className="flex items-center justify-center bg-[#2F463B] text-white rounded-full h-24 w-24">
            <ChatAltIcon className="h-12 w-12" />
          </div>
          <p className="mt-4 text-4xl font-bold">1K+ Reviews</p>
          <p className='mt-4 text-lg'>With an average rating of 4.4!</p>
        </div>
      </div>



      {/* Mock Reviews */}
      <div className="mt-32 space-y-8 min-h-screen">
        <h3 className="text-4xl font-extrabold text-center">What Our Members Say</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-lg">
          <div className="p-6 bg-white shadow-md rounded-md">
            <p className="italic">"GamerzHub has transformed how I connect with other gamers locally!"</p>
            <p className="mt-4 font-bold text-right">- Alex R.</p>
          </div>
          <div className="p-6 bg-white shadow-md rounded-md">
            <p className="italic">"The tournaments are so well-organized. I've improved my skills significantly."</p>
            <p className="mt-4 font-bold text-right">- Jamie L.</p>
          </div>
          <div className="p-6 bg-white shadow-md rounded-md">
            <p className="italic">"A must-join community for any gaming enthusiast."</p>
            <p className="mt-4 font-bold text-right">- Taylor P.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
