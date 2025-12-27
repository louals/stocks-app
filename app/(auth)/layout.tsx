import Image from "next/image"
import logo from "../../public/assets/logo.png"

import Link from "next/link"
import GalaxyBackground from "@/components/Galaxy-Background"
import { auth } from "@/lib/better-auth/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

const Layout = async ({children}:{children : React.ReactNode}) => {
  const session = await auth.api.getSession({headers: await headers()})

  if(session?.user) redirect('/') 
  
  return (
    // Ensure the main container is exactly the height of the screen
    <main className="auth-layout h-screen overflow-hidden">
      <section className="auth-left-section flex flex-col p-6 lg:p-10 h-full">
        <Link href="/" className="auth-logo mb-auto">
          <Image src={logo} alt="Logo" width={140} height={32}/>
        </Link>

        {/* This div now centers your SignIn/SignUp forms vertically and horizontally */}
        <div className="flex-1 flex flex-col justify-center items-center w-full">
            <div className="w-full max-w-md">
                {children}
            </div>
        </div>

        {/* Keeps the layout balanced by pushing the logo to the top and footer to bottom */}
        <div className="mt-auto" />
      </section>

      <section className="auth-right-section h-full">
        <GalaxyBackground>
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center z-20">
            <div className="max-w-md">
              <p className="text-gray-300 text-lg">
                Sign up to explore the cosmic possibilities of financial management
              </p>
            </div>
          </div>
        </GalaxyBackground>
      </section>
    </main>
  )
}

export default Layout