'use client';
import React, { useState } from 'react'
import Navbar from '../components/Navbar'

const page = () => {
    const [user, setUser] = useState(null)

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

    return (
        <div>
            <Navbar user={user} setUser={setUser}/>
        </div>
    )
}

export default page