"use client";
import GameCard from "@/app/components/GameCard";
import Navbar from "@/app/components/Navbar";
import React, { useState, useEffect } from "react";

const GameDetailPage = ({ params }) => {
  const [user, setUser] = useState(null);
  const [game, setGame] = useState(null);
  const [gameId, setGameId] = useState(null);

  // Unwrap params using useEffect
  useEffect(() => {
    async function unwrapParams() {
      const unwrappedParams = await params; // Resolve the params promise
      setGameId(unwrappedParams.id); // Set the gameId from params
    }
    unwrapParams();
  }, [params]);

  useEffect(() => {
    if (!gameId) return;
    // Fetch game details by ID
    fetch(`http://localhost:5000/game/${gameId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch game details");
        }
        return response.json();
      })
      .then((gameData) => setGame(gameData))
      .catch((error) => console.error("Error fetching game details:", error));
  }, [gameId]);

  useEffect(() => {
    // Auto-login to fetch the user session
    fetch("http://localhost:5000/check_session", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return null;
      })
      .then((userData) => setUser(userData))
      .catch((error) => console.error("Error fetching user session:", error));
  }, []);

  return (
    <div className="bg-[#141B21] min-w-screen">
      <Navbar user={user} setUser={setUser} />
      <div className="md:ml-40 pt-20">
        {game ? (
          <GameCard game={game} isDetailedView={true} />
        ) : (
          <p className="text-center text-gray-500">Loading game details...</p>
        )}
      </div>
    </div>
  );
};

export default GameDetailPage;
