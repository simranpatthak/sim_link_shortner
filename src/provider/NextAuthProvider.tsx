"use client"
import { SessionProvider } from 'next-auth/react'
import React from 'react'
interface ChildProp{
    children:React.ReactNode
}
const NextAuthProvider = ({children}:ChildProp) => {
  return (
    <SessionProvider>{children}</SessionProvider>
  )
}

export default NextAuthProvider