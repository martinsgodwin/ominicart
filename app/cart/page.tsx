'use client';

import { useCart } from '@/context/CartContext';
import Header from '@/components/Header';
import Link from 'next/link';
import { MdDelete, MdAdd, MdRemove } from 'react-icons/md';
import './cart.css';

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart();

  const formatPrice = (price: string | number): string => {
    if (typeof price === 'number') {
      return `₦${price.toLocaleString()}`;
    }
    return price;
  };

  const getTotalItems = (): number => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <>
      <Header />
      <div className="cart-page">
        <div className="cart-container">
          <h1 className="cart-title">Shopping Cart</h1>

          {cartItems.length === 0 ? (
            <div className="empty-cart">
              <div className="empty-cart-icon">🛒</div>
              <h2>Your cart is empty</h2>
              <p>Start adding items to your cart from our marketplace</p>
              <Link href="/" className="continue-shopping-btn">
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="cart-content">
              <div className="cart-items-section">
                <div className="cart-items-header">
                  <span>Product</span>
                  <span>Price</span>
                  <span>Quantity</span>
                  <span>Total</span>
                  <span></span>
                </div>

                {cartItems.map((item) => {
                  const price = typeof item.price === 'number' 
                    ? item.price 
                    : parseInt(item.price.toString().replace(/\D/g, ''));
                  const itemTotal = price * item.quantity;

                  return (
                    <div key={item.id} className="cart-item">
                      <div className="cart-item-image">
                        <img src={item.img} alt={item.name} />
                      </div>
                      <div className="cart-item-info">
                        <h3>{item.name}</h3>
                        <p className="cart-item-category">{item.category}</p>
                      </div>
                      <div className="cart-item-price">
                        {formatPrice(item.price)}
                      </div>
                      <div className="cart-item-quantity">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="qty-btn"
                        >
                          <MdRemove size={16} />
                        </button>
                        <span>{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="qty-btn"
                        >
                          <MdAdd size={16} />
                        </button>
                      </div>
                      <div className="cart-item-total">
                        {formatPrice(itemTotal)}
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="cart-item-delete"
                      >
                        <MdDelete size={20} />
                      </button>
                    </div>
                  );
                })}
              </div>

              <div className="cart-summary">
                <h2>Order Summary</h2>
                <div className="summary-row">
                  <span>Subtotal ({getTotalItems()} items)</span>
                  <span>{formatPrice(getTotalPrice())}</span>
                </div>
                <div className="summary-row">
                  <span>Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
                <div className="summary-row">
                  <span>Estimated Tax</span>
                  <span>Calculated at checkout</span>
                </div>
                <div className="summary-divider"></div>
                <div className="summary-row total">
                  <span>Total</span>
                  <span>{formatPrice(getTotalPrice())}</span>
                </div>
                <button className="checkout-btn">Proceed to Checkout</button>
                <Link href="/" className="continue-shopping-link">
                  Continue Shopping
                </Link>
                <button 
                  onClick={clearCart}
                  className="clear-cart-btn"
                >
                  Clear Cart
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
