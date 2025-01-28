import React from "react";
import { Nunito } from "next/font/google";
import Link from "next/link";
import Image from "next/image";

const nunito = Nunito({
  weight: ["200", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
  display: "swap",
});

const GameCard = ({ game }) => {
  return (
    <Link href={`/games/${game.id}`} className="group">
      <div className="bg-[#141B21] rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 ease-in-out border-black border">
        {/* Game Image */}
        <div className="relative h-64 w-full">
          <Image
            src={game.background_img}
            alt={`${game.title} background`}
            layout="fill"
            objectFit="cover"
            className="group-hover:brightness-75 transition-all duration-200 ease-in-out"
          />
          <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black via-transparent to-transparent" />
        </div>

        {/* Game Details */}
        <div className="p-4">
          <h1
            className={`text-lg font-bold text-white mb-2 ${nunito.className}`}
          >
            {game.title}
          </h1>
          <p className="text-sm text-gray-400 mb-2">
            Genre: {game.genre}
          </p>
          <div className="text-sm text-gray-300">Rating: {game.rating}</div>
        </div>
      </div>
    </Link>
  );
};

export default GameCard;
