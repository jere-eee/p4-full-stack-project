import React from "react";
import { Nunito } from "next/font/google";
import Link from "next/link";
import Image from "next/image";

const nunito = Nunito({
  weight: ["200", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
  display: "swap",
});

const GameCard = ({ game, isDetailedView = false, reviews = [] }) => {
  const cardClass = isDetailedView
    ? "bg-[#141B21] rounded-3xl overflow-hidden shadow-2xl transform transition-all duration-200 ease-in-out w-full max-w-4xl"
    : "bg-[#141B21] rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 ease-in-out border-black border";

  // Render the card wrapped in a Link only when isDetailedView is false
  const cardContent = (
    <div className={`${cardClass} p-4`}>
      {/* Game Image */}
      <div className={`relative ${isDetailedView ? "h-96" : "h-64"} w-full`}>
        <Image
          src={game.background_img}
          alt={`${game.title} background`}
          layout="fill"
          objectFit="cover"
          className={`group-hover:brightness-75 transition-all duration-200 ease-in-out ${isDetailedView ? "rounded-t-xl" : ""}`}
        />
        {isDetailedView && (
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black via-transparent to-transparent" />
        )}
      </div>

      {/* Game Details */}
      <div className="pt-4">
        <h1 className={`text-xl font-bold text-white mb-2 ${nunito.className}`}>
          {game.title}
        </h1>
        <p className="text-sm text-gray-300 mb-2">
          Genre: {game.genre}
        </p>
        <div className="text-sm text-gray-300">Rating: {game.rating}</div>
        
        {/* Additional Details and Reviews Section */}
        {isDetailedView && (
          <div className="mt-4">
            <h2 className={`text-lg font-semibold text-white mb-2 ${nunito.className}`}>Game Details</h2>
            <p className="text-gray-300">Platforms: {game.platforms}</p>
            <p className="text-gray-300">Release Date: {game.release_date}</p>

            <h3 className="text-lg font-semibold text-white mt-6">Reviews</h3>
            <div className="space-y-4 mt-4">
              {reviews.length > 0 ? (
                reviews.map((review, index) => (
                  <div key={index} className="bg-gray-800 p-4 rounded-lg">
                    <p className="text-white">{review.text}</p>
                    <div className="text-gray-400 text-sm">- {review.author}</div>
                  </div>
                ))
              ) : (
                <p className="text-gray-400">No reviews yet</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return isDetailedView ? (
    cardContent
  ) : (
    <Link href={`/game/${game.id}`} className="group" passHref>
      {cardContent}
    </Link>
  );
};

export default GameCard;
