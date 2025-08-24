import React from 'react'
import { getQueryClient } from "../../lib/queryClient/getQueryClient";
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { userOptions } from '@/app/lib/queryClient/userQuery';
import ShipingAdress from '@/app/components/settings/ShipingAdress';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

 const queryClient = getQueryClient()
const page = async() => {
   
    const data = await auth()
    if(!data?.user){
      redirect('/login')
    }
     queryClient.prefetchQuery(userOptions(data.user.id))
     
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
   
    <ShipingAdress id={data?.user?.id}/>

     </HydrationBoundary>
  )
}

export default page