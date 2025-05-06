"use client";
import Image from "next/image";
import React from "react";

const aboutContent = [
  {
    title: "What is MediMart?",
    image: "/images/img/us1.png",
    content: `MediMart is the very first premium online medicine brand manufactured in Bangladesh. The brand is owned by Meghna, the number 1 premium medicine manufacturer in South Asia. MediMart started its journey back in 2014 to provide affordable premium medicine for patients, while maintaining all European ISO standards.`,
  },
  {
    title: "MediMart Market Position",
    image: "/images/img/us2.png",
    content: `MediMart is currently the most well-known medicine brand in Bangladesh, holding over 80% of the premium medicine market. Having expanded to India in 2020, MediMart continues to grow its presence across South Asia.`,
  },
  {
    title: "MediMart Understands Your Needs",
    image: "/images/img/us3.jpg",
    content: `Understanding urban lifestyle challenges—traffic, parking, and medicine availability—MediMart offers convenience, reliable drug info, reminders, and alternatives to make life easier.`,
  },
  {
    title: "Providing Quality is MediMart’s Priority",
    image: "/images/img/us4.png",
    content: `MediMart has the largest medicine inventory in Bangladesh with over 7 lakh products. From OTC drugs to wellness and medical devices, we deliver trusted quality at the best prices.`,
  },
  {
    title: "The Services MediMart Offers",
    image: "/images/img/us5.jpg",
    content: `We offer a 360° wellness solution—from nationwide delivery, trained online doctors to certified pharmacists available around the clock—designed to care for your every health need.`,
  },
  {
    title: "MediMart Online Pharmacy",
    image: "/images/img/us6.jpg",
    content: `Our platform allows easy prescription uploads and access to authentic, long-expiry medicines. Managed by A-Category pharmacists, we provide professional care with every order.`,
  },
];

const AboutSection = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <h2 className="text-center text-4xl font-bold text-[#4F46E5] mb-16">
        Discover <span className="text-pink-500">Medi</span>Mart
      </h2>
      <div className="space-y-20">
        {aboutContent.map((section, index) => (
          <div
            key={section.title}
            className={`flex flex-col-reverse lg:flex-row ${
              index % 2 !== 0 ? "lg:flex-row-reverse" : ""
            } items-start gap-10 lg:gap-16 bg-white shadow-lg rounded-3xl p-8 lg:p-12 transition duration-300 hover:shadow-xl`}
          >
            <div className="w-full lg:w-1/2 space-y-16">
              <h3 className="text-3xl font-semibold text-gray-800">
                {section.title.includes("MediMart") ? (
                  <>
                    {section.title.split("MediMart")[0]}
                    <span className="text-pink-500 font-semibold">
                      Medi
                      <span className="text-[#4F46E5] font-semibold">
                        Mart
                      </span>
                    </span>
                    {section.title.split("MediMart")[1]}
                  </>
                ) : (
                  section.title
                )}
              </h3>
              <p className="text-gray-600 text-base leading-relaxed">
                {section.content}
              </p>
            </div>
            <div className="w-full lg:w-1/2">
              <Image
                src={section.image}
                alt={section.title}
                width={500}
                height={400}
                className="rounded-2xl shadow-md object-cover w-full h-full max-h-[400px]"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutSection;
