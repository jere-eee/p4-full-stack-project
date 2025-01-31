'use client';
import { useState } from "react";
import { Nunito, Lato } from "next/font/google";
import { FaEnvelope, FaPhone, FaFacebook, FaTwitter, FaDiscord } from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

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

const ContactPage = () => {
    const [openFAQ, setOpenFAQ] = useState(null);

    const faqs = [
        { question: "How can I join the gaming community?", answer: "You can sign up on our website by clicking the 'Sign Up' button on the homepage." },
        { question: "Where can I find upcoming tournaments?", answer: "Check our 'Tournaments' page for the latest events and schedules." },
        { question: "How do I submit a game review?", answer: "Navigate to the game page and fill out the review form under the 'Reviews' section." },
        { question: "Can I change my profile picture?", answer: "Yes! Go to your profile settings and upload a new picture." },
    ];

    return (
        <>
            <Navbar />
            <div className={`min-h-screen flex flex-col items-center bg-[#141B21] text-white p-6 space-y-12 ${lato.className}`}>
                <h1 className={`text-4xl font-bold mb-6 text-center ${nunito.className}`}>Contact Us</h1>

                {/* Contact Sections */}
                <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Email Section */}
                    <div className="bg-[#141B21] p-6 rounded-3xl shadow-lg text-center">
                        <FaEnvelope className="text-blue-400 text-3xl mx-auto mb-3" />
                        <h2 className="text-xl font-semibold">Email Us</h2>
                        <p className="text-gray-400 mt-2">Send us an email at</p>
                        <a href="mailto:support@gamingcommunity.com" className="text-blue-400 hover:underline block mt-1">support@gamingcommunity.com</a>
                    </div>

                    {/* Phone Section */}
                    <div className="bg-[#141B21] p-6 rounded-3xl shadow-lg text-center">
                        <FaPhone className="text-green-400 text-3xl mx-auto mb-3" />
                        <h2 className="text-xl font-semibold">Call Us</h2>
                        <p className="text-gray-400 mt-2">Reach out via phone</p>
                        <p className="text-white mt-1">+1 (123) 456-7890</p>
                    </div>

                    {/* Social Media Section */}
                    <div className="bg-[#141B21] p-6 rounded-3xl shadow-lg text-center md:col-span-2">
                        <h2 className="text-xl font-semibold mb-3">Follow Us</h2>
                        <p className="text-gray-400">Stay updated with our latest news</p>
                        <div className="flex justify-center space-x-6 mt-4">
                            <a href="https://facebook.com/gamingcommunity" target="_blank" className="flex items-center space-x-2 hover:text-blue-500 transition">
                                <FaFacebook className="text-2xl" />
                                <span>Facebook</span>
                            </a>
                            <a href="https://twitter.com/gamingcommunity" target="_blank" className="flex items-center space-x-2 hover:text-blue-400 transition">
                                <FaTwitter className="text-2xl" />
                                <span>Twitter</span>
                            </a>
                            <a href="https://discord.gg/gamingcommunity" target="_blank" className="flex items-center space-x-2 hover:text-purple-400 transition">
                                <FaDiscord className="text-2xl" />
                                <span>Discord</span>
                            </a>
                        </div>
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="w-full max-w-3xl bg-[#141B21] p-6 rounded-3xl shadow-lg">
                    <h2 className="text-2xl font-semibold text-center mb-4">Frequently Asked Questions</h2>
                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <div key={index} className="bg-gray-800 p-4 rounded-lg shadow-md">
                                <button
                                    className="w-full text-left flex justify-between items-center text-lg font-semibold"
                                    onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                                >
                                    {faq.question}
                                    <span className="text-blue-400">{openFAQ === index ? "▲" : "▼"}</span>
                                </button>
                                {openFAQ === index && <p className="text-gray-400 mt-2">{faq.answer}</p>}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </>

    );
};

export default ContactPage;
