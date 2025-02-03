'use client';
import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
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

const Page = () => {
    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedName, setEditedName] = useState("");
    const [editedEmail, setEditedEmail] = useState("");
    const router = useRouter();

    useEffect(() => {
        // Auto-login: fetch user data from the backend
        fetch("https://p4-full-stack-project.onrender.com/check_session", {
            method: "GET",
            credentials: "include",
        }).then((r) => {
            if (r.ok) {
                r.json().then((userData) => {
                    setUser(userData);
                    setEditedName(userData.name);
                    setEditedEmail(userData.email);
                });
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
        // Send a DELETE request to log out, clear state and redirect to homepage
        fetch("https://p4-full-stack-project.onrender.com/logout", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            credentials: "include"
        }).then(r => {
            if (r.ok) {
                setUser(null);
                router.push("/");
            }
        });
    };

    const handleDeleteAccount = async () => {
        const confirmed = window.confirm("Are you sure you want to delete your account? This action cannot be undone.");
        if (!confirmed) return;

        try {
            const response = await fetch(`https://p4-full-stack-project.onrender.com/users/${user.id}`, {
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

    const handleSaveProfile = async () => {
        // Send PATCH request to update user's name and email
        try {
            const response = await fetch(`https://p4-full-stack-project.onrender.com/users/${user.id}`, {
                method: "PATCH", 
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ name: editedName, email: editedEmail })
            });
            if (response.ok) {
                const updatedUser = await response.json();
                setUser(updatedUser);
                setIsEditing(false);
            }
        } catch (error) {
            console.error("Failed to update profile", error);
        }
    };

    return (
        <>
            <Navbar user={user} setUser={setUser} />
            <div className={`min-h-screen flex flex-col items-center bg-[#141B21] text-white p-6 space-y-12 pt-[148px] ${lato.className}`}>
                <h1 className={`text-4xl font-bold mb-6 text-center ${nunito.className}`}>Profile</h1>
                <div className="w-full max-w-3xl bg-gray-900 p-6 rounded-3xl shadow-lg flex flex-col items-center space-y-4">
                    <div className='w-full text-end'>
                        <button onClick={() => setIsEditing(true)} className="text-gray-400 hover:text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                            </svg>
                        </button>
                    </div>
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

                    {isEditing ? (
                        <div className="flex flex-col items-center space-y-2 w-full">
                            <input
                                type="text"
                                value={editedName}
                                onChange={(e) => setEditedName(e.target.value)}
                                className="w-full p-2 rounded-md bg-gray-800 text-white border border-gray-700"
                                placeholder="Name"
                            />
                            <input
                                type="email"
                                value={editedEmail}
                                onChange={(e) => setEditedEmail(e.target.value)}
                                className="w-full p-2 rounded-md bg-gray-800 text-white border border-gray-700"
                                placeholder="Email"
                            />
                            <div className="flex gap-4 mt-2">
                                <button onClick={handleSaveProfile} className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg">
                                    Save Changes
                                </button>
                                <button onClick={() => setIsEditing(false)} className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg">
                                    Cancel
                                </button>
                            </div>
                        </div>
                    ) : (
                        <>
                            <h2 className="text-2xl font-semibold">{user.name}</h2>
                            <p className="text-lg text-gray-300">{user.email}</p>
                        </>
                    )}
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
    );
};

export default Page;
