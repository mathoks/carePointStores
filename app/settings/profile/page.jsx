import { auth } from '@/auth'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'

const page = async() => {
    const user = await auth()
    if(!user){
        redirect('/login')
    }
  return (
    <div className='grid grid-flow-row py-4 gap-4 text-sm md:text-base'>
    <div className='bg-white p-4 shadow-md'>
        <div className=' flex justify-between items-center'>
            <p>Photo</p>
            <figure>
               {user?.user.image && <Image src={user?.user?.image} width={50} height={50}  className=' rounded-full' alt='image'/> }
            </figure>
        </div>
    </div>
    <div className='bg-white space-y-8 p-4 shadow-md'>
        <div className=' flex items-center justify-between'>
            <p>Nickname</p>
            <p>{user?.user?.name}</p>
        </div>
        <div className=' flex items-center justify-between'>
            <p>Account information</p>
            <p>{user?.user?.email}</p>
        </div>
        <div className=' flex items-center justify-between'>
            <p>Gender</p>
            <p>{user?.user?.email}</p>
        </div>
        <div className=' flex items-center justify-between'>
            <p>Birth Year</p>
            <p>{user?.user?.email}</p>
        </div>
        <div className=' flex items-center justify-between'>
            <p>Country/region</p>
            <p className='text-schemes-light-onSurface '>{'Nigeria'}</p>
        </div>
    </div>
    <div className='p-4 bg-white shadow-md'>
        <Link  href={'/settings/shipping-address'}>Shipping address</Link>
    </div>
    <div className='p-4 bg-white shadow-md'>
        <p>Delete account</p>
    </div>
    </div>
  )
}

export default page