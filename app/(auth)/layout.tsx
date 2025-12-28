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
    <main className="auth-layout h-screen w-full flex overflow-hidden">
  {/* Left section */}
  <section className="flex flex-col p-6 lg:p-10 h-full w-full lg:w-1/2 shrink-0">
    <Link href="/" className="mb-auto">
      <Image src={logo} alt="Logo" width={140} height={32} priority />
    </Link>

    <div className="flex-1 flex flex-col justify-center items-center">
        <div className="w-full max-w-md">
            {children}
        </div>
    </div>
    <div className="mt-auto" />
  </section>

  {/* Right section - Guaranteed hidden below 1024px */}
  <section className="hidden lg:block lg:w-1/2 h-full relative border-l border-white/10">
    <GalaxyBackground>
      <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center z-20">
        <p className="text-gray-300 text-lg max-w-md">
          Sign up to explore the cosmic possibilities of financial management
        </p>
      </div>
    </GalaxyBackground>
  </section>
</main>
  )
}

export default Layout
