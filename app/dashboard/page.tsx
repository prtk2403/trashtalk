import ShitpostGenerator from "@/components/generate-post";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
async function DashboardPage() {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
        redirect("/");
    }
    
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <ShitpostGenerator />
        </div>
    );
}

export default DashboardPage;