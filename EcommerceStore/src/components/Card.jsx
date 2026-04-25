import { useNavigate } from 'react-router-dom'
import { useProducts } from '../context/ProductContext'

export default function Card({ product }) {
  const navigate = useNavigate()

  const { setSelectedProduct } = useProducts()

  function handleCardClick() {
    setSelectedProduct(product)       
    navigate(`/${product.id}`)        
  }

  function handleDetailsClick(e) {
    e.stopPropagation()               
    setSelectedProduct(product)       
    navigate(`/product/${product.id}`)
  }

  const stars = Array.from({ length: 5 }, (_, i) => i < Math.round(product.rating))

  return (
    <article
      onClick={handleCardClick}
      className="group relative bg-white rounded-2xl overflow-hidden cursor-pointer
                 shadow-[0_2px_12px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.14)]
                 transition-all duration-300 hover:-translate-y-1 flex flex-col"
    >

      <div className="relative overflow-hidden h-64 bg-gray-100">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <span className="absolute top-3 left-3 bg-charcoal/80 text-cream text-[10px] font-body
                         font-semibold uppercase tracking-widest px-3 py-1 rounded-full backdrop-blur-sm">
          {product.category}
        </span>
      </div>

      <div className="flex flex-col flex-1 p-5 gap-3">

        <div className="flex items-center gap-1">
          {stars.map((filled, i) => (
            <svg
              key={i}
              className={`w-3.5 h-3.5 ${filled ? 'text-gold' : 'text-gray-300'}`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462
                       c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755
                       1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197
                       -1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588
                       -1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
          <span className="text-xs text-gray-400 ml-1 font-body">{product.rating}</span>
        </div>

        <h2 className="font-display text-lg font-semibold text-charcoal leading-snug
                       group-hover:text-rust transition-colors duration-200 line-clamp-1">
          {product.name}
        </h2>

        <p className="font-body text-sm text-gray-500 leading-relaxed line-clamp-2 flex-1">
          {product.description}
        </p>

        <div className="flex items-center justify-between pt-2 border-t border-gray-100">

          <span className="font-display text-xl font-bold text-charcoal">
            Rs:{product.price}
          </span>

          <button
            onClick={handleDetailsClick}
            className="bg-charcoal text-cream text-sm font-body font-semibold px-5 py-2
                       rounded-full hover:bg-rust active:scale-95 transition-all duration-200"
          >
            Details
          </button>
        </div>
      </div>
    </article>
  )
}
