import { client } from "@/lib/sanity/client";

function parseMarkdown(markdownText) {

    const sections = [];
    const lines = markdownText.split('\n');
    let currentSection = null;

    lines.forEach(line => {

        if (line.startsWith('**') && line.endsWith('**')) {

            if (currentSection) sections.push(currentSection);

            currentSection = { title: line.replace(/\*\*/g, ''), content: '' };

        } else if (currentSection) {

            currentSection.content += line + ' ';

        };

    });

    if (currentSection) sections.push(currentSection);

    return sections;
};

export default async function Page(props) {
    const params = await props.params;

    const {
        lang
    } = params;

    const QUERY = `*[_type == "legal" && title == "terms-conditions"]`;
    const res = await client.fetch(QUERY, { cache: "no-store" });
    const content = parseMarkdown(res[0].content);

    return (

        <div className="w-full mt-16 2md:grid grid-cols-4 gap-2">

            <div className="col-start-2 col-span-2 h-auto">

                <h1 className="capitalize mx-2 my-1 text-lg">terms and conditions</h1>

                <div className="space-y-2 text-sm mt-4">

                    <p>
                        Welcome to Longitude! These terms and conditions outline the rules and regulations for using Longitude’s website, located at longitudebrand.com.
                    </p>

                    <p>
                        By accessing this website, we assume you accept these terms and conditions. Do not continue to use Longitude if you do not agree to all the terms and conditions stated on this page.
                    </p>

                </div>

                <div className="my-10 space-y-10">

                    {content.map((section) => (

                        <div className="space-y-1 text-sm">
                            <h2 className="capitalize font-medium">{section.title}</h2>
                            <p>{section.content}</p>
                        </div>

                    ))}


                </div>

            </div>

        </div>

    )
}