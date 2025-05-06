/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

// import PrescriptionUploader from "@/components/PrescriptionUploader/PrescriptionUploader";
import { CartProduct, orderedMedicinesSelector, orderSelector, resetCart } from "@/redux/features/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
// import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useUser } from "@/contexts/UserContext";
import { createOrder } from "@/services/cart";
import { useState } from "react";
import PrescriptionUploader from "@/components/PrescriptionUploader/PrescriptionUploader";
import { Button } from "@/components/ui/button";

// Optional currency formatter
const currencyFormatter = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "BDT",
  }).format(value);

// new Intl.NumberFormat("en-BD", {
//   style: "currency",
//   currency: "BDT",
//   currencyDisplay: "symbol", //? You can also try "narrowSymbol"
//   maximumFractionDigits: 0,  //? Optional: Remove decimals if not needed
// }).format(value);

const PaymentDetails = () => {
  //* redux
  const cart = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const cartProducts = useAppSelector(orderedMedicinesSelector);
  const order = useAppSelector(orderSelector);

  //* user info
  const user = useUser();

  //* router
  const router = useRouter();

  //* state for prescription
  const [isPrescriptionUploaded, setPrescriptionUploaded] = useState(false);

  const handlePrescriptionUpload = () => {
    setPrescriptionUploaded(true);
  };

  const subTotal = cart.medicines.reduce(
    (total: number, product: CartProduct) =>
      total + product.price * product.orderQuantity,
    0
  );

  const shippingCost = !cart.city ? 0 : cart.city === "Dhaka" ? 50 : 300;
  const grandTotal = subTotal + shippingCost;

  const isOrderDisabled = cart.medicines.some(
    (product) =>
      product.requiredPrescription === "Yes" && !isPrescriptionUploaded
  );

  const anyPrescriptionRequiredItem = cart.medicines.find(
    (product) => product.requiredPrescription === "Yes"
  );

  //* order handle
  const handleOrder = async () => {
    //* toast id
    const orderLoading = toast.loading("Order is in process");

    try {
      if (!user.user) {
        router.push("/login");
        throw new Error("Please login first.");
      }
      if (isOrderDisabled) {
        toast.error("Prescription is required!");
        return; //? Prevent ordering without prescription
      }
      if (!cart.city) {
        throw new Error("City is missing");
      }
      if (!cart.shippingAddress) {
        throw new Error("Shipping address is missing");
      }
      if (cartProducts.length === 0) {
        throw new Error("Cart is empty, what are you trying to order ??");
      }

      //* submit type match
      const orderData = { 
        ...order, 
        user: user.user._id as string,
        shippingCost: shippingCost as number,
        totalPrice: grandTotal as number
      };

      const token = localStorage.getItem('authToken')
 
      //! console.log(orderData);

      //* Perform order submission logic (e.g., sending data to an API)
      const res = await createOrder(orderData, token as string);

      console.log("108 res", res);

      if (res.success) {
        router.push(res.data.GatewayPageURL);
        // toast.success(res.message, { id: orderLoading });
        //? Once the order is placed, reset the cart
        dispatch(resetCart());
        // toast.success("Order placed successfully!");
      }

      if (!res.success) {
        toast.error(res.message, { id: orderLoading });
      }
    } catch (error: any) {
      toast.error(error.message, { id: orderLoading });
    }
  };

  return (
    <div className="border-2 border-white bg-background brightness-105 rounded-md col-span-4 h-fit p-5">
      <h1 className="text-2xl font-bold">Payment Details</h1>

      <div className="space-y-2 mt-4">
        <div className="flex justify-between">
          <p className="text-gray-500">Subtotal</p>
          <p className="font-semibold">{currencyFormatter(subTotal)}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-gray-500">Shipment Cost</p>
          <p className="font-semibold">{currencyFormatter(shippingCost)}</p>
        </div>
      </div>

      <div className="flex justify-between mt-10 mb-5">
        <p className="text-gray-500">Grand Total</p>
        <p className="font-semibold">{currencyFormatter(grandTotal)}</p>
      </div>

      {cart.medicines.some(
        (product) => product.requiredPrescription === "Yes"
      ) && (
        <PrescriptionUploader
          orderId={anyPrescriptionRequiredItem?._id as string}
          onUploaded={handlePrescriptionUpload}
        />
      )}

      {/* <CustomButton
        textName="Order Now"
        handleAnything={handleOrder}
        className="w-full py-1!"
        // disabled={isOrderDisabled}
      /> */}
      <Button 
        variant="outline"
        onClick={handleOrder}
        className="font-semibold w-full"
        // disabled={isOrderDisabled}
      >
        Order Now
      </Button>

    </div>
  );
};

export default PaymentDetails;
