import Link from 'next/link'
import React from 'react'
import { Lato, Nunito } from "next/font/google";

const lato = Lato({
    weight: ["100", "300", "400", "700", "900"],
    subsets: ["latin"],
    display: "swap",
});

const nunito = Nunito({
    weight: ["200", "300", "400", "500", "700", "900"],
    subsets: ["latin"],
    display: "swap",
});

const Footer = () => {
    return (
        <footer className={`bg-card bg-gradient-to-r text-[#FFFFFF] from-[#141B21] to-[#313e48] ${lato.className} antialiased px-4 md:px-40`}>
            <div className="container mx-auto px-4 py-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h3 className={`text-lg font-semibold mb-4 ${nunito.className} antialiased`}>About Us</h3>
                        <p className={`text-muted-foreground ${lato.className} antialiased`}>
                            GamerzHub is a haven for gamers from all walks of life to connect and compete.
                        </p>
                        <div>

                        </div>
                    </div>
                    <div>
                        <h3 className={`text-lg font-semibold mb-4 ${nunito.className} antialiased`}>Quick Links</h3>
                        <ul className="space-y-2 text-muted-foreground ">
                            <li>
                                <Link href='/'>Home</Link>
                            </li>

                            <li>
                                <Link href='/tournaments'>Browse Tournaments</Link>
                            </li>

                            <li>
                                <Link href='/games'>Check out Games</Link>
                            </li>
                            <li>
                                <Link href='/contact'>Contact Us</Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className={`text-lg font-semibold mb-4 ${nunito.className} antialiased`}>Legal</h3>
                        <ul className="space-y-2 text-muted-foreground">
                            <li>Help Center</li>
                            <li>Terms of Service</li>
                            <li>Privacy Policy</li>
                        </ul>
                    </div>
                </div>
                <div className={`border-t border-border mt-12 pt-8 text-start text-muted-foreground ${nunito.className} antialiased`}>
                    <p className='font-extrabold'>© GamerzHub. 2025 All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer