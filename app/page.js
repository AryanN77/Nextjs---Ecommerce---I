import { Button } from "@/components/ui/button";
import Slider from "./_components/Slider";
import GlobalApi from "./_utils/GlobalApi";
import CategoryList from "./_components/CategoryList";
import ProductList from "./_components/ProductList";
import Banner from "@/public/banner.png"
import Image from "next/image";
import Footer from "./_components/Footer";
export default async function Home() {
  const slider = await GlobalApi.getSliders();
  const categoryList = await GlobalApi.getCategoryList();
  const productList = await GlobalApi.getAllProducts();
  return (
    <div className="p-5 md:p-16 md:py-3 px-16">
      <Slider sliderList={slider} />
      <CategoryList categoryList={categoryList} />
      <ProductList productList={productList} />
      <Image src={Banner.src} alt="footer-banner" width={1000} height={100} className="w-full h-[300px] object-contain" />
      <Footer />
    </div>
  );
}
