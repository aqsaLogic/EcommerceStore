import { createContext, useContext, useState } from 'react'

const products = [
  {
    id: 1,
    name: 'Merino Wool Coat',
    price: 289,
    description:
      'Crafted from 100% pure merino wool sourced from the highlands of New Zealand. This timeless overcoat features a structured silhouette, satin-lined interior, and hand-stitched lapels. Designed for the modern urbanist who refuses to compromise between warmth and elegance. Double-breasted button closure with deep side pockets.',
    imageUrl: 'https://images.unsplash.com/photo-1544923246-77307dd654cb?w=600&q=80',
    category: 'Outerwear',
    rating: 4.8,
  },
  {
    id: 2,
    name: 'Leather Crossbody Bag',
    price: 179,
    description:
      'Full-grain vegetable-tanned Italian leather develops a rich patina over time. Adjustable brass-hardware shoulder strap, interior zip pocket, and magnetic snap closure. Each bag is hand-cut and stitched in a small atelier in Florence. Dimensions: 26cm × 18cm × 8cm — the perfect size for daily essentials.',
    imageUrl: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80',
    category: 'Accessories',
    rating: 4.9,
  },
  {
    id: 3,
    name: 'Cashmere Turtleneck',
    price: 145,
    description:
      'Two-ply Grade-A Mongolian cashmere with a brushed finish for extra softness. Ribbed cuffs and hem, generous ribbed turtleneck. Pre-washed to minimize shrinkage. Available in a curated palette of eight seasonal colors. A wardrobe cornerstone that gets better with every wear.',
    imageUrl: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&q=80',
    category: 'Knitwear',
    rating: 4.7,
  },
  {
    id: 4,
    name: 'Suede Chelsea Boots',
    price: 225,
    description:
      'Premium sand suede upper with elastic side gussets for effortless on-and-off. Leather-lined interior, memory-foam insole, and durable rubber sole with subtle heel. Goodyear welted construction allows resoling for a lifetime of wear. A staple that transitions seamlessly from casual to formal.',
    imageUrl: 'https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=600&q=80',
    category: 'Footwear',
    rating: 4.6,
  },
  {
    id: 5,
    name: 'Silk Scarf',
    price: 95,
    description:
      'Hand-rolled edges on 100% Habotai silk printed with an exclusive archival botanical motif. Lightweight at 8mm weight yet surprisingly warm when worn as a neck wrap. Dimensions 90cm × 90cm — versatile enough to style as a headscarf, bag accessory, or belt. Made in Lyon, France.',
    imageUrl: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=600&q=80',
    category: 'Accessories',
    rating: 4.5,
  },
  {
    id: 6,
    name: 'Linen Trousers',
    price: 118,
    description:
      'Washed Belgian linen in a relaxed wide-leg cut with a mid-rise waistband and hidden side zip. Two front slash pockets and one rear welt pocket. The fabric is pre-washed for a lived-in softness from day one. Pairs equally well with a white tee or a structured blazer.',
    imageUrl: 'https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=600&q=80',
    category: 'Bottoms',
    rating: 4.4,
  },
]

const ProductContext = createContext(null)

export function ProductProvider({ children }) {
  const [selectedProduct, setSelectedProduct] = useState(null)

  return (
    <ProductContext.Provider value={{ products, selectedProduct, setSelectedProduct }}>
      {children}
    </ProductContext.Provider>
  )
}

export function useProducts() {
  const ctx = useContext(ProductContext)
  if (!ctx) throw new Error('useProducts must be used inside <ProductProvider>')
  return ctx
}
