import Image from "next/image";
import Navbar from "../components/Navbar";
import hero from '@/app/assets/hero1.jpg';
import Hero from "../components/Hero";
import Products from "../components/Products";

export default function Home() {
    const List = Array.from({ length: 10 }, (_, i) => i + 1);
  return (
  <div className="flex flex-col gap-8">
      <header>
        <Navbar />
      </header>
     <Hero/>
     <div>
     <h2 className="pl-4">Products</h2>
    
     
    <div className="grid grid-cols-2  justify-items-center min-h-screen p-4 pb-20 gap-4 sm:p-20 font-[family-name:var(--font-geist-sans)]">
    {List.map((item) => <Products key={item} />)}
   </div>
   </div>
   </div>

  );
}
