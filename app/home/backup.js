import AddCart from "@/app/components/Cart/AddCart";
import CartView from "@/app/components/Cart/CartView";
import Carousal2 from "@/app/components/Carusal2";
import DetailsIcon from "@/public/icons/DetailsIcon";
import ShareIcon from "@/public/icons/ShareIcon";
import StateCity from "@/app/components/inputs/StateCity";
import SponsoredProducts from "@/app/components/SponsoredProducts";
import Stars from "@/app/util/Stars";
import React from "react";

const page = () => {
  return (
    <div className="flex flex-col min-h-screen gap-4 mb-4">
    <div className="flex flex-wrap mt-24 gap-4" >
    <div className="flex gap-4 flex-wrap  flex-grow">
      <div className="flex-grow md:w-[300px] h-[300px] bg-slate-300 ">
        <Carousal2/>
      </div>
      <div className="flex-grow-[3] bg-white p-2 flex flex-col gap-2 text-gray-800 h-fit">
        <div className="min-h-[calc(100%-50px)] bg-white flex flex-col px-2">
        <div className="bg-pink-500  w-fit px-2 text-sm text-white">Official Store</div>
        <div><p className=" text-wrap">Product Name here</p></div>
        <div><p className=" text-wrap text-sm"> Brand: Name here</p></div>
        <div className="flex flex-col rounded-b-md border border-red-500 space-y-2">
        <div className="flex bg-red-600 text-sm justify-between text-white p-1.5">
        <span>Flash sales</span>
        <span>Time left</span>
        </div>
        <div className="flex flex-col">
        <div className="flex space-x-3 items-center p-2">
        <span className=" text-xl font-semibold">#400</span>
        <span className=" text-slate-500" >#500</span>
        <span className="text-sm bg-orange-200">-10%</span>
         </div>
         <div className="flex space-x-3 items-center px-2 py-1">
            <span className="text-sm">50 items left</span>
            <progress className="progress progress-accent  w-56" value="48" max="50"></progress>
         </div>
        </div>
        </div>
        </div>
        <div className="text-black min-h-[49px] bg-white px-2 space-y-2">
        <div className="flex items-center justify-between">
        <div className="flex gap-2 items-center mt-2">
        <Stars size={'text-blue-400 text-md'} rating={4}/>
        <span className="text-sm text-blue-400">(7000 ratings)</span>
        </div>
            
            <ShareIcon />
        </div>
        
        <AddCart/>
        <div className="hidden md:bock lg:block">
        Call 08067870424 to book your order
        </div>
        
        </div>
      </div>
      
    </div>
    <div className=" min-h-[400px]  min-w-full md:min-w-[300px] rounded-[3px] text-gray-900 p-2 flex flex-col space-y-4">
    <div className="p-2 flex flex-col space-y-4 bg-white">
    <h1 className="font-medium text-slate-400 ">Delivery & Returns</h1>
    <StateCity/>
    <div>
        cost of shipping to prefered location here
    </div>
    <div>
    <div>
        <div>
            <span>Return Policy</span><br></br>
            <span className="text-sm">Free Return For All <span className=" text-blue-400">Eligible Items</span></span>
        </div>
        </div>
        <div>
        <div id="checkout">
            <span>Warranty</span><br></br>
            <span className="text-sm">All Products Are Guaranteed</span>
        </div>
        </div>
    </div>
    </div>
    <CartView/>
    </div>
    </div>
    <div className="flex justify-between">
    <div className="min-h-[180px]  md:max-w-[calc(100%-315px)] flex-grow-[2]  flex-col flex gap-4 shrink">
    <div className="bg-white h-20">
        My reviews
    </div>
    <div className=" min-h-[200px] py-2 bg-white rounded-[3px] flex flex-col space-y-4 px-2">
       <h1 className=" text-slate-500">Sponsored Products</h1> 
       
       
        <SponsoredProducts/>
        
       
       
    </div>
    <div className=" bg-white h-[400px] rounded-[3px]">Specifications</div>
    <div className="min-h-40 bg-white rounded-[3px]">verified customer feedback</div>
    <div className=" min-h-[200px] py-2 bg-white rounded-[3px] flex flex-col space-y-4 px-2">
    <h1 className=" text-slate-500">Similar Product</h1>
    <SponsoredProducts/>
    </div>
    </div>
    <div className="hidden md:block  space-y-2 w-[300px] shrink-0">
        <div className="h-[100px] bg-white items-center rounded-[3px]">Seller details</div>
        <div className="flex flex-col gap-2">
            <div className="flex gap-1 px-4 bg-slate-500 rounded-[3px]">
                <DetailsIcon/>
                <span>Product Details</span>
                </div>
                <div className="flex gap-1 px-4 bg-slate-500 rounded-[3px]">
                <DetailsIcon/>
                <span>Specifications</span>
                </div>
                <div className="flex gap-1 px-4 bg-slate-500 rounded-[3px]">
                <DetailsIcon/>
                <span>verified customer feedback</span>
                </div>
            </div>
    
            <div className="min-h-40 bg-white rounded-[3px]">Produt Add to cart and image</div>
            <div className="bg-white h-20">chat with seller</div>
            
        </div>
    </div>
    </div>
  );
};

export default page;
