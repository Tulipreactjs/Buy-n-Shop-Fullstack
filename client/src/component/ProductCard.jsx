import { Image, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { formatCurrency } from "../utils/formatCurrency";

export default function ProductCard({ product }) {
  const { title, slug, images, price, category } = product; //destructure product
  return (
    <div className="cardBox collection">
      <Link to={`collections/${category}/${slug}`}>
        <Image
          className="object-fit-fill img-fluid mb-3"
          src={images[0]}
          alt={title}
          loading="lazy"
        />
        <p className="fs-6 text-black fw-bold mb-0">{title}</p>
        <p className="fs-6 text-black">{formatCurrency(price)}</p>
      </Link>
      <Button variant="dark" className="w-100 rounded-0 focus-content">Quick Add</Button>
      
    </div>
  );
}
