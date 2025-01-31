import { useState, useEffect } from "react";
import { Nunito, Lato } from 'next/font/google';
import Image from "next/image";

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


const TournamentCard = ({ tournament, user }) => {
    const [joined, setJoined] = useState(false);

    useEffect(() => {
        // Retrieve persisted joined state from localStorage
        const isJoined = localStorage.getItem(`joined_${tournament.id}`) === 'true';
        setJoined(isJoined);
    }, [tournament.id]);

    const handleLeaveTournament = async (tournamentId, userId) => {
        try {
            const response = await fetch(`http://localhost:5000/tournament_participants/${userId}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
            });

            if (response.ok) {
                // Persist joined state in localStorage
                localStorage.removeItem(`joined_${tournamentId}`);
                setJoined(false);
            }
        } catch (error) {
            console.error("Failed to remove participant", error);
        }
    };

    const handleJoinTournament = async (tournamentId, userId) => {
        try {
            const response = await fetch(`http://localhost:5000/tournament_participants`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    user_id: userId,
                    tournament_id: tournamentId,
                    rank: 0,
                    points: 0
                }),
            });

            if (response.ok) {
                alert("Successfully joined tournament!");
                // Persist joined state in localStorage
                localStorage.setItem(`joined_${tournamentId}`, 'true');
                setJoined(true);
            }
        } catch (error) {
            console.error("Failed to add participant", error);
        }
    }

    return (
        <div className={`max-w-4xl w-full pt-40 bg-[#141B21] rounded-3xl overflow-hidden text-white shadow-lg transition-all duration-200 p-8 ${lato.className} antialiased`}>
            <div className="relative w-full h-64 mb-4">
                <Image
                    src={tournament.game.background_img}
                    alt={`${tournament.game.title} background`}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-xl"
                />
            </div>
            <div className="pt-4">
                {/* Title and Basic Information */}
                <div className="mb-4">
                    <h1 className={`text-xl font-bold text-white mb-2 ${nunito.className}`}>{tournament.title}</h1>
                    <p className="text-sm text-gray-300">Genre: {tournament.game.genre}</p>
                    <p className="text-sm text-gray-300">Date created: {tournament.created_at}</p>
                </div>

                {/* Description */}
                <div className="mb-4">
                    <p className="text-sm text-gray-300">Description: {tournament.description}</p>
                </div>

                {/* Join/Leave Tournament Button */}
                <div className="mb-4">
                    {joined ? (
                        <button
                            onClick={() => {
                                handleLeaveTournament(tournament.id, user.id);
                                setJoined(false);
                            }}
                            className="mt-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                        >
                            Leave Tournament
                        </button>
                    ) : (
                        <button
                            onClick={() => {
                                handleJoinTournament(tournament.id, user.id);
                                setJoined(true);
                            }}
                            className="mt-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                        >
                            Join Tournament
                        </button>
                    )}
                </div>

                {/* Participants */}
                {/* Participants */}
                <div className="mt-6 p-4 bg-[#1F2933] rounded-lg shadow-md">
                    <h1 className="text-lg font-semibold text-white mb-2">Participants</h1>
                    <ul className="space-y-2">
                        {tournament.participants.length > 0 ? (
                            tournament.participants.map((participant) => (
                                <li key={participant.id} className="flex items-center gap-3 text-sm text-gray-300 bg-[#2D3748] p-2 rounded-md">
                                    <span className="w-8 h-8 flex items-center justify-center bg-blue-500 text-white font-bold rounded-full">
                                        {participant.name.charAt(0).toUpperCase()}
                                    </span>
                                    {participant.name}
                                </li>
                            ))
                        ) : (
                            <p className="text-gray-400 italic">No participants yet.</p>
                        )}
                    </ul>
                </div>

            </div>
        </div>
    );
};

export default TournamentCard