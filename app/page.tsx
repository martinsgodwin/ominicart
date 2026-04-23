// app/page.tsx
import BannerCarousel from "@/components/Bannercarousel";
import CategoryStrip from "@/components/Categorystrip";
import ProductSections from "@/components/Productsections";
import Footer from "@/components/Footer";
import Header from "./components/Header";

export default function Home() {
  return (
    <>
      <Header />
      <BannerCarousel />
      <CategoryStrip />
      <ProductSections />
      <Footer />
    </>
  );
}