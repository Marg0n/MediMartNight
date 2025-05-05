"use client";

import styles from "./HeroSection.module.css";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const HeroSection = () => {

  // navigation
  const router = useRouter();

  return (
    <div className={`${styles.banner} container mx-auto border-2 border-white rounded-3xl mt-10 relative`}>
        <div className="absolute inset-0 rounded-3xl container mx-auto h-[500px] opacity-60 bg-gradient-to-r from-indigo-500 via-gray-800 to-purple-400"></div>

      <div className="flex flex-col items-center justify-center text-center px-6 py-20 md:py-32">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
          Welcome to <span className="text-pink-400">Medi</span><span className="text-blue-500">Mart</span>
        </h1>
        <p className="text-lg md:text-xl text-white drop-shadow-lg font-semibold max-w-2xl mb-10">
          Your one-stop destination for affordable and trusted medical products delivered with care.
        </p>
        
        {/* <CustomButton textName="Shop Now" handleAnything={()=> router.push("/shop")}/> */}

        <Button 
          variant="outline"  
          className="bg-transparent text-white drop-shadow-lg hover:text-black h-12 z-10"
          onClick={()=> router.push("/shop")}
        >
          Shop Now
        </Button>
      </div>
    </div>
  );
};

export default HeroSection;
