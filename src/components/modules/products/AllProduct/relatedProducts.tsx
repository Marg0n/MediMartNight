import { getAllProducts } from "@/services/Product";
import { TMedicine } from "@/types";
import ProductCard from "./productCard";

const RelatedProducts = async ({ medicine }: { medicine: TMedicine }) => {
  const data = await getAllProducts("1", "100", {}); // Fetch all products
  const allMedicines = data?.data?.result;
  const relatedMedicines = allMedicines
    ?.filter((nmedicine: TMedicine) =>
      nmedicine.symptoms.toLowerCase().includes(medicine.symptoms.toLowerCase())
    )
    .slice(0, 4); // Limit to 4 related products
  return (
    <div className="mt-8">
      <h3 className="text-xl font-bold">Related Products</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {relatedMedicines?.map((medicine: TMedicine) => (
          <ProductCard medicine={medicine} key={medicine._id} />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
