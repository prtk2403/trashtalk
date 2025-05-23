import Link from "next/link";
import Logo from "./Logo";
import { LoginLink , RegisterLink} from "@kinde-oss/kinde-auth-nextjs/components";
import { Button } from "@/components/ui/button";
function Navbar() {
    return (
        <nav className="flex justify-between items-center p-4">
            <Link href="/">
                <Logo />
            </Link>
            <div className="flex gap-4">
                <Button><LoginLink>Login</LoginLink></Button>
                <Button><RegisterLink>Register</RegisterLink></Button>
            </div>
        </nav>
    );
}

export default Navbar;