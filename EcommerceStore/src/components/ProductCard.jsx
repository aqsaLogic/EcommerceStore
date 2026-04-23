import { useNavigate } from "react-router-dom";

function ProductCard({product}) {

  const navigate = useNavigate();

  return (
    <div
      className="border rounded-lg p-4 shadow hover:cursor-pointer"
      onClick={()=>navigate(`/product/${product.id}`)}
    >
      <img src={product.imageurl} />

      <h2 className="font-bold mt-2">
        {product.name}
      </h2>
    </div>
  );
}

export default ProductCard;
