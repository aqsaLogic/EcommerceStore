import { useNavigate } from 'react-router-dom'
import { useProducts } from '../context/ProductContext'

export default function Card({ product, onEdit, onDelete }) {
  const navigate = useNavigate()
  const { setSelectedProduct } = useProducts()

  function goToDetail() {
    setSelectedProduct(product)
    navigate(`/product/${product._id}`)
  }

  return (
    <div className="product-card">

      {/* img */}
      <div className="card-img-wrap" onClick={goToDetail}>
        {product.imageUrl ? (
          <img src={product.imageUrl} alt={product.name} />
        ) : (
          <div className="card-no-img">No Image</div>
        )}
        <span className="card-badge">{product.category}</span>
      </div>

      {/* body */}
      <div className="card-body">

        <p className="card-name" onClick={goToDetail}>{product.name}</p>

        <p className="card-desc">{product.description}</p>

        {/* footer */}
        <div className="card-footer">
          <p className="card-price">Rs.{product.price}</p>
          <div className="card-actions">
            <button className="details-btn" onClick={goToDetail}>Details</button>
            <button className="edit-btn" onClick={() => onEdit(product)}>Edit</button>
            <button className="delete-btn" onClick={() => onDelete(product._id)}>Delete</button>
          </div>
        </div>

      </div>
    </div>
  )
}
