"use client"
import React, { memo, Suspense } from 'react'
import StateCity from '../inputs/StateCity'
import { userOptions } from '@/app/lib/queryClient/userQuery'
import { useSuspenseQuery } from '@tanstack/react-query'
import DefaultAddress from './DefaultAddress'
import { useAppSelector } from '@/app/lib/hooks'


const Delivery = memo(function Del({id}){
    const { data } = useSuspenseQuery(userOptions(id));
    const hasItems = !!useAppSelector((state) => state.userCart.data).length;
    return (
   hasItems && <div className="p-4 flex flex-col space-y-4 bg-schemes-light-surface  text-slate-900 rounded-sm">
    <h1 className="font-medium text-slate-400 relative products inline-block">Delivery & Returns</h1>
    <Suspense>
    <DefaultAddress data={data}/>
    </Suspense>
    <div className="divider text-schemes-light-onSurfaceVariant">OR</div>
    <StateCity/>
    <div className='flex flex-col space-y-2'>
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
        <div>
            <span>Warranty</span><br></br>
            <span className="text-sm">All Products Are Guaranteed</span>
        </div>
        </div>
        </div>
        </div>
        </div>
  )
})

export default Delivery
