import products from "../data/products";
import ProductCard from "../components/ProductCard";

function Dashboard() {
    return (
        <div className="grid grid-cols-3">
            {products.map((item)=>(
                <ProductCard key={item.id} product={item}/>
            ))}
        </div>
    );
}
export default Dashboard;