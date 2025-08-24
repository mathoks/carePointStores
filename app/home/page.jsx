import Hero from "../components/Hero";
import Trending from "../components/Trending";
import { SideBar } from "../components/SideBar";
import ProductWindow from "../components/ProductWindow";
import { getQueryClient } from "../lib/queryClient/getQueryClient";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { AllproductOptions } from "../lib/queryClient/productQueryOptions";

// const fetchAllProducts = async () => {
//   const abort = new AbortController();
//   try {
//     const response = await fetch(
//       `${process.env.API_URL}/products?take=${10}&skip=${0}`,
//       { signal: abort.signal },
//       { next: { tags: ["store"] } }
//     );
//     const Products = await response.json();
//     return Products;
//   } catch (err) {
//     console.log(err);
//   }
// };

const queryClient = getQueryClient();

export default async function Home() {
   queryClient.prefetchInfiniteQuery(AllproductOptions({pageParam: undefined}));
  const List = Array.from({ length: 10 }, (_, i) => i + 1);
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="md:grid md:grid-cols-[200px_1fr] lg:grid-cols-[200px_1fr] gap-4 items-stretch">
        <div className="bg-schemes-light-primaryContainer">
          <SideBar />
        </div>
        <div className=" gap-4 grid grid-cols-12  pt-[2.6rem]">
          <div style={{ gridColumn: "1/13" }}>
            <Hero />
          </div>
          {/* <div style={{ gridColumn: "1/13" }}>
            <Tabs />
          </div> */}
          <div className=" " style={{ gridColumn: "1/13" }}>
            <Trending />
            <div className="divider"></div>
          </div>
          

          <div style={{ gridColumn: "1/13" }}>
            <div className="font-[family-name:var(--font-geist-sans)]">
              <ProductWindow /> 
            </div>
          </div>
        </div>
      </div>
    </HydrationBoundary>
  );
}
