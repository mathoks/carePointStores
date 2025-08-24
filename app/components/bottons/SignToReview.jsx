'use client'

import { signIn } from 'next-auth/react'
import React from 'react'

const SignToReview = () => {
  return (
    <button onClick={()=>signIn()} className="font-medium text-blue-500 mr-4">
    sign in to drop a review
    </button>
  )
}

export default SignToReview
