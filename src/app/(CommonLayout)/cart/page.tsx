"use client";

import Address from "@/components/modules/cart/Address";
import CartProducts from "@/components/modules/cart/CartProducts";
import PaymentDetails from "@/components/modules/cart/PaymentDetails";
import { resetCart } from "@/redux/features/cartSlice";
import { useAppDispatch } from "@/redux/hooks";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

const CartPage = () => {
  const dispatch = useAppDispatch();

  const handleClearCart = () => {
    dispatch(resetCart());
  };

  return (
    // <div className=" flex flex-col lg:grid grid-cols-12 gap-8 my-5 container mx-auto">
    //   <CartProducts />
    //   <Address />
    //   <PaymentDetails />
    //   {/* Optional: Add a "Clear Cart" button */}
    //   <div className="col-span-12 flex justify-center items-center mt-5">
    //     {/* <CustomButton
    //       textName="Clear Cart"
    //       handleAnything={handleClearCart}
    //       className="w-[90%] text-xl font-semibold py-2!"
    //     /> */}
    //     <Button
    //       variant="outline"
    //       onClick={handleClearCart}
    //       className="w-[90%] text-xl font-semibold py-2!"
    //     >
    //       Clear Cart
    //     </Button>
    //   </div>
    // </div>
    <div className="container mx-auto my-10 px-4">
      {/* Heading with animation */}
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#4F46E5] mb-2 tracking-tight">
          Your Shopping Cart
        </h1>
        <p className="text-gray-600 text-lg animate-fade-in">
          Review your items, provide shipping details, and complete your purchase
        </p>
      </div>

      {/* Grid layout with subtle card shadow effect */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fade-up">
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white shadow-md rounded-xl p-6 transition duration-300 ease-in-out hover:shadow-lg">
            <CartProducts />
          </div>
        </div>

        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white shadow-md rounded-xl p-6 transition duration-300 ease-in-out hover:shadow-lg">
            <Address />
          </div>
          <div className="bg-white shadow-md rounded-xl p-6 transition duration-300 ease-in-out hover:shadow-lg">
            <PaymentDetails />
          </div>

          {/* Clear Cart Button */}
          <div className="flex justify-center">
            <Button
              variant="destructive"
              onClick={handleClearCart}
              className="w-full text-lg font-semibold py-3 transition-all hover:scale-[1.02]"
            >
              <Sparkles className="mr-2 h-5 w-5" />
              Clear Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
