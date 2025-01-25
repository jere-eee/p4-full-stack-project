import React from 'react'
import { Nunito } from "next/font/google";
import blackgamer from '../../public/images/blackgamer.jpg' 

const nunito = Nunito({
  weight: ["200", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
  display: "swap",
});

const Tournament = () => {
    return (
        <div>
            <div >
                <div className="container mx-auto flex flex-col md:flex-row items-center gap-10 min-h-4">

                <div className="md:w-1/2">
                        <img
                            src={blackgamer}
                            alt="Blackgamer"
                            className="rounded-lg shadow-md"
                            width={600}
                            height={400}
                        />
                    </div>

                    {/* Content Section */}
                    <div className="md:w-1/2 space-y-6">
                        <h2 className={`text-4xl font-extrabold ${nunito.className} antialiased`}>About GamerzHub</h2>
                        <p className="text-lg">
                            GamerzHub is your go-to platform for local gaming tournaments and an engaging online gaming community.
                            Join our network to connect with fellow gamers, compete in tournaments, and stay updated on gaming trends.
                        </p>

                    </div>

                    
                </div>
            </div>
        </div>
    )
}

export default Tournament