import { Nunito, Lora } from "next/font/google";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";


const nunito = Nunito({
  weight: ["200", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
  display: "swap",
});

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar/>
      <Hero/>
      <About/>
    </div>
  );
}
