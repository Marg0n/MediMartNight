"use client";
import Image from "next/image";
import partner1 from "../../../../assets/partners/ACI_logo.svg.png"
import partner2 from "../../../../assets/partners/Logo_of_Acme_Laboratories.svg.png"
import partner3 from "../../../../assets/partners/Logo_of_Beximco_Pharma_(with_tagline).svg.png"
import partner4 from "../../../../assets/partners/Logo_of_SK+F.svg.png"
import partner5 from "../../../../assets/partners/Renata_ltd_logo.jpg"
import partner6 from "../../../../assets/partners/Square_pharma80.png"


const partners = [
  { name: "Partner 1", src: partner1 },
  { name: "Partner 2", src: partner2 },
  { name: "Partner 3", src: partner3 },
  { name: "Partner 4", src: partner4 },
  { name: "Partner 5", src: partner5 },
  { name: "Partner 6", src: partner6 },
];

const OurPartners = () => {
  return (
    <section className="container mx-auto px-4 py-16">
      <h2 className="text-4xl font-extrabold text-center mb-6 bg-gradient-to-r from-indigo-600 to-rose-500 bg-clip-text text-transparent">
        Trusted by Industry Leaders
      </h2>
      <p className="text-center text-gray-500 mb-12 text-lg">
        We proudly partner with the most trusted names in the healthcare industry.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 items-center justify-items-center">
        {partners.map((partner, idx) => (
          <div key={idx} className="w-32 h-20 relative">
            <Image
              src={partner?.src}
              alt={partner?.name}
              layout="fill"
              objectFit="contain"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurPartners;
