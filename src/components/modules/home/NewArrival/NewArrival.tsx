/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { getAllProducts } from "@/services/Product";

interface SlideType {
  id: number;
  imgSrc: string;
  name: string;
  brand: string;
  price: number;
  description: string;
  genericName: string;
  strength: string;
  dosCategory: string;
  symptoms: string;
  requiredPrescription: string;
  expiryDate: string;
  updatedAt: string;
}

const NewArrival = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);
  const [slides, setSlides] = useState<SlideType[]>([]);

  const filters = {
    searchTerm: "",
    category: "",
    symptoms: "",
  };

  const fetchProducts = async (pageNum = 1, limit = 1000) => {
    try {
      setLoading(true);
      const res = await getAllProducts(
        pageNum.toString(),
        limit.toString(),
        filters
      );

      const newProducts = res?.data?.result || [];

      const sorted = [...newProducts].sort(
        (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      );

      const filtered = await sorted.filter((m) => m.updatedAt && m.Img);

      const topNew = filtered.slice(0, 10).map((medicine, index) => ({
        id: index + 1,
        imgSrc: medicine.Img || "",
        name: medicine.name || "",
        brand: medicine.brand || "",
        price: medicine.price || 0,
        description: medicine.description || "",
        genericName: medicine.genericName || "",
        strength: medicine.strength || "",
        dosCategory: medicine.dosCategory || "",
        symptoms: medicine.symptoms || "",
        requiredPrescription: medicine.requiredPrescription || "",
        expiryDate: medicine.expiryDate || "",
        updatedAt: medicine.updatedAt || "",
      }));

      setSlides(topNew);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const autoSlide = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(autoSlide);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  if (loading) return <div className="text-center py-10">Loading new arrivals...</div>;

  return (
    <div className="container mx-auto px-4 md:max-h-[60vh] mt-16 md:mb-12">
      <h2 className="text-4xl font-extrabold text-center mb-10 bg-gradient-to-r from-indigo-600 to-rose-500 bg-clip-text text-transparent">
        New Arrivals
      </h2>

      <div className="relative w-full bg-white rounded-xl shadow-md p-6 flex flex-col md:flex-row items-center gap-6 md:max-h-[50vh]">
        <ChevronLeft
          className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-600 cursor-pointer z-10"
          onClick={prevSlide}
          size={28}
        />

        {slides.length > 0 && (
          <>
            <Image
              src={slides[currentSlide]?.imgSrc}
              alt={slides[currentSlide]?.name}
              width={300}
              height={300}
              className="rounded-lg object-contain !h-56 w-full md:!w-1/3"
            />

            <div className="w-full md:w-2/3 md:!h-56 h-72 space-y-2 text-gray-800 px-4">
              <h3 className="text-2xl font-bold">{slides[currentSlide].name}</h3>
              <p className="text-sm text-gray-500 italic">{slides[currentSlide].brand}</p>
              <p className="text-lg font-semibold text-green-600">৳ {slides[currentSlide].price}</p>
              <p className="text-sm">{slides[currentSlide].description}</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 text-sm mt-2">
                <p><strong>Generic:</strong> {slides[currentSlide].genericName}</p>
                <p><strong>Strength:</strong> {slides[currentSlide].strength}</p>
                <p><strong>Dose:</strong> {slides[currentSlide].dosCategory}</p>
                <p><strong>Symptoms:</strong> {slides[currentSlide].symptoms}</p>
                <p><strong>Prescription:</strong> {slides[currentSlide].requiredPrescription}</p>
                <p><strong>Expiry:</strong> {new Date(slides[currentSlide].expiryDate).toLocaleDateString()}</p>
              </div>

              <p className="text-xs text-gray-400 mt-2">
                Updated: {new Date(slides[currentSlide].updatedAt).toLocaleString()}
              </p>
            </div>
          </>
        )}

        <ChevronRight
          className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-600 cursor-pointer z-10"
          onClick={nextSlide}
          size={28}
        />
      </div>
    </div>
  );
};

export default NewArrival;