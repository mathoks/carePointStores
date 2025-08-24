"use client"
import SearchIcon from '@/public/icons/SearchIcon'
import Form from 'next/form'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import React, { useState , useEffect} from 'react'
import { useAppDispatch, useAppSelector } from '../lib/hooks'
import { setIsSearching, setQuery } from '../lib/features/search/searchSlice'
import Link from 'next/link'


const Searchbox = ({style}) => {
const searchParams = useSearchParams();
const query = useAppSelector(state=>state.search.query)
const pathname = usePathname();
const { replace } = useRouter();
const dispatch = useAppDispatch()

function handleSearch(term) {
  const params = new URLSearchParams(searchParams);

  if (term) {
    params.set('query', term)
    dispatch(setQuery(term))
  } else {
    params.delete('query');
    dispatch(setQuery(term))
  }
  replace(`${pathname}?${params.toString()}`);
}

useEffect(() => {
      document.querySelector('#txtSearch').addEventListener('keydown', (e) =>{
       
        if(e.key === 'Enter' && query)
        {
          dispatch(setIsSearching(true))
        }
        else dispatch(setIsSearching(false))
      })
      return ()=> dispatch(setIsSearching(false))
    }, [query])

    if(!pathname.includes('search'))
  return (
    <Link  href={'/home/search'} className='grid overflow-clip gap-0 outline-2   items-center md:hidden   rounded-full bg-schemes-light-background  auto-cols-auto grid-flow-col cursor-pointer max-w-[20rem] mx-auto py-1'>
      <div className='pl-1'>
        <SearchIcon/>
      </div>
    
        <div id='txtSearch' className='text-base text-schemes-light-onBackground  bg-schemes-light-background focus:outline-none col-span-3 pl-0 max-w-[16rem]'>
        <p className='text-sm text-gray-700'>Search by products, brands & categories</p>
        </div>
      
    </Link>
  ); else return (
    <form  onSubmit={(e)=>e.preventDefault()} className='grid overflow-clip gap-0 parentSearchBox items-center md:hidden rounded-full bg-schemes-light-background  auto-cols-auto grid-flow-col cursor-pointer max-w-[20rem] mx-auto '>
      <div className='pl-2 w-fit'>
        <SearchIcon/>
      </div>
    
        <input autoFocus = {true} type='search' id='txtSearch' defaultValue={searchParams.get('query')?.toString()} onChange={(e)=>handleSearch(e.target.value)} placeholder='Search by products, brands & categories' className='text-base py-0 text-schemes-light-onBackground input-sm bg-schemes-light-background focus:outline-none col-span-3 pl-0 placeholder:text-sm'/>
      
    </form>
  )
}

export default Searchbox
