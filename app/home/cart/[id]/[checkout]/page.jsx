import CheckOutSummary from "@/app/components/CheckOut/CheckoutSummary";
import { auth } from "@/auth";
import React from "react";
import {redirect} from 'next/navigation';
import { getQueryClient } from "@/app/lib/queryClient/getQueryClient";

// const CheckOutSummary = dynamic(() => import('../../../../components/CheckOut/CheckoutSummary'))
const page = async() => {
  const data = await auth()
  const queryClient = getQueryClient();
  if (!data?.user) {
    queryClient.resetQueries({ queryKey: ['cart'], exact: true })
    queryClient.setQueryData(['cart'], [])
    redirect('/home/cart/guest');
  }

  return (
    <div className="grid grid-rows-10 gap-2 ">
    <div className="grid md:grid-cols-3 auto-cols-auto gap-2 mt-0 row-span-full ">
      {/* <div className=" col-span-2">
        <Delivery id= {user.id}/>
      </div> */}
      <div className=" col-span-1 bg-schemes-light-surface ">
        <CheckOutSummary isLoggedIn = {data?.user?.id}/>
      </div>
    </div>
    </div>
  );
};

export default page;
