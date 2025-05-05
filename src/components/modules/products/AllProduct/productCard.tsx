/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
// components/ProductCard.tsx
import { Button } from "@/components/ui/button";
import { addProduct } from "@/redux/features/cartSlice";
import { useAppDispatch } from "@/redux/hooks";
import { TMedicine } from "@/types";
import { ShoppingCart, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const ProductCard = ({ medicine }: { medicine: TMedicine }) => {
  const dispatch = useAppDispatch();

  const handleAddProduct = (medicine: TMedicine) => {
    dispatch(addProduct(medicine));
  };

  const router = useRouter();

  const handleBuyNow= (e: any) =>{    
    e.preventDefault(); //  Prevent <Link> default nav
    e.stopPropagation(); //  Prevents the Link from triggering / event bubbling
    handleAddProduct(medicine)
    router.push(`/cart`);
  }

  return (
    <>
      {/* Card Container */}
      <div className="border p-4 w-72 rounded-md shadow-gray-200 transition-all duration-500 ease-in-out hover:-translate-y-2 hover:shadow-lg flex flex-col">
        <Link href={`/shop/${medicine?._id}`}>
          {/* Make image and name clickable via Link */}
          <div className="relative w-full h-40 overflow-hidden rounded-md group">
            <Image
              src={medicine?.Img as string}
              alt={medicine?.name}
              fill
              sizes="(max-width: 768px) 100vw,
       (max-width: 1200px) 50vw,
       33vw"
              className="object-cover rounded-md transition-transform duration-300 group-hover:scale-110"
            />
          </div>
          <h4 className="font-semibold text-sm mt-2">{medicine?.name}</h4>
          <p className="font-bold mt-2">${medicine?.price}</p>
        </Link>
        {/* Buttons */}
        <div className="flex items-center mt-auto pt-4 space-x-4">
          <Button
            onClick={handleBuyNow}
            variant="outline"
            className="flex items-center gap-2 cursor-pointer"
          >
            <Zap className="w-5 h-5" />
            Buy Now
          </Button>
          <Button
            onClick={() => handleAddProduct(medicine)}
            variant="outline"
            className="flex items-center gap-2 cursor-pointer"
          >
            <ShoppingCart className="w-5 h-5" />
            Add to Cart
          </Button>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
