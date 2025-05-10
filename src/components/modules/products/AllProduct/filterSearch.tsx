/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";


import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getAllProducts } from "@/services/Product";
import { TMedicine } from "@/types";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const FilterSearch = ({
  onFilterChange,
}: {
  onFilterChange: (filters: any) => void;
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [allMedicines, setAllMedicines] = useState([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);

  useEffect(() => {
    const fetchMedicines = async () => {
      const res = await getAllProducts("1", "100", {}); // Fetch all products
      setAllMedicines(res?.data?.result || []);

      const categoriesList = [
        ...new Set(
          res?.data?.result.map((item: TMedicine) => item.dosCategory)
        ),
      ];
      const symptomsList = [
        ...new Set(res?.data?.result.map((item: TMedicine) => item.symptoms)),
      ];

      setCategories(categoriesList as string[]);
      setSymptoms(symptomsList as string[]);
    };

    fetchMedicines();
  }, []);

  const handleApply = () => {
    onFilterChange({
      searchTerm,
      category: selectedCategories.join(","),
      symptoms: selectedSymptoms.join(","),
    });
    toast.success("Filters applied successfully!");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleReset = () => {
    setSearchTerm("");
    setSelectedCategories([]);
    setSelectedSymptoms([]);
    onFilterChange({
      searchTerm: "",
      category: "",
      symptoms: "",
    });
    toast.success("Filters reset successfully!");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const handleCategorySelect = (value: string) => {
    setSelectedCategories((prev) => (prev.includes(value) ? [] : [value]));
  };

  const handleSymptomSelect = (value: string) => {
    setSelectedSymptoms((prev) => (prev.includes(value) ? [] : [value]));
  };

  return (
    <div className="space-y-6  rounded-lg  bg-white  shadow-gray-200 transition-all duration-500 ease-in-out    border-gray-200">
      <Input
        className="input input-bordered w-full"
        type="text"
        placeholder="🔍 Search by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className='flex justify-around'>
        {/* Category Filter */}
        <div>
          <label className="block text-lg font-semibold mb-2">
            🧪 Categories
          </label>
          <div className="min-h-40 space-y-1">
            {categories.map((category) => (
              <label key={category} className="flex items-center space-x-2 text-sm">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category)}
                  onChange={() => handleCategorySelect(category)}
                  className="checkbox checkbox-sm"
                />
                <span>{category}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Symptoms Filter */}
        <div>
          <label className="block text-lg font-semibold mb-2">💊 Symptoms</label>
          <div className="min-h-40 space-y-1">
            {symptoms.map((symptom) => (
              <label key={symptom} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={selectedSymptoms.includes(symptom)}
                  onChange={() => handleSymptomSelect(symptom)}
                  className="checkbox checkbox-sm"
                />
                <span>{symptom}</span>
              </label>
            ))}
          </div>        
        </div>
      </div>

      <div className="flex flex-col gap-4 justify-end">
        <Button className="btn" variant="outline" onClick={handleApply}>
          ✅ Apply
        </Button>
        <Button className="btn" variant="outline" onClick={handleReset}>
          🔄 Reset
        </Button>
      </div>
    </div>
  );
};

export default FilterSearch;
