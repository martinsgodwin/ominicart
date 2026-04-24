// Mock product data for categories
export interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  category: string
  rating: number
  reviews: number
  description?: string
}

// Helper to generate mock products
const generateProducts = (
  categoryName: string,
  count: number,
  priceRange: [number, number]
): Product[] => {
  const products: Product[] = []
  const adjectives = ['Premium', 'Deluxe', 'Professional', 'Standard', 'Elite', 'Classic', 'Modern', 'Vintage', 'Eco-friendly', 'Organic']
  const productNames: Record<string, string[]> = {
    'raw-food': ['Fresh Chicken', 'Beef Steak', 'Fish Fillet', 'Lamb Chops', 'Pork Ribs', 'Turkey Breast', 'Salmon', 'Shrimp'],
    'cooked-food': ['Grilled Chicken', 'Roasted Beef', 'BBQ Ribs', 'Fried Fish', 'Steamed Vegetables', 'Rice Pilaf', 'Pasta Dish', 'Soup'],
    'houses': ['Modern Villa', 'Beach House', 'Apartment', 'Townhouse', 'Cottage', 'Mansion', 'Studio', 'Penthouse'],
    'cars': ['Sedan', 'SUV', 'Truck', 'Coupe', 'Convertible', 'Hatchback', 'Minivan', 'Crossover'],
    'kitchen-utensils': ['Chef Knife', 'Cutting Board', 'Blender', 'Mixer', 'Pot Set', 'Pan', 'Utensil Set', 'Scale'],
    'electronics': ['Smartphone', 'Laptop', 'Headphones', 'Tablet', 'Smart Watch', 'Camera', 'Speaker', 'Monitor'],
    'fashion': ['T-Shirt', 'Jeans', 'Jacket', 'Dress', 'Shoes', 'Hat', 'Scarf', 'Sweater'],
    'fresh-produce': ['Tomatoes', 'Lettuce', 'Carrots', 'Apples', 'Bananas', 'Oranges', 'Broccoli', 'Spinach'],
  }

  const names = productNames[categoryName] || ['Product']
  
  for (let i = 1; i <= count; i++) {
    const adjective = adjectives[i % adjectives.length]
    const baseName = names[i % names.length]
    const hasDiscount = Math.random() > 0.5
    const basePrice = priceRange[0] + Math.random() * (priceRange[1] - priceRange[0])
    const price = Math.round(basePrice * 100) / 100

    products.push({
      id: `${categoryName}-${i}`,
      name: `${adjective} ${baseName} #${i}`,
      price: hasDiscount ? Math.round(price * 0.8 * 100) / 100 : price,
      originalPrice: hasDiscount ? price : undefined,
      image: `https://picsum.photos/300/300?random=${categoryName}-${i}`,
      category: categoryName,
      rating: 3.5 + Math.random() * 1.5,
      reviews: Math.floor(Math.random() * 500) + 10,
      description: `High-quality ${baseName.toLowerCase()} - Perfect for all your needs`,
    })
  }

  return products
}

export const categories = [
  { slug: 'raw-food', name: 'Raw Food', priceRange: [500, 5000] as [number, number] },
  { slug: 'cooked-food', name: 'Cooked Food', priceRange: [800, 3000] as [number, number] },
  { slug: 'houses', name: 'Houses', priceRange: [500000, 5000000] as [number, number] },
  { slug: 'cars', name: 'Cars', priceRange: [800000, 8000000] as [number, number] },
  { slug: 'kitchen-utensils', name: 'Kitchen Utensils', priceRange: [1000, 50000] as [number, number] },
  { slug: 'electronics', name: 'Electronics', priceRange: [5000, 200000] as [number, number] },
  { slug: 'fashion', name: 'Fashion', priceRange: [500, 10000] as [number, number] },
  { slug: 'fresh-produce', name: 'Fresh Produce', priceRange: [100, 1000] as [number, number] },
]

// Generate and cache products for each category
const productCache: Record<string, Product[]> = {}

export const getProductsByCategory = (slug: string): Product[] => {
  if (!productCache[slug]) {
    const category = categories.find(c => c.slug === slug)
    if (category) {
      productCache[slug] = generateProducts(slug, 50, category.priceRange)
    } else {
      return []
    }
  }
  return productCache[slug]
}

export const getCategoryBySlug = (slug: string) => {
  return categories.find(c => c.slug === slug)
}

export const getCategoryBanners = (slug: string): string[] => {
  // Generate banner images for each category
  const banners = []
  for (let i = 1; i <= 3; i++) {
    banners.push(`https://picsum.photos/1200/400?random=${slug}-banner-${i}`)
  }
  return banners
}
