'use client';
import React from 'react'
import Navbar from '../components/Navbar'
import { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import { Nunito, Lato } from "next/font/google";
import { useRouter } from 'next/navigation';


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

const page = () => {
    const [user, setUser] = useState(null);
    const router = useRouter();

    useEffect(() => {
        // Auto-login
        fetch("http://localhost:5000/check_session", {
            method: "GET",
            credentials: "include",
        }).then((r) => {
            if (r.ok) {
                r.json().then((user) => setUser(user));
            }
        });
    }, []);

    if (!user) {
        return (
            <div className={`min-h-screen flex items-center justify-center bg-[#141B21] text-white ${lato.className}`}>
                <p>Loading...</p>
            </div>
        );
    }
    const handleLogout = () => {
        // Clear user state on logout and delete in backend
        fetch("http://localhost:5000/logout", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            credentials: "include"
        }).then(r => {
            if (r.ok) {
                setUser(null);
                router.push("/");
            }
        })
    };

    const handleDeleteAccount = async () => {
        const confirmed = window.confirm("Are you sure you want to delete your account? This action cannot be undone.");
        if (!confirmed) return;

        try {
            const response = await fetch(`http://localhost:5000/users/${user.id}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                credentials: "include"
            });
            if (response.ok) {
                setUser(null);
                router.push("/");
            }
        } catch (error) {
            console.error("Failed to delete account", error);
        }
    };
    return (
        <>
            <Navbar user={user} setUser={setUser} />
            <div className={`min-h-screen flex flex-col items-center bg-[#141B21] text-white p-6 space-y-12 pt-[148px] ${lato.className}`}>
                <h1 className={`text-4xl font-bold mb-6 text-center ${nunito.className}`}>Profile</h1>
                <div className="w-full max-w-3xl bg-gray-900 p-6 rounded-3xl shadow-lg flex flex-col items-center space-y-4">
                    {user.profile_picture ? (
                        <img
                            src={user.profile_picture}
                            alt="Profile"
                            className="w-24 h-24 rounded-full object-cover"
                        />
                    ) : (
                        <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center text-3xl text-gray-700">
                            {user.name.charAt(0).toUpperCase()}
                        </div>
                    )}
                    <h2 className="text-2xl font-semibold">{user.name}</h2>
                    <p className="text-lg text-gray-300">{user.email}</p>
                    <div className="flex gap-4 mt-6">
                        <button
                            onClick={handleLogout}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
                        >
                            Logout
                        </button>
                        <button
                            onClick={handleDeleteAccount}
                            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg"
                        >
                            Delete Account
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default page