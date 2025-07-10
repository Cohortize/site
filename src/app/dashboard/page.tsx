import { redirect } from "next/navigation";
import { unifiedSession } from "@/lib/auth";
import { DashboardContent } from "../components/dashboard/dashboard-content";

export default async function DashboardPage() {
    const authResult = await unifiedSession();
    
    if (!authResult) {
        redirect('/login');
    }
    
    return <DashboardContent session={authResult.session}/>;
}