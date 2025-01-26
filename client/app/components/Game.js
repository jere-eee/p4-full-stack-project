import React from 'react'
import { Nunito } from "next/font/google";
import games from '../../public/images/games.jpg'
import Link from 'next/link';
import Image from 'next/image';

const nunito = Nunito({
    weight: ["200", "300", "400", "500", "700", "900"],
    subsets: ["latin"],
    display: "swap",
});

const Game = () => {
    return (
        <div>
            <div >
                <div className="container mx-auto flex flex-col md:flex-row items-center gap-10">

                    {/* Content Section */}
                    <div className="md:w-1/2 space-y-6">
                        <h2 className={`text-4xl font-extrabold ${nunito.className} antialiased`}>Games</h2>
                        <p className="text-lg">
                            Look at some of the popular games we play, read and leave reviews!
                        </p>
                        <Link href='/games' className=" text-white py-3 px-8 block w-max rounded-lg text-xl hover:bg-[#313e48] transition duration-300">
                            Check out games
                        </Link>
                    </div>

                    <div className="md:w-1/2">
                        <Image
                            src={games}
                            alt="Blackgamer"
                            className="rounded-lg shadow-md"
                            width={600}
                            height={400}
                        />
                    </div>

                    


                </div>
            </div>
        </div>
    )
}

export default Game