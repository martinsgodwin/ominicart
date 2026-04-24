'use client';

import { Product } from '@/lib/products'
import { MdAddShoppingCart } from 'react-icons/md'
import './CategoryProductGrid.css'

interface CategoryProductGridProps {
  products: Product[]
  categoryName: string
}

// Star rating helper
function Stars({ rating }: { rating: number }) {
  return (
    <div className="ps-card-rating">
      {[1, 2, 3, 4, 5].map(n => (
        <span key={n} className={`ps-star ${n <= rating ? '' : 'empty'}`}>★</span>
      ))}
      <span className="ps-rating-num">({rating.toFixed(1)})</span>
    </div>
  )
}

export default function CategoryProductGrid({ products, categoryName }: CategoryProductGridProps) {
  return (
    <section className="category-products">
      {/* Header */}
      <div className="ps-header">
        <div className="ps-title-group">
          <h2 className="ps-title">
            {categoryName}
            <span className="ps-count">{products.length}+ items</span>
          </h2>
        </div>
      </div>

      {/* Products Grid */}
      <div className="ps-grid-wrapper">
        <div className="ps-grid">
          {products.map((product) => (
            <div key={product.id} className="ps-card" draggable={false}>
              {/* Image wrapper */}
              <div className="ps-img-wrap">
                <img
                  src={product.image}
                  alt={product.name}
                  className="ps-card-img"
                  draggable={false}
                  loading="lazy"
                />
                {product.originalPrice && (
                  <span className="ps-badge">
                    {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                  </span>
                )}
              </div>

              {/* Card body */}
              <div className="ps-card-body">
                <div className="ps-card-name">{product.name}</div>
                <div className="ps-card-sub">{product.description}</div>
                <Stars rating={product.rating} />
                <div className="ps-card-footer">
                  <span className="ps-card-price">{product.price.toLocaleString()}</span>
                  <button className="ps-card-btn" title="Add to cart">
                    <MdAddShoppingCart size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
