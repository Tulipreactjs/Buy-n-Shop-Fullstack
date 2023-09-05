import ProductCard from "./ProductCard";
import { Link } from "react-router-dom";

export default function Preorder({ data }) {
  const flattenData = data.flatMap((product)=>product)
  const filterByPreorder = flattenData.filter((item) => item.condition === "Preorder");
  return (
    <div className="my-5 text-center">
      <h1 className="fs-4 fw-bold">PREORDER</h1>
      <Link className=" text-black-50 fw-bold " to={`/collections`}>View All</Link>
      <div className="d-flex justify-content-between align-items-center w-100 h-50 mx-auto mt-4 gy-3 flex-wrap">
        {filterByPreorder.slice(1, 5).map((product) => (
            <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}