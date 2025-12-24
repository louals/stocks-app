import Image from "next/image"
import logo from "../../public/assets/logo.png"
import starIcon from "../../public/assets/icons/star.svg"
import dashboard from "../../public/assets/images/auth-image.jpg"
import Link from "next/link"
import GalaxyBackground from "@/components/Galaxy-Background"

const Layout = ({children}:{children : React.ReactNode}) => {
  return (
    <main className="auth-layout">
      <section className="auth-left-section scrollbar-hide-default">
        <Link href="/" className="auth-logo"><Image src={logo} alt="Logo" width={140} height={32}/></Link>
        <div className="pb-6 lg:pb-8 flex-1">
            {children}
        </div>
      </section>

      <section className="auth-right-section">
        <GalaxyBackground>
          {/* Quote content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center z-20">
            <div className="max-w-md">
              <div className="mb-8">
               
                <p className="text-gray-300 text-lg">
                  Sign up to explore the cosmic possibilities of financial management
                </p>
              </div>
            </div>
          </div>
        </GalaxyBackground>
      </section>
    </main>
  )
}

export default Layout