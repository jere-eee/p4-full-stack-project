'use client';
import React from 'react'
import { Lato, Nunito } from "next/font/google";
import { UserGroupIcon, StarIcon, ChatAltIcon } from '@heroicons/react/solid';
import Image from 'next/image';
// import communityImage from '/public/community.jpg'; // Replace with your actual image path
import playerplaying from '../../public/images/playerplaying.jpg'
import Tournament from './Tournament';
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
    <section className={`bg-[#141B21] text-[#ffffff] ${lato.className} antialiased py-16 px-4 sm:px-10 md:px-40`}>
      <div className='min-h-screen'>
        <div className="container mx-auto flex flex-col md:flex-row items-center gap-10 ">
          {/* Content Section */}
          <div className="md:w-1/2 space-y-6">
            <h2 className={`text-4xl font-extrabold ${nunito.className} antialiased`}>About GamerzHub</h2>
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

        <Tournament/>

        {/* Statistics */}
        <div className="my-16 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-800 gap-32">
          {/* Member Statistic */}
          <div className="flex flex-col items-start px-4">
            <div className="flex items-center justify-center bg-[#141B21] text-white rounded-full h-24 w-24">
              <UserGroupIcon className="h-12 w-12" />
            </div>
            <p className={`mt-4 text-3xl font-bold ${nunito.className} antialiased`}>10K+ Members</p>
            <p className='mt-4 text-lg'>Our ever-growing community is active and vibrant.</p>
          </div>
          {/* Tournament Statistic */}
          <div className="flex flex-col items-start px-4">
            <div className="flex items-center justify-center bg-[#141B21] text-white rounded-full h-24 w-24">
              <StarIcon className="h-12 w-12" />
            </div>
            <p className={`mt-4 text-3xl font-bold ${nunito.className} antialiased`}>500+ Tournaments</p>
            <p className='mt-4 text-lg'>Successfully held since establishment in 2022.</p>
          </div>
          {/* Reviews Statistic */}
          <div className="flex flex-col items-start px-4">
            <div className="flex items-center justify-center bg-[#141B21] text-white rounded-full h-24 w-24">
              <ChatAltIcon className="h-12 w-12" />
            </div>
            <p className={`mt-4 text-3xl font-bold ${nunito.className} antialiased`}>1K+ Reviews</p>
            <p className='mt-4 text-lg'>With an average rating of 4.4!</p>
          </div>
        </div>

      </div>

      {/* Mock Reviews */}
      <div className="mt-32 space-y-8 ">
        <h3 className="text-4xl font-extrabold text-center">What Our Members Say</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-lg">
          <div className="p-6 bg-[#0F161C] shadow-md rounded-lg">
            <p className="italic text-gray-200">"GamerzHub has transformed how I connect with other gamers locally!"</p>
            <div className="flex items-center justify-between mt-4">
              <div className="flex">
                {[...Array(5)].map((_, index) => (
                  <StarIcon key={index} className="h-4 w-4 text-yellow-400" />
                ))}
              </div>
              <div className="text-right">
                <p className="font-bold text-white">- Alex R.</p>
                <p className="text-sm text-gray-400">Gaming influencer</p>
              </div>
            </div>
          </div>
          <div className="p-6 bg-[#0F161C] shadow-md rounded-lg max-w-sm mx-auto">
            <p className="italic text-gray-200">"The tournaments are so well-organized. I've improved my skills significantly."</p>
            <div className="flex items-center justify-between mt-4">
              <div className="flex">
                {[...Array(4)].map((_, index) => (
                  <StarIcon key={index} className="h-4 w-4 text-yellow-400" />
                ))}
              </div>
              <div className="text-right">
                <p className="font-bold text-white">- Jamie L.</p>
                <p className="text-sm text-gray-400">Gamer</p>
              </div>
            </div>
          </div>

          <div className="p-6 bg-[#0F161C] shadow-md rounded-lg">
            <p className="italic text-gray-200">"A must-join community for any gaming enthusiast."</p>
            <div className="flex items-center justify-between mt-4">
              <div className="flex">
                {[...Array(4)].map((_, index) => (
                  <StarIcon key={index} className="h-4 w-4 text-yellow-400" />
                ))}
              </div>
              <div className="text-right">
                <p className="font-bold text-white">- Taylor P.</p>
                <p className="text-sm text-gray-400">Gaming blogger</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
