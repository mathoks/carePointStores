import Image from "next/image";
import Navbar from "../components/Navbar";
import hero from '@/app/assets/hero1.jpg';
import Hero from "../components/Hero";
import Products from "../components/Products";
import Tabs from "../components/Tabs";
import Trending from "../components/Trending";
import {SideBar} from "../components/SideBar";

export default function Home() {
    const List = Array.from({ length: 10 }, (_, i) => i + 1);
  return (
<div className="md:grid md:grid-cols-[320px_1fr] lg:grid-cols-[320px_1fr] gap-0 overflow-x-hidden">
      <div>
      <SideBar />
      </div>
  <div className=" gap-0 grid grid-cols-12  ">
    
        <div style={{gridColumn: "1/13"}}>
     <Hero/>
     </div>
     <div style={{gridColumn: "1/13"}}>
     <Tabs/>
     </div>
     <div style={{gridColumn: "1/13"}}>
<Trending/>
     </div>
     {/* <Trending/> */}
     
     <div style={{gridColumn: "1/13"}}>
     <h2 className="pl-4">Products</h2>
    
     
    <div className="grid grid-cols-2 lg:grid-cols-3 flex-wrap justify-items-center min-h-screen p-4 pb-20 gap-4 sm:p-20 font-[family-name:var(--font-geist-sans)] ">
    {List.map((item) => <Products key={item} />)}
   </div>
   </div>
   </div>
</div>
  );
}
