import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import NavItems from './NavItems'
import UserDropDown from './UserDropDown'

const Header = () => {
  return (
    <header className='sticky top-0 header'>
        <div className="container header-wrapper">
            <Link href="/">
                <Image src="/assets/images/logo.png" alt='Logo' width={200} height={62} className='h-14 w-auto cursor-pointer'/>
            </Link>
            <nav className='hidden sm:block' >
                <NavItems/>
            </nav>

            <UserDropDown/>
        </div>

    </header>
  )
}

export default Header
