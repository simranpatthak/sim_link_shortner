import AuthPage from '@/components/base/AuthPage'
import React, { Suspense } from 'react'

const Register = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}><AuthPage type={"register"}/></Suspense>
  )
}

export default Register