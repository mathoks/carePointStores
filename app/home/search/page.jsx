"use client"
import SearchIcon from '@/public/icons/SearchIcon'
import Form from 'next/form'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import React, { useState , useEffect} from 'react'
import { setIsSearching, setQuery } from '@/app/lib/features/search/searchSlice'
import { useAppDispatch, useAppSelector } from '@/app/lib/hooks'
import { SearchOptions } from '@/app/lib/queryClient/productQueryOptions'
import { useSuspenseInfiniteQuery } from '@tanstack/react-query'
import SearchProduct from '@/app/components/SearchProduct'



const Page = ({style}) => {
const searchParams = useSearchParams();
const query = useAppSelector(state=>state.search.query)
const pathname = usePathname();
const { replace } = useRouter();
const dispatch = useAppDispatch()
const { data, refetch, hasNextPage, fetchNextPage, isFetchingNextPage} =
    useSuspenseInfiniteQuery(SearchOptions({query, pageParam: undefined}));   

    console.log(data, query)
   
//     function handleSearch(term) {
//   const params = new URLSearchParams(searchParams);

 
//   if (term) {
//     params.set('query', term)
//     dispatch(setQuery(term))
//   } else {
//     params.delete('query');
//     dispatch(setQuery(term))
//   }
//   replace(`${pathname}?${params.toString()}`);
// }

// useEffect(() => {
//       document.querySelector('#txtSearch').addEventListener('keydown', (e) =>{
       
//         if(e.key === 'Enter' && query)
//         {
//           dispatch(setIsSearching(true))
//         }
//         else dispatch(setIsSearching(false))
//       })
//       return ()=> dispatch(setIsSearching(false))
//     }, [query])

  return (
   <div className='grid auto-cols-auto grid-flow-row py-8 px-4 gap-2 mt-8'>
   <div className=' font-medium '>
    <p className='products inline-block relative font-semibold'>Search results :</p>
    <div className=' divider'></div>
   </div>
   
   {data?.pages?.map((pages, id) => (
        <React.Fragment key={id}>
          {pages?.map((page, ids) => (
            <SearchProduct key={page?.id || ids} item={page}/>
          ))}
        </React.Fragment>
      ))}
   </div>
  )
}

export default Page
