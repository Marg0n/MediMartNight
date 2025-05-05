// components/SearchBox.tsx
"use client";

import { Input } from "@/components/ui/input";
import { getAllProducts } from "@/services/Product";
import { TMedicine } from "@/types";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const SearchBox = () => {
  const [query, setQuery] = useState("");
  const [medicines, setMedicines] = useState<TMedicine[]>([]);
  const [filtered, setFiltered] = useState<TMedicine[]>([]);
  const [showResults, setShowResults] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const res = await getAllProducts("1", "100", {}); //? can be changed of limits as needed
      setMedicines(res?.data?.result || []);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (query.length === 0) {
      setFiltered([]);
      setShowResults(false);
    } else {
      const lower = query.toLowerCase();
      const matches = medicines.filter((item) =>
        item.name.toLowerCase().includes(lower)
      );
      setFiltered(matches);
      setShowResults(true);
    }
  }, [query, medicines]);

  const handleSelect = (id: string) => {
    setQuery("");
    setShowResults(false);
    router.push(`/shop/${id}`);
  };

  return (
    <div className="relative w-full max-w-xs">
      <Input
        type="text"
        placeholder="🔍 Search medicines..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border-gray-300"
      />
      {showResults && filtered.length > 0 && (
        <div className="absolute z-50 w-full bg-white border mt-1 rounded shadow max-h-60 overflow-y-auto">
          {filtered.map((med) => (
            <div
              key={med._id}
              className={cn(
                "px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
              )}
              onClick={() => handleSelect(med?._id as string)}
            >
              {med.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBox;
