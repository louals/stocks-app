import Image from "next/image"
import logo from "../../public/assets/logo.png"
import dashboardPreview from "../../public/assets/images/dashboard.png" 

import Link from "next/link"
import { auth } from "@/lib/better-auth/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

const Layout = async ({children}:{children : React.ReactNode}) => {
  const session = await auth.api.getSession({headers: await headers()})

  if(session?.user) redirect('/') 
  
  return (
    <main className="bg-black min-h-screen w-full flex lg:overflow-hidden lg:h-screen">
      {/* Left section: Auth Form */}
      <section className="flex flex-col p-6 lg:p-10 h-full w-full lg:w-1/2 shrink-0 bg-zinc-950">
        <Link href="/" className="mb-auto">
          <Image src={logo} alt="Logo" width={140} height={32} priority />
        </Link>

        <div className="flex-1 flex flex-col justify-center items-center">
            <div className="w-full max-w-md">
                {children}
            </div>
        </div>
      </section>

      {/* Right section: Dashboard Preview */}
      <section className="hidden bg-zinc-950 lg:flex lg:w-1/2 h-full relative items-center justify-center overflow-hidden">
        {/* Subtle Gradient Overlay for Depth */}
        <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-transparent z-10" />
        
        <div className="relative w-[90%] h-[80%] rounded-xl border border-white/10 shadow-2xl overflow-hidden bg-zinc-950 translate-x-12 translate-y-12 transition-transform duration-700 hover:translate-x-8 hover:translate-y-8">
            <Image 
                src={dashboardPreview} 
                alt="Dashboard Preview" 
                fill
                className="object-cover object-left-top  opacity-90"
                priority
            />
            
            
        </div>
      </section>
    </main>
  )
}

export default Layout