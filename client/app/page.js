'use client';
import { Nunito, Lora } from "next/font/google";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";


const nunito = Nunito({
  weight: ["200", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
  display: "swap",
});



export default function Home() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // auto-login
    fetch("https://p4-full-stack-project.onrender.com/check_session", {method: "GET", credentials: "include"}).then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar user={user} setUser={setUser}/>
      <Hero/>
      <About/>
      <Footer/>
    </div>
  );
}
