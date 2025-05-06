/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Button } from "@/components/ui/button";
import { createProduct } from "@/services/Product";
import { TMedicine } from "@/types";
import { useState } from "react";
import { toast } from "sonner";

const AddMedicine = () => {
  const [formData, setFormData] = useState<TMedicine>({
    name: "", // Medicine Name
    brand: "", // Medicine Brand
    price: 0, // Medicine Price
    Img: "", // Image URL (Optional)
    symptoms: "Cough & Flu", // Default symptom type
    requiredPrescription: "Yes", // Default to Yes
    description: "", // Description
    manufacturerDetails: "", // Manufacturer Details
    genericName: "", // Generic Name
    strength: "", // Strength
    dosCategory: "", // Dosage Category
    quantity: 0, // Quantity
    inStock: true, // Default is in stock
    expiryDate: "", // Expiry Date (will be in string format)
  });

  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const dataToSend = {
      ...formData,
      price: parseFloat(formData.price.toString()),
      quantity: parseInt(formData.quantity.toString(), 10),
      expiryDate: new Date(formData.expiryDate),
    };

    try {
      const token = localStorage.getItem("authToken");
      const result = await createProduct(dataToSend, token as string);
      console.log(result);
      if (result.success) {
        toast.success("Product Added successfully");
        setFormData({
          name: "", // Medicine Name
          brand: "", // Medicine Brand
          price: 0, // Medicine Price
          Img: "", // Image URL (Optional)
          symptoms: "Cough & Flu", // Default symptom type
          requiredPrescription: "Yes", // Default to Yes
          description: "", // Description
          manufacturerDetails: "", // Manufacturer Details
          genericName: "", // Generic Name
          strength: "", // Strength
          dosCategory: "", // Dosage Category
          quantity: 0, // Quantity
          inStock: true, // Default is in stock
          expiryDate: "", // Expiry Date (will be in string format)
        });
      } else {
        toast.error("Failed to Add");
      }
    } catch (error) {
      toast.error("Failed to Add");
    }
  };

  return (
    <div className="w-full mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center mb-4 text-[#4F46E5]">
        Add New Medicine
      </h2>

      {error && (
        <p className="text-red-500 text-sm text-center mb-4">{error}</p>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        {/* Medicine Name */}
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Medicine Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Image URL */}
        <div className="mb-4">
          <label
            htmlFor="Img"
            className="block text-sm font-medium text-gray-700"
          >
            Image URL:
          </label>
          <input
            type="text"
            id="Img"
            name="Img"
            value={formData.Img}
            onChange={handleChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Brand */}
        <div className="mb-4">
          <label
            htmlFor="brand"
            className="block text-sm font-medium text-gray-700"
          >
            Brand:
          </label>
          <input
            type="text"
            id="brand"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            required
            className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Price */}
        <div className="mb-4">
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700"
          >
            Price:
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Symptoms */}
        <div className="mb-4">
          <label
            htmlFor="symptoms"
            className="block text-sm font-medium text-gray-700"
          >
            Symptoms:
          </label>
          <select
            id="symptoms"
            name="symptoms"
            value={formData.symptoms}
            onChange={handleChange}
            required
            className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="Cough & Flu">Cough & Flu</option>
            <option value="Fever">Fever</option>
            <option value="Eye & Ear">Eye & Ear</option>
            <option value="Allergy">Allergy</option>
            <option value="Skin & Hair">Skin & Hair</option>
            <option value="Diabetes">Diabetes</option>
          </select>
        </div>

        {/* Requires Prescription */}
        <div className="mb-4">
          <label
            htmlFor="requiredPrescription"
            className="block text-sm font-medium text-gray-700"
          >
            Requires Prescription:
          </label>
          <select
            id="requiredPrescription"
            name="requiredPrescription"
            value={formData.requiredPrescription}
            onChange={handleChange}
            required
            className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        {/* Description */}
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description:
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Manufacturer Details */}
        <div className="mb-4">
          <label
            htmlFor="manufacturerDetails"
            className="block text-sm font-medium text-gray-700"
          >
            Manufacturer Details:
          </label>
          <input
            type="text"
            id="manufacturerDetails"
            name="manufacturerDetails"
            value={formData.manufacturerDetails}
            onChange={handleChange}
            required
            className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Beximco Pharmaceuticals Ltd."
          />
        </div>

        {/* Generic Name */}
        <div className="mb-4">
          <label
            htmlFor="genericName"
            className="block text-sm font-medium text-gray-700"
          >
            Generic Name:
          </label>
          <input
            type="text"
            id="genericName"
            name="genericName"
            value={formData.genericName}
            onChange={handleChange}
            required
            className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Strength */}
        <div className="mb-4">
          <label
            htmlFor="strength"
            className="block text-sm font-medium text-gray-700"
          >
            Strength:
          </label>
          <input
            type="text"
            id="strength"
            name="strength"
            value={formData.strength}
            onChange={handleChange}
            required
            className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Dosage Category */}
        <div className="mb-4">
          <label
            htmlFor="dosCategory"
            className="block text-sm font-medium text-gray-700"
          >
            Dosage Category:
          </label>
          <input
            type="text"
            id="dosCategory"
            name="dosCategory"
            value={formData.dosCategory}
            onChange={handleChange}
            required
            className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Quantity */}
        <div className="mb-4">
          <label
            htmlFor="quantity"
            className="block text-sm font-medium text-gray-700"
          >
            Quantity:
          </label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
            className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* In Stock */}
        <div className="mb-4">
          <label
            htmlFor="inStock"
            className="inline-flex items-center text-sm font-medium text-gray-700"
          >
            In Stock:
          </label>
          <input
            type="checkbox"
            id="inStock"
            name="inStock"
            checked={formData.inStock}
            onChange={(e) =>
              setFormData({ ...formData, inStock: e.target.checked })
            }
            className="ml-2 border-gray-300 rounded"
          />
        </div>

        {/* Expiry Date */}
        <div className="mb-4">
          <label
            htmlFor="expiryDate"
            className="block text-sm font-medium text-gray-700"
          >
            Expiry Date:
          </label>
          <input
            type="date"
            id="expiryDate"
            name="expiryDate"
            value={formData.expiryDate as string}
            onChange={handleChange}
            required
            className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="col-span-2">
          {/* <CustomButton
            textName="Add Medicine"
            type='submit'
            className="w-full"
          /> */}
          <Button
            variant="outline"
            onClick={handleSubmit}
            className="w-full bg-indigo-500 text-white hover:text-black h-10"
          >
            Add Medicine
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddMedicine;
