import CartView from '@/app/components/Cart/CartView'
import CheckOut from '@/app/components/CheckOut/CheckOut'
import Delivery from '@/app/components/Delivery/Delivery'
import React from 'react'
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getQueryClient } from "@/app/lib/queryClient/getQueryClient";
import { SuspensecartOptions } from '@/app/lib/queryClient/getCartQuery'
import { userOptions } from '@/app/lib/queryClient/userQuery'
import { auth } from '@/auth';
import { redirect } from 'next/navigation';


// const fixUrl = (params, userId)=>{
// if(params !== 'guest' && userId){
// return 
// }
// if(!!userId && params === 'guest'){
//   redirect(`/home/cart/${userId}/complete-order`)
// }
// }
const queryClient = getQueryClient();
const page = async () => {
  const user = await auth();
  // fixUrl(param?.id, user?.user?.id)
 (!!user?.user?.id && queryClient.prefetchQuery(SuspensecartOptions(user?.user?.id, true)));
 (!!user?.user?.id  && queryClient.prefetchQuery(userOptions(user?.user?.id)));
  return (
    <HydrationBoundary  state={dehydrate(queryClient)}>
    <div className='md:min-h-screen grid grid-rows-10 gap-2 pb-0' >
    <div className='md:grid md:grid-cols-7 md:space-y-0 space-y-4 flex flex-col md:gap-4  row-span-full '>
        <div className=' col-span-4 row-span-full'>
        <CartView userId={user?.user?.id}/>
        </div>
        <div className=' col-span-3'>
        <Delivery id = {user?.user?.id}/>
        <div className='divider py-0 my-0 opacity-0'></div>
        <div className='bg-schemes-light-surface  rounded-sm'>

        <CheckOut user ={user?.user?.id ?? 'guest'}/>
         </div> 
        </div>
        </div> 
        
    </div>
    </HydrationBoundary>
  )
}

export default page