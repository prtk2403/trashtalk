import Link from "next/link";
import Logo from "./Logo";
import { LogoutLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { Button } from "@/components/ui/button";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Image from "next/image";

async function Navbar() {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    return (
        <nav className="flex justify-between items-center p-4">
            <Link href="/">
               <Logo />
            </Link>
            
            <div className="flex items-center gap-4">
                {user ? (
                    <>
                        <div className="flex items-center gap-2">
                            {user.picture ? (
                                <Image 
                                    src={user.picture} 
                                    alt="Profile" 
                                    width={32} 
                                    height={32} 
                                    className="rounded-full"
                                />
                            ) : (
                                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                                    <span className="text-sm font-medium text-muted-foreground">
                                        {user.given_name?.[0] || user.email?.[0] || '?'}
                                    </span>
                                </div>
                            )}
                            <span className="font-medium text-foreground">
                                {user.given_name || user.email?.split('@')[0]}
                            </span>
                        </div>
                        <Button variant="outline">
                            <LogoutLink>Logout</LogoutLink>
                        </Button>
                    </>
                ) : (
                    <>
                        <Button>
                            <RegisterLink>Login/Register</RegisterLink>
                        </Button>
                    </>
                )}
            </div>
        </nav>
    );
}

export default Navbar;