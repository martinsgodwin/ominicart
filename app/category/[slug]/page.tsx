import { getCategoryBySlug, getProductsByCategory, getCategoryBanners } from '@/lib/products'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import CategoryBannerCarousel from '../../components/CategoryBannerCarousel'
import CategoryProductGrid from '../../components/CategoryProductGrid'
import { notFound } from 'next/navigation'
import './category.css'

interface CategoryPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata(props: CategoryPageProps) {
  const params = await props.params
  const category = getCategoryBySlug(params.slug)

  if (!category) {
    return {
      title: 'Category Not Found',
    }
  }

  return {
    title: `${category.name} | OmniCart`,
    description: `Shop ${category.name} products on OmniCart. Explore our collection of premium items.`,
  }
}

export default async function CategoryPage(props: CategoryPageProps) {
  const params = await props.params
  const category = getCategoryBySlug(params.slug)

  if (!category) {
    notFound()
  }

  const products = getProductsByCategory(params.slug)
  const banners = getCategoryBanners(params.slug)

  return (
    <>
      <Header />
      <div className="category-page">
        <CategoryBannerCarousel images={banners} categoryName={category.name} />
        <CategoryProductGrid products={products} categoryName={category.name} />
      </div>
      <Footer />
    </>
  )
}
