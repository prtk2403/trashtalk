import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Image from "next/image";
async function DashboardPage() {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
            <div className="mb-4">
                <p>Email: {user?.email}</p>
                <p>Name: {user?.given_name} {user?.family_name}</p>
                <p>ID: {user?.id}</p>
                <Image priority key = {user?.picture} src={user?.picture || ""} alt="User profile picture" width={100} height={100} />
            </div>
            <LogoutLink className="text-blue-500 hover:text-blue-700">Logout</LogoutLink>
        </div>
    );
}

export default DashboardPage;