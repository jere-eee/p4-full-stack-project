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

const Hero = () => {
    return (
      <section className="bg-gradient-to-b to-[#00472D] from-[#00663f] min-h-screen text-white py-16 px-10 sm:px-20 md:px-40 pt-80"> {/* Add pt-32 to push content below navbar */}
        <div className={`${lato.className} antialiased container m-auto text-center`}>
          <h1 className={`${nunito.className} antialiased text-6xl sm:text-7xl font-extrabold mb-8`}>
            Welcome to GamerzHub
          </h1>
          <p className="text-lg sm:text-xl mb-8">
            Your community for gaming tournaments, news, and more.
          </p>
          <button className=" text-white py-3 px-8 rounded-lg text-xl hover:bg-[#343434] transition duration-300">
            Get Started
          </button>
        </div>
      </section>
    );
  };
  
  export default Hero;
  