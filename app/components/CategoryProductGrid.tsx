'use client';

import { useState } from 'react'
import { Product } from '@/lib/products'
import { MdAddShoppingCart } from 'react-icons/md'
import { toast } from 'react-toastify'
import { useCart } from '@/context/CartContext'
import './CategoryProductGrid.css'
import ItemDetailModal, { ModalItem } from './ItemDetailModal'

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

// Product Card Component
function ProductCard({ product, onItemClick }: { product: Product; onItemClick: (product: Product) => void }) {
  const { addToCart, removeFromCart, cartItems } = useCart();

  const isInCart = cartItems.some(cartItem => cartItem.id === product.id);

  const handleCartClick = (e: React.MouseEvent<HTMLButtonElement> | React.TouchEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (isInCart) {
      removeFromCart(product.id);
    } else {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.image,
        category: product.category,
        rating: product.rating,
        reviews: product.reviews,
      });
      toast.success('Added to cart', {
        position: 'bottom-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  return (
    <div className="ps-card" onClick={() => onItemClick(product)} onTouchEnd={() => onItemClick(product)} role="button" tabIndex={0}>
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
          <button 
            className={`ps-card-btn ${isInCart ? 'added' : ''}`}
            title={isInCart ? "Remove from cart" : "Add to cart"}
            onClick={handleCartClick}
            onTouchEnd={handleCartClick}
          >
            <MdAddShoppingCart size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function CategoryProductGrid({ products, categoryName }: CategoryProductGridProps) {
  const [selectedItem, setSelectedItem] = useState<ModalItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addToCart, removeFromCart } = useCart();

  const handleItemClick = (product: Product) => {
    const modalItem: ModalItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      description: product.description,
      rating: product.rating,
      reviews: product.reviews,
      category: product.category,
    };
    setSelectedItem(modalItem);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedItem(null), 300);
  };

  const handleAddToCart = (item: ModalItem) => {
    addToCart(item);
  };

  const handleRemoveFromCart = (itemId: string | number) => {
    removeFromCart(itemId);
  };

  const handleOrder = (item: ModalItem) => {
    console.log('Order placed:', item);
    // TODO: Implement order functionality
  };

  // Get similar items from the same category
  const getSimilarItems = (item: ModalItem): ModalItem[] => {
    return products
      .filter(p => p.id !== item.id)
      .slice(0, 4)
      .map(p => ({
        id: p.id,
        name: p.name,
        price: p.price,
        originalPrice: p.originalPrice,
        image: p.image,
        description: p.description,
        rating: p.rating,
        reviews: p.reviews,
        category: p.category,
      }));
  };

  return (
    <>
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
              <ProductCard key={product.id} product={product} onItemClick={handleItemClick} />
            ))}
          </div>
        </div>
      </section>
      <ItemDetailModal
        isOpen={isModalOpen}
        item={selectedItem}
        onClose={handleCloseModal}
        similarItems={selectedItem ? getSimilarItems(selectedItem) : []}
        onAddToCart={handleAddToCart}
        onRemoveFromCart={handleRemoveFromCart}
        onOrder={handleOrder}
      />
    </>
  )
}