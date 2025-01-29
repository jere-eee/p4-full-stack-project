"use client";
import GameCard from "@/app/components/GameCard";
import Navbar from "@/app/components/Navbar";
import React, { useState, useEffect } from "react";

const GameDetailPage = ({ params }) => {
  const [user, setUser] = useState(null);
  const [game, setGame] = useState(null);
  const [gameId, setGameId] = useState(null);
  const [reviews, setReviews] = useState()

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

    Promise.all([
      fetch(`http://localhost:5000/game/${gameId}`).then(res => res.json()),
      fetch(`http://localhost:5000/game/${gameId}/reviews`).then(res => res.json())
    ])
      .then(([gameData, reviewsData]) => {
        setGame(gameData);
        setReviews(reviewsData);
      })
      .catch(error => console.error("Error fetching data:", error));
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
          <GameCard game={game} isDetailedView={true} reviews={reviews}/>
        ) : (
          <p className="text-center pt-20 text-gray-500 min-h-screen">Loading game details...</p>
        )}
      </div>
    </div>
  );
};

export default GameDetailPage;
