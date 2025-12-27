import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import NavItems from './NavItems'
import UserDropDown from './UserDropDown'
import { searchStocks } from '@/lib/actions/finnhub.actions'

const Header = async ({user}:{user: User}) => {
  const initialStocks = await searchStocks();
  return (
    <header className='sticky top-0 header'>
        <div className="container header-wrapper">
            <Link href="/">
                <Image src="/assets/logo.png" alt='Logo' width={200} height={62} className='h-14 w-auto cursor-pointer'/>
            </Link>
            <nav className='hidden sm:block' >
                <NavItems initialStocks={initialStocks}/>
            </nav>

            <UserDropDown user={user} initialStocks={initialStocks}/>
        </div>

    </header>
  )
}

export default Header
