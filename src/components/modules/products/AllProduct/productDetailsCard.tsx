/* eslint-disable @typescript-eslint/no-unused-vars */
 
// pages/product/[id].tsx
import { Button } from "@/components/ui/button";
import { TMedicine } from "@/types";
import {
  AlertCircle,
  CalendarDays,
  ClipboardCheck,
  Coffee,
  CreditCard,
  Heart,
  Info,
  RefreshCcw,
  Sun,
  Video,
  Warehouse,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import RelatedProducts from "./relatedProducts";
import AddToCartButton from "@/components/shared/AddToCartButton";
import BuyNow from "@/components/shared/BuyNow";
// import { useRouter } from "next/navigation";



const ProductDetails = async ({ medicine }: { medicine: TMedicine }) => {
  const originalPrice = Number(medicine?.price) + 50;
  const savings = originalPrice - Number(medicine?.price);

  // const router = useRouter();
  
  //   const handleBuyNow= (e: any) =>{    
  //     e.preventDefault(); //  Prevent <Link> default nav
  //     e.stopPropagation(); //  Prevents the Link from triggering / event bubbling
  //     router.push(``);
  //   }

  //* Date format view option e.g. 25 Feb 2026
  const options: Intl.DateTimeFormatOptions = { 
    day: '2-digit', 
    month: 'short', // 'long', 'short', 'numeric', '2-digit'
    year: 'numeric' 
  };

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Main Product Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border  p-6 rounded-md  bg-white  shadow-blue-200 transition-all duration-500 ease-in-out hover:-translate-y-2 hover:shadow-lg  border-gray-200">
        {/* Image Container */}

        <div className="relative w-full h-full overflow-hidden rounded-md group">
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

        {/* Product Info */}
        <div className="flex flex-col gap-4">
          <h2 className="font-bold text-2xl text-gray-800">{medicine?.name}</h2>

          <p className="text-sm text-gray-600 italic">
            Generic Name:{" "}
            <span className="font-semibold">{medicine?.genericName}</span>
          </p>

          <p className="text-justify text-gray-700 text-sm leading-relaxed">
            {medicine?.description}
          </p>

          {/* Pricing */}
          <div className="space-y-1">
            <p className="line-through text-lg text-red-700 font-semibold">
              💸Previous Price: ${originalPrice}
            </p>
            <p className="text-lg font-semibold text-green-700">
              💰Current Price: ${medicine?.price}
            </p>
            <p className="text-sm text-blue-600 font-medium">
              You Save: 🎉${savings}
            </p>
          </div>

          {/* Extra Info */}
          <div className="text-sm text-gray-700 space-y-1">
            <p>
              <strong>🏷️ Brand: </strong> {medicine?.brand}
            </p>
            <p>
              <strong>💪 Healthcare Pharmaceuticals Strength: </strong>{" "}
              {medicine?.strength}
            </p>
            <p>
              <strong>💊 Dosage Form:</strong> {medicine?.dosCategory}
            </p>
            <p>
              <strong>📦 Quantity: </strong> {medicine?.quantity} pcs
            </p>
            <p>
              <strong>📝 Prescription Required:</strong>{" "}
              {medicine?.requiredPrescription}
            </p>
            <p className="flex items-center gap-2">
                <CalendarDays className="w-4 h-4" /> 
              <strong>                
                Expiry:{" "}
              </strong>
              {new Date(medicine?.expiryDate).toLocaleDateString( 'en-GB', options )}
            </p>
            <p className="flex items-center gap-2">
                <Warehouse className="w-4 h-4" /> 
              <strong>
                Availability:{" "}
              </strong>
              {medicine?.inStock ? "In Stock" : "Out of Stock"}
            </p>
            <p>
              <strong>🔬 Manufacturer:</strong> {medicine?.manufacturerDetails}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-4">
              <BuyNow medicine={medicine}/>
            {/* <Button variant="outline" className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5" />
              Add to Cart
            </Button> */}
            <AddToCartButton medicine={medicine} />
          </div>
        </div>
      </div>

      {/* Doctor's Advice Section */}
      <div className="mt-10 p-6 bg-white rounded-md shadow-blue-200 transition-all duration-500 ease-in-out hover:-translate-y-2 hover:shadow-lg border border-gray-200">
        <h3 className="font-bold text-lg text-gray-800 mb-4">
          Doctor&apos;s Advice
        </h3>
        <ul className="list-inside space-y-2 text-sm text-gray-700">
          <li className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-yellow-500" />
            Take this medicine exactly as prescribed by your doctor.
          </li>
          <li className="flex items-center gap-2">
            <Info className="w-5 h-5 text-blue-500" />
            Do not exceed the recommended dose.
          </li>
          <li className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-red-500" />
            Take it preferably before meals.
          </li>
          <li className="flex items-center gap-2">
            <Coffee className="w-5 h-5 text-teal-500" />
            Swallow the tablet whole with water. Do not crush or chew.
          </li>
          <li className="flex items-center gap-2">
            <ClipboardCheck className="w-5 h-5 text-green-500" />
            Do not stop taking it suddenly without consulting your physician.
          </li>
          <li className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-red-500" />
            Inform your doctor if you are pregnant or breastfeeding.
          </li>
          <li className="flex items-center gap-2">
            <Coffee className="w-5 h-5 text-teal-500" />
            Avoid alcohol while taking this medication.
          </li>
          <li className="flex items-center gap-2">
            <Sun className="w-5 h-5 text-yellow-400" />
            Store the medicine in a cool, dry place away from sunlight.
          </li>
          <li className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-yellow-500" />
            Keep out of reach of children.
          </li>
          <li className="flex items-center gap-2">
            <RefreshCcw className="w-5 h-5 text-purple-500" />
            If you miss a dose, take it as soon as you remember — but never
            double up.
          </li>
        </ul>
      </div>

      {/* Video  Video Section */}
      <div className="mt-8 p-6 bg-white rounded-md  shadow-blue-200 transition-all duration-500 ease-in-out hover:-translate-y-2 hover:shadow-lg border border-gray-200">
        <h3 className="font-bold text-lg text-gray-800 mb-2 flex items-center gap-2">
          <Video className="w-5 h-5 text-red-600" /> Does It Matter When To Take
          Medicine | Medicine Before or After Food?
        </h3>
        <div className="w-full aspect-video">
          <iframe
            className="w-full h-full rounded-md"
            src="https://www.youtube.com/embed/0xyAgsBypJU?si=vjRHTcVaDcncmqO8"
            title="How to use Esoral"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
      {/* Related Products Section */}
      <div className="w[98%] mx-auto my-5 p-4  shadow-blue-200 transition-all duration-500 ease-in-out hover:-translate-y-2 hover:shadow-lg border border-gray-200">
        <RelatedProducts medicine={medicine} />
      </div>
    </div>
  );
};

export default ProductDetails;
