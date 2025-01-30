'use client';
import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import TournamentCard from '../components/TournamentCard';

const page = () => {
    const [user, setUser] = useState(null)
    const [tournaments, setTournaments] = useState([])

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

    useEffect(() => {
        // Fetch tournaments from backend
        fetch("http://localhost:5000/tournaments")
          .then((r) => r.json())
          .then((tournaments) => {
            setTournaments(tournaments);
          })
          .catch((err) => console.log(err));
      }, []);

    return (
        <div className='bg-[#141B21]'>
            <Navbar user={user} setUser={setUser}/>
            <div className='mx-40'>
            {tournaments.map((t) => (
                <TournamentCard key={t.id} tournament={t}/>
            ))}

            </div>
        </div>
    )
}

export default page