import AddressForm from '@/app/components/Forms/AddressForm'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import React from 'react'

const page = async() => {
  const session = await auth()
  if(!session){
    redirect('/login')
  }
  return (
    <div className='px-0 grid-flow-row gap-2 '>
        <AddressForm id={session?.user?.id}/>
    </div>
  )
}

export default page