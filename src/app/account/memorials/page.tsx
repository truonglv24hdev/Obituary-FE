import Memorials from '@/components/account/settings/Memorials'
import Footer from '@/components/layout/Footer'
import Heading from '@/components/layout/Heading'
import React from 'react'

const page = () => {
  return (
    <div>
      <Heading className="bg-[#699D99]" />
      <Memorials/>
      <Footer/>
    </div>
  )
}

export default page