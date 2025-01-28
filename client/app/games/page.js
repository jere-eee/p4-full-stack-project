"use client";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import GameCard from "../components/GameCard";

const Page = () => {
  const [user, setUser] = useState(null);
  const [games, setGames] = useState([]);

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
    fetch("http://localhost:5000/games")
      .then((r) => r.json())
      .then((games) => setGames(games))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="min-h-screen bg-[#141B21] text-white">
      {/* Navbar */}
      <Navbar user={user} setUser={setUser} />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Popular Games</h1>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {games.length > 0 ? (
            games.map((game) => <GameCard key={game.id} game={game} />)
          ) : (
            <p className="text-center col-span-full">No games available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
