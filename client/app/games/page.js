"use client";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import GameCard from "../components/GameCard";
import { Nunito, Lato } from 'next/font/google';


const nunito = Nunito({
  weight: ["200", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
  display: "swap",
});

const lato = Lato({
  weight: ["100", "300", "400", "700", "900"],
  subsets: ["latin"],
  display: "swap",
});

const Page = () => {
  const [user, setUser] = useState(null);
  const [games, setGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [sortOption, setSortOption] = useState("default");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Auto-login
    fetch("http://localhost:5000/check_session", {
      method: "GET",
      credentials: "include",
    }).then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);

  useEffect(() => {
    // Fetch games from backend
    fetch("http://localhost:5000/games")
      .then((r) => r.json())
      .then((games) => {
        setGames(games);
        setFilteredGames(games); // Default filtered state
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    let displayedGames = [...games];

    // Filter games by search query
    if (searchQuery) {
      displayedGames = displayedGames.filter((game) =>
        game.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort games if a sort option is selected
    if (sortOption === "highest-rated") {
      displayedGames = displayedGames.sort((a, b) => b.rating - a.rating);
    }

    setFilteredGames(displayedGames);
  }, [searchQuery, sortOption, games]);

  return (
    <>
      <Navbar user={user} setUser={setUser} />

      <div className={`bg-[#141B21] min-h-screen text-white ${lato.className}`}>

        {/* Header, Search, and Controls */}
        <div className="text-center py-8 pt-[148px]">
          <h1 className={`text-4xl font-bold mb-4 ${nunito.className}`}>Our Games</h1>
          <p className="text-gray-400 mb-4">
            Browse through our collection of popular console games. Use the
            search or sort option to find your favorite games.
          </p>
          <div className="flex justify-center items-center gap-4 mb-4">
            {/* Search Field */}
            <input
              type="text"
              placeholder="Search by title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-gray-700 text-white px-4 py-2 rounded-lg w-64"
            />

            {/* Sort Dropdown */}
            <label htmlFor="sort" className="text-gray-300">
              Sort by:
            </label>
            <select
              id="sort"
              className="bg-gray-700 text-white px-4 py-2 rounded-lg"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="default">Default</option>
              <option value="highest-rated">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Game Cards */}
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-40">
          {filteredGames.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Page;
