import React from 'react'
import { Nunito } from "next/font/google";
import blackgamer from '../../public/images/blackgamer.jpg'
import Link from 'next/link';
import Image from 'next/image';

const nunito = Nunito({
    weight: ["200", "300", "400", "500", "700", "900"],
    subsets: ["latin"],
    display: "swap",
});

const Tournament = () => {
    return (
        <div>
            <div >
                <div className="container mx-auto flex flex-col md:flex-row items-center gap-10 min-h-screen">

                    <div className="md:w-1/2">
                        <Image
                            src={blackgamer}
                            alt="Blackgamer"
                            className="rounded-lg shadow-md"
                            width={600}
                            height={400}
                        />
                    </div>

                    {/* Content Section */}
                    <div className="md:w-1/2 space-y-6">
                        <h2 className={`text-4xl font-extrabold ${nunito.className} antialiased`}>Browse tournaments</h2>
                        <p className="text-lg">
                            We are an active community of gamers and we have receipts!
                            Check out past and upcoming tournaments or join one (if you're ready!)
                        </p>
                        <Link href='/tournaments' className=" text-white py-3 px-8 block w-max rounded-lg text-xl hover:bg-[#313e48] transition duration-300">
                            Browse Tournaments
                        </Link>
                    </div>


                </div>
            </div>
        </div>
    )
}

export default Tournament