import React from 'react'
import { Nunito, Lato } from 'next/font/google';
import Image from 'next/image';

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

const TournamentCard = ({tournament}) => {
    return (
        <div className={`"max-w-4xl w-full pt-40 bg-[#141B21] rounded-3xl overflow-hidden shadow-lg transition-all duration-200 p-8 ${lato.className} antialiased`}>
            <div className="relative w-full h-64">
                <Image src={tournament.game.background_img} alt={`${tournament.game.title} background`} layout="fill" objectFit="cover" className="rounded-t-xl" />
            </div>
            <div className='pt-4'>
                <h1 className={`text-xl font-bold text-white mb-2 ${nunito.className} antialiased`}>{tournament.title}</h1>
                <p className="text-sm text-gray-300">Genre: {tournament.game.genre}</p>
                <p className="text-sm text-gray-300">Date created: {tournament.created_at}</p>
                <p className="text-sm text-gray-300">Description: {tournament.description}</p>
            </div>
        </div>
    )
}

export default TournamentCard