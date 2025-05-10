// components/home/TestimonialSection.tsx

"use client";

import Image from "next/image";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Mr. Jobayer",
    role: "Regular Customer",
    rating: 5,
    quote:
      "MediMart has made managing my health so much easier. Their fast delivery and top-notch service always impress me!",
    image: "https://avatars.githubusercontent.com/u/112149785?v=4",
  },
  {
    id: 2,
    name: "Dr. Sakib",
    role: "Physician",
    rating: 4,
    quote:
      "I often recommend MediMart to my patients. The range of quality medical products is unmatched!",
    image: "https://avatars.githubusercontent.com/u/73853966?v=4",
  },
  {
    id: 3,
    name: "Ms. Afrina",
    role: "Caring Sister",
    rating: 5,
    quote:
      "As a mom, I love the convenience and peace of mind MediMart gives me when buying baby and health products.",
    image:
      "https://img.freepik.com/foto-gratuito/silhouette-di-donne-con-bicicletta-e-bel-cielo_1150-5338.jpg",
  },
  {
    id: 4,
    name: "Mr Shoybal",
    role: "Pharmacy Owner",
    rating: 4,
    quote:
      "MediMart helped streamline my stock purchases with reliable service and great wholesale deals. Highly recommended!",
    image: "https://i.ibb.co.com/KNVKRLQ/model-boy.jpg",
  },
  {
    id: 5,
    name: "Mr. D' Costa",
    role: "Engineer",
    rating: 5,
    quote:
      "Ordering from MediMart is quick and effortless. I get my kid’s essentials delivered without the stress of shopping.",
    image: "https://avatars.githubusercontent.com/u/54356991?v=4",
  },
  {
    id: 6,
    name: "Tariq Hasan",
    role: "Busy Parent",
    rating: 4,
    quote:
      "Ordering from MediMart is quick and effortless. I get my kid’s essentials delivered without the stress of shopping.",
    image: "https://i.ibb.co.com/mHM9fJc/model-boy1.jpg",
  },
  {
    id: 7,
    name: "Maliha Ahmed",
    role: "Diabetic Patient",
    rating: 5,
    quote:
      "MediMart has been a blessing! I never miss my meds thanks to their timely reminders and easy subscription service.",
    image: "https://i.ibb.co.com/Cmxf0yL/model-girl8.jpg",
  },
];

const TestimonialSection = () => {
  return (
    <section className=" px-4 md:px-0 bg-gradient-to-b from-white via-[#f9f9ff] to-white py-12">
      <div className="container mx-auto max-w-[90vw]">
        <h2 className="text-4xl font-extrabold text-center mb-14 bg-gradient-to-r from-[#4F46E5] to-rose-500 bg-clip-text text-transparent tracking-wide">
          What People Say
        </h2>

        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000 }}
          loop
          spaceBetween={30}
          className="w-full"
        >
          {testimonials.map((t) => (
            <SwiperSlide key={t.id}>
              {/* Wrap the card in a motion.div for animation */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="bg-white/70 backdrop-blur-md rounded-3xl  min-h-[45vh] flex flex-col items-center text-center  transition duration-300 ease-in-out"
              >
                <div className="bg-white/70 backdrop-blur-md p-8 rounded-3xl border border-[#e0e0f0] min-h-[45vh] flex flex-col items-center text-center transition duration-300 ease-in-out">
                  {/* Avatar */}
                  <div className="relative w-24 h-24 mb-6">
                    <div className="absolute -inset-1 bg-gradient-to-r from-[#4F46E5] to-rose-400 rounded-full blur-md opacity-60"></div>
                    <div className="relative rounded-full overflow-hidden border-4 border-white shadow-lg w-full h-full ring-offset-2 ring-2">
                      <Image
                        src={t.image}
                        alt={t.name}
                        width={100}
                        height={100}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </div>

                  {/* Star Ratings */}
                  <div className="flex items-center justify-center mb-2 text-yellow-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={i < t.rating ? "text-yellow-400" : "text-gray-300"}/>
                    ))}
                  </div>

                  {/* Quote */}
                  <blockquote className="italic text-gray-600 text-base md:text-lg leading-relaxed relative px-4">
                    <span className="text-5xl text-[#4F46E5] font-serif absolute -left-4 top-[-10px]">
                      &ldquo;
                    </span>
                    {t.quote}
                    <span className="text-5xl text-[#4F46E5] font-serif absolute -right-4 bottom-[-10px]">
                      &rdquo;
                    </span>
                  </blockquote>

                  {/* Name and Role */}
                  <p className="mt-6 font-bold text-lg text-gray-800">
                    {t.name}
                  </p>
                  <p className="text-sm text-gray-500">{t.role}</p>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default TestimonialSection;
