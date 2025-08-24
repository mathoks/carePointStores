"use client";
import { userOptions } from "@/app/lib/queryClient/userQuery";
import { useSuspenseQuery, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { Suspense } from "react";
import AddressTemplate from "./AddressTemplate";

const ShipingAdress = ({ id }) => {
  const { data, isSuccess } = useSuspenseQuery(userOptions(id));
  const hasShipingAdress = isSuccess && !!data?.length;
  console.log(data);
  const router = useRouter();

  if (!id) {
    router.push("/login");
  }

  return (
    <Suspense fallback={<div>Opps</div>}>
      <div className="flex flex-col gap-4 bg-schemes-light-surface  pt-4 min-h-[calc(100vh-300px)]">
        {!hasShipingAdress ? (
          <button>You have added no Shipping addrress</button>
        ) : (
          data.map((info, id) => <AddressTemplate address={info} key={id} />)
        )}
      </div>
      <div className="w-full flex flex-col items-center px-4 ">
        <button
          onClick={() => router.push("Add-new-address")}
          className=" btn w-full px-8 bg-schemes-light-surfaceTint  text-schemes-light-onPrimary"
        >
          {!hasShipingAdress ? "Add Address" : "Add New Address"}
        </button>
      </div>
    </Suspense>
  );
};

export default ShipingAdress;

// const handleNavigation = (url)=>{
//     const link = document.createElement('a');
//     link.href = url;
//     link.click();
// }
// useEffect(()=>{
//     if(id){
//         refetch()
//     }
//     else {}
// }, [id])
