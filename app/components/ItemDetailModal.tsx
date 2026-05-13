'use client';

import { useState, useEffect } from 'react';
import { MdClose, MdAddShoppingCart, MdShoppingBag, MdStar } from 'react-icons/md';
import './ItemDetailModal.css';

export interface ModalItem {
  id: string | number;
  name: string;
  price: string | number;
  originalPrice?: string | number;
  img?: string;
  image?: string;
  description?: string;
  sub?: string;
  badge?: string | null;
  rating: number;
  reviews?: number;
  category?: string;
}

interface ItemDetailModalProps {
  isOpen: boolean;
  item: ModalItem | null;
  onClose: () => void;
  similarItems?: ModalItem[];
  onAddToCart?: (item: ModalItem) => void;
  onOrder?: (item: ModalItem) => void;
}

export default function ItemDetailModal({
  isOpen,
  item,
  onClose,
  similarItems = [],
  onAddToCart,
  onOrder,
}: ItemDetailModalProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      document.body.style.overflow = 'hidden';
    } else {
      setIsAnimating(false);
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !item) return null;

  const imageUrl = (item.img || item.image || 'https://via.placeholder.com/400').replace('w=400', 'w=1200').replace('q=70', 'q=90');
  const description = item.description || `Premium quality ${item.name}. Carefully selected for superior craftsmanship, reliability, and exceptional performance. This product consistently delivers outstanding results and customer satisfaction. Perfect for discerning customers who value excellence.`;
  const formattedPrice = typeof item.price === 'number' 
    ? `₦${item.price.toLocaleString()}` 
    : item.price;
  const formattedOriginalPrice = item.originalPrice 
    ? typeof item.originalPrice === 'number'
      ? `₦${item.originalPrice.toLocaleString()}`
      : item.originalPrice
    : null;

  const discount = item.originalPrice && item.price
    ? Math.round(((Number(item.originalPrice) - Number(item.price)) / Number(item.originalPrice)) * 100)
    : null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleAddToCart = () => {
    onAddToCart?.(item);
  };

  const handleOrder = () => {
    onOrder?.(item);
  };

  return (
    <div
      className={`modal-backdrop ${isAnimating ? 'active' : ''}`}
      onClick={handleBackdropClick}
    >
      <div className={`modal-container ${isAnimating ? 'slide-up' : ''}`}>
        {/* Close Button */}
        <button
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close modal"
        >
          <MdClose size={24} />
        </button>

        {/* Modal Content */}
        <div className="modal-content">
          {/* Image Section */}
          <div className="modal-image-section">
            <div className="modal-image-wrapper">
              <img
                src={imageUrl}
                alt={item.name}
                className="modal-image"
                loading="lazy"
              />
              {item.badge && (
                <span className="modal-badge">{item.badge}</span>
              )}
              {discount && (
                <span className="modal-discount">{discount}% OFF</span>
              )}
            </div>
          </div>

          {/* Details Section */}
          <div className="modal-details">
            {/* Header */}
            <div className="modal-header">
              <div className="modal-title-group">
                <h2 className="modal-title">{item.name}</h2>
                {item.sub && (
                  <p className="modal-subtitle">{item.sub}</p>
                )}
              </div>
            </div>

            {/* Rating & Price Container */}
            <div className="modal-rating-price-container">
              {/* Rating */}
              <div className="modal-rating">
                <div className="modal-stars">
                  {[1, 2, 3, 4, 5].map(n => (
                    <MdStar
                      key={n}
                      size={16}
                      className={`star ${n <= Math.round(item.rating) ? 'filled' : 'empty'}`}
                    />
                  ))}
                </div>
                <span className="modal-rating-text">
                  {item.rating.toFixed(1)} ({item.reviews || 0} reviews)
                </span>
              </div>

              {/* Price Section */}
              <div className="modal-price-section">
                <div className="modal-price-group">
                  <span className="modal-price">{formattedPrice}</span>
                  {formattedOriginalPrice && (
                    <span className="modal-original-price">{formattedOriginalPrice}</span>
                  )}
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="modal-description">
              <h3 className="modal-description-title">Description</h3>
              <p className="modal-description-text">{description}</p>
            </div>

            {/* Action Buttons */}
            <div className="modal-actions">
              <button
                className="modal-btn modal-btn-cart"
                onClick={handleAddToCart}
              >
                <MdAddShoppingCart size={18} />
                <span>Add to Cart</span>
              </button>
              <button
                className="modal-btn modal-btn-order"
                onClick={handleOrder}
              >
                <MdShoppingBag size={18} />
                <span>Order Now</span>
              </button>
            </div>

            {/* Similar Items */}
            {similarItems.length > 0 && (
              <div className="modal-similar-items">
                <h3 className="modal-similar-title">Similar Items</h3>
                <div className="modal-similar-grid">
                  {similarItems.slice(0, 4).map(similarItem => (
                    <div key={similarItem.id} className="modal-similar-card">
                      <div className="modal-similar-image">
                        <img
                          src={similarItem.img || similarItem.image}
                          alt={similarItem.name}
                          loading="lazy"
                        />
                        {similarItem.badge && (
                          <span className="modal-similar-badge">
                            {similarItem.badge}
                          </span>
                        )}
                      </div>
                      <div className="modal-similar-info">
                        <p className="modal-similar-name">{similarItem.name}</p>
                        <p className="modal-similar-price">
                          {typeof similarItem.price === 'number'
                            ? `₦${similarItem.price.toLocaleString()}`
                            : similarItem.price}
                        </p>
                        <div className="modal-similar-rating">
                          {[1, 2, 3, 4, 5].map(n => (
                            <span
                              key={n}
                              className={`star-small ${n <= Math.round(similarItem.rating) ? 'filled' : 'empty'}`}
                            >
                              ★
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}