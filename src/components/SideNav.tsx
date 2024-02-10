import Link from "next/link"
import { signIn, signOut, useSession } from "next-auth/react"
import { HeartIconeHoverEffect } from "./HeartIconeHover"
import { VscAccount, VscHome, VscSignIn, VscSignOut } from "react-icons/vsc"

export function SideNav(){
    const session = useSession()
    const user = session.data?.user
    return <nav className="sticky top-0 self-start px-2 py-4">
        <ul className="flex flex-col items-start gap-2 whitespace-nowrap">
            <li>
                <Link href="/">
                    <HeartIconeHoverEffect>
                    <span className="flex items-center gap-4">

                    <VscHome className="h-8 w-8" />
                    <span className="hidden text-lg md:inline">
                        Home
                    </span>
                    </span>
                    </HeartIconeHoverEffect>
                    </Link>
            </li>
            {user != null && (
            <li>
                    <Link href={`/profiles/${user.id}`}>
                    <HeartIconeHoverEffect>
                    <span className="flex items-center gap-4">

                    <VscAccount className="h-8 w-8" />
                    <span className="hidden text-lg md:inline">
                        Profile
                    </span>
                    </span>
                    </HeartIconeHoverEffect>
                    </Link>
            </li>
        )}
            {user == null ? (
            <li>
                <button onClick={() =>void signIn()}>                    
                <HeartIconeHoverEffect>
                    <span className="flex items-center gap-4">

                    <VscSignIn className="h-8 w-8 fill-green-700" />
                    <span className="hidden text-lg md:inline fill-green-700">
                        Se connecter
                    </span>
                    </span>
                    </HeartIconeHoverEffect></button>
            </li>
        ) : 
        <li>
        <button onClick={() =>void signOut()}>                
        <HeartIconeHoverEffect>
                    <span className="flex items-center gap-4">

                    <VscSignOut className="h-8 w-8 fill-red-700" />
                    <span className="hidden text-lg md:inline fill-red-700">
                        Se deconnecter
                    </span>
                    </span>
                    </HeartIconeHoverEffect></button>
    </li>
    }
        </ul>
    </nav>
}