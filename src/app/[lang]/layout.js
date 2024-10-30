import { headers } from "next/headers";
import { PageContainer } from "../components/container/PageContainer";
import { languages } from "../i18n/settings";

export async function generateStaticParams() {

	return languages.map((lang) => ({ lang }));

};

export default function Layout({
    children, 
    params: {
        lang
    }
}) {

    const pathname = headers().get("x-pathname");
    if (pathname == "home") return children;

    return (

        <PageContainer lang={lang}>
            {children}
        </PageContainer>

    );

};