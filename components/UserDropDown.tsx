'use client'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
import { useRouter } from "next/navigation"
import { LogOut } from "lucide-react"
import NavItems from "./NavItems"

const UserDropDown = () => {
   const router = useRouter();
   const handleSignOut = async () => {
    router.push("/sign-in")
   }

   const user = {name : 'Louai', email :'lou@gmail.com'}
  return (
        <DropdownMenu>
        <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-3 text-gray-400 hover:text-green-400">
            <Avatar className="h-8 w-8">
                <AvatarImage src="https://media.licdn.com/dms/image/v2/D4E03AQEiOwCNGybkJg/profile-displayphoto-crop_800_800/B4EZqisVRvKkAI-/0/1763666122630?e=1767830400&v=beta&t=IKu4X16i2ASxFmW2QnG_Wr_thlnZbnW4h6cn1qktKMk" />
                <AvatarFallback className="bg-green-500 text-green-900 text-sm font-bold">{user.name[0]}</AvatarFallback>
            </Avatar>
            <div className="hidden md:flex flex-col items-start">
                <span className="text-base font-medium text-gray-400">
                {user.name}</span>
            </div>
        </Button>
        </DropdownMenuTrigger>
        
        <DropdownMenuContent className="w-56 text-gray-400" align="start">
        
            <DropdownMenuLabel>
                <div className="flex relative items-center gap-3 py-2">
                <Avatar className="h-10 w-10">
                    <AvatarImage src="https://media.licdn.com/dms/image/v2/D4E03AQEiOwCNGybkJg/profile-displayphoto-crop_800_800/B4EZqisVRvKkAI-/0/1763666122630?e=1767830400&v=beta&t=IKu4X16i2ASxFmW2QnG_Wr_thlnZbnW4h6cn1qktKMk" />
                    <AvatarFallback className="bg-green-500 text-green-900 text-sm font-bold">{user.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                    <span className="text-base font-medium text-gray-400">
                    {user.name}</span>
                    <span className="text-base font-medium text-gray-400">
                    {user.email}</span>
                </div>
                </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-gray-600"/>
            <DropdownMenuItem onClick={handleSignOut} className="text-gray-100 text-md font-medium focus:bg-transparent focus:text-red-500 transition-colors cursor-pointer">
                <LogOut className="h-4 w-4 mr-2 hidden sm:block"/>
                Logout
            </DropdownMenuItem>
            <DropdownMenuSeparator className="block sm:hidden bg-gray-600"/>
            <nav className="sm:hidden">
                <NavItems/>
            </nav>
        </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserDropDown
