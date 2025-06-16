import LoadingPanel from "@/app/components/LoadingPanel";
import { redirect } from "next/navigation";

export default async function Page({ searchParams }) {

    const { mode, oobCode } = await searchParams;

    if (mode == "resetPassword") {
        redirect(`/auth/action/reset-password?code=${oobCode}`);
    } else {
        redirect("/shop");
    }

    return (
        <div className="h-screen w-full flex">
            <LoadingPanel />
        </div>
    );

};
