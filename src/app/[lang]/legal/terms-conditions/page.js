import { sanityFetch } from "@/lib/sanity/fetch";
import * as md from "@/lib/parseMarkdown";

export default async function Page(props) {

    const query = `*[_type == "legal" && title == "terms-conditions"]`;
    const res = await sanityFetch({
        query,
        tags: ["legal"]
    });
    // const content = parseMarkdown(res[0].content);
    const content = md.parseMarkdown(res[0].content);


    return (

        <div className="w-full mt-16 2md:grid grid-cols-4 gap-2">

            <div className="col-start-2 col-span-2 h-auto">

                <h1 className="capitalize mx-2 my-1 text-lg">terms and conditions</h1>

                <div className="my-10">

                    {content.map((element, index) => {
                        if (element.type === 'heading') {
                            return (
                                <h2
                                    key={index}
                                    className="font-semibold text-base mt-8 mb-3 first:mt-4"
                                >
                                    {element.content}
                                </h2>
                            );
                        } else if (element.type === 'paragraph') {
                            return (
                                <p
                                    key={index}
                                    className="text-sm leading-relaxed mb-4 text-gray-700"
                                >
                                    {md.renderBoldText(element.content)}
                                </p>
                            );
                        } else if (element.type === 'list') {
                            return (
                                <ul
                                    key={index}
                                    className="text-sm leading-relaxed mb-4 text-gray-700 space-y-2 ml-4"
                                >
                                    {element.items.map((item, itemIndex) => (
                                        <li
                                            key={itemIndex}
                                            className="list-disc"
                                        >
                                            {md.renderBoldText(item)}
                                        </li>
                                    ))}
                                </ul>
                            );
                        }
                        return null;
                    })}

                </div>

            </div>

        </div>

    )
}