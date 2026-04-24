'use client';

import { useState, useEffect, useCallback, useRef } from 'react'
import { FaChevronLeft, FaChevronRight, FaShoppingCart } from 'react-icons/fa'
import './CategoryBannerCarousel.css'

interface CategoryBannerCarouselProps {
  images: string[]
  categoryName: string
}

const AUTO_PLAY_INTERVAL = 10000

export default function CategoryBannerCarousel({ images, categoryName }: CategoryBannerCarouselProps) {
  const [current, setCurrent] = useState(0)
  const [exiting, setExiting] = useState<number | null>(null)
  const [progKey, setProgKey] = useState(0)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const goTo = useCallback((index: number) => {
    setExiting(current)
    setCurrent(index)
    setProgKey(k => k + 1)
    setTimeout(() => setExiting(null), 900)
  }, [current])

  const next = useCallback(() => goTo((current + 1) % images.length), [current, goTo, images.length])
  const prev = useCallback(() => goTo((current - 1 + images.length) % images.length), [current, goTo, images.length])

  // Auto-play
  useEffect(() => {
    timerRef.current = setInterval(() => next(), AUTO_PLAY_INTERVAL)
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [next])

  // Pause on hover
  const pauseAuto = () => {
    if (timerRef.current) clearInterval(timerRef.current)
  }
  const resumeAuto = () => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => next(), AUTO_PLAY_INTERVAL)
  }

  // Keyboard nav
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [next, prev])

  return (
    <section
      className="banner-carousel"
      onMouseEnter={pauseAuto}
      onMouseLeave={resumeAuto}
      aria-label="Category carousel"
    >
      {/* Progress bar */}
      <div key={progKey} className="banner-progress" />

      {/* Slides */}
      {images.map((image, i) => {
        const isActive = i === current
        const isExiting = i === exiting
        return (
          <div
            key={i}
            className={`banner-slide ${isActive ? 'active' : ''} ${isExiting ? 'exiting' : ''}`}
            aria-hidden={!isActive}
          >
            {/* BG Image */}
            <div
              className="banner-bg"
              style={{ backgroundImage: `url(${image})` }}
            />
            <div className="banner-overlay" />

            {/* Content */}
            {isActive && (
              <div className="banner-content">
                <h1 className="banner-title">{categoryName}</h1>
                <p className="banner-desc">Explore our premium {categoryName.toLowerCase()} collection - curated selection of the finest items</p>
                <div className="banner-actions">
                  <button className="banner-order-btn">
                    <FaShoppingCart size={14} />
                    Shop Now
                  </button>
                </div>
              </div>
            )}
          </div>
        )
      })}

      {/* Arrows */}
      <button className="banner-arrow prev" onClick={prev} aria-label="Previous slide">
        <FaChevronLeft size={16} />
      </button>
      <button className="banner-arrow next" onClick={next} aria-label="Next slide">
        <FaChevronRight size={16} />
      </button>

      {/* Dots */}
      <div className="banner-dots" role="tablist" aria-label="Slide indicators">
        {images.map((_, i) => (
          <button
            key={i}
            className={`banner-dot ${i === current ? 'active' : ''}`}
            onClick={() => goTo(i)}
            role="tab"
            aria-selected={i === current}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Counter */}
      <div className="banner-counter">
        <span>{String(current + 1).padStart(2, '0')}</span>
        {' / '}
        {String(images.length).padStart(2, '0')}
      </div>
    </section>
  )
}
