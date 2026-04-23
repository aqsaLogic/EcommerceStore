import { useParams } from "react-router-dom";
import products from "../data/products";

function ProductDetail(){

  const { id } = useParams();

  const product = products.find(
    (item)=>item.id === Number(id)
  );

  return (
    <div className="p-10">

      <img src={product.imageurl} />

      <h1 className="text-2xl font-bold">
        {product.name}
      </h1>

      <p>{product.description}</p>

    </div>
  );
}

export default ProductDetail;
