"use client"
import AuthPage from '@/components/base/AuthPage'
import { useSearchParams } from 'next/navigation'
import React from 'react'

const Login = () => {
    const searchParams = useSearchParams()
  return (
    <div>
        {searchParams.get('message')? <h4 className='bg-green-300 font-bold rounded-md p-4'>{searchParams.get('message')}</h4>:""}
        <AuthPage type={"login"}/>
        </div>
  )
}

export default Login