"use server"

import { headers } from "next/headers";
import { PageContainer } from "../components/container/PageContainer";
import { languages } from "../i18n/settings";

export async function generateStaticParams() {

	return languages.map((lang) => ({ lang }));

};

export default async function Layout(props) {
    const params = await props.params;

    const {
        lang
    } = params;

    const {
        children
    } = props;

    const pathname = (await headers()).get("x-pathname");
    if (pathname == "home") return children;

    return (

        <PageContainer lang={lang}>
           {children}
        </PageContainer>

    );
};