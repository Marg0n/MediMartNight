// components/home/TestimonialSection.tsx

"use client";

import Image from "next/image";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const testimonials = [
  {
    id: 1,
    name: "Mr. Jobayer",
    role: "Regular Customer",
    quote:
      "MediMart has made managing my health so much easier. Their fast delivery and top-notch service always impress me!",
    image: "https://avatars.githubusercontent.com/u/112149785?v=4",
  },
  {
    id: 2,
    name: "Dr. Sakib",
    role: "Physician",
    quote:
      "I often recommend MediMart to my patients. The range of quality medical products is unmatched!",
    image: "https://avatars.githubusercontent.com/u/73853966?v=4",
  },
  {
    id: 3,
    name: "Ms. Afrina",
    role: "Caring Sister",
    quote:
      "As a mom, I love the convenience and peace of mind MediMart gives me when buying baby and health products.",
    image:
      "https://img.freepik.com/foto-gratuito/silhouette-di-donne-con-bicicletta-e-bel-cielo_1150-5338.jpg",
  },
  {
    id: 4,
    name: "Mr Shoybal",
    role: "Pharmacy Owner",
    quote:
      "MediMart helped streamline my stock purchases with reliable service and great wholesale deals. Highly recommended!",
    image: "https://i.ibb.co.com/KNVKRLQ/model-boy.jpg",
  },
  {
    id: 5,
    name: "Mr. D' Costa",
    role: "Engineer",
    quote:
      "Ordering from MediMart is quick and effortless. I get my kid’s essentials delivered without the stress of shopping.",
    image: "https://avatars.githubusercontent.com/u/54356991?v=4",
  },
  {
    id: 6,
    name: "Tariq Hasan",
    role: "Busy Parent",
    quote:
      "Ordering from MediMart is quick and effortless. I get my kid’s essentials delivered without the stress of shopping.",
    image: "https://i.ibb.co.com/mHM9fJc/model-boy1.jpg",
  },
  {
    id: 7,
    name: "Maliha Ahmed",
    role: "Diabetic Patient",
    quote:
      "MediMart has been a blessing! I never miss my meds thanks to their timely reminders and easy subscription service.",
    image: "https://i.ibb.co.com/Cmxf0yL/model-girl8.jpg",
  },
];

const TestimonialSection = () => {
  return (
    <section className="py-16 text-center">
      <div className="container mx-auto px-4 md:px-0 max-w-3xl">
        <h2 className="text-3xl font-bold text-[#4F46E5] mb-6">
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
              <div className="bg-white p-8 rounded-lg shadow-md min-h-[42vh] border">
                <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-primary mb-4">
                  <Image
                    src={t.image}
                    alt={t.name}
                    width={100}
                    height={100}
                    className="object-cover w-full h-full"
                  />
                </div>
                <blockquote className="italic text-muted-foreground mb-4">
                  “{t.quote}”
                </blockquote>
                <p className="font-semibold text-lg">{t.name}</p>
                <p className="text-sm text-gray-500">{t.role}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default TestimonialSection;
