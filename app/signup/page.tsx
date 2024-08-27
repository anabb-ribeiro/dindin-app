import React from 'react'
import Header from '../components/Header'
import SignUpForm from '../components/SignUpForm'

function page() {
  return (
    <div className="flex flex-col h-screen bg-finances-img bg-cover bg-no-repeat bg-fixed pt-10 pb-20 px-40">
      <Header />
      <SignUpForm />
    </div>
  )
}

export default page