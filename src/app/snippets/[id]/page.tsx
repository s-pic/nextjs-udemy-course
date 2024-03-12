import {db} from "@/db";
import {notFound} from "next/navigation";
import Link from "next/link";
import {deleteSnippet} from "@/actions/updateSnippet";

type SnippetDetailsPageProps = {
    params: {
        id: string;
    };
}

export const generateStaticParams = async () => {
    const snippets = await db.snippet.findMany()
    const paths = snippets.map((snippet) => ({
        id: snippet.id.toString()
    }))
    return paths
}

export default async function SnippetDetailsPage(props: SnippetDetailsPageProps) {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    const {id} = props.params
    const idAsNumber = parseInt(id, 10)
    if (isNaN(idAsNumber)) return notFound()
    const snippet = await db.snippet.findUnique({where: {id: idAsNumber}})

    if (!snippet) return notFound()

    const boundDeleteSnippet = deleteSnippet.bind(null, idAsNumber)

    return (
        <div>
            <h1 className="text-xl mb-2 mt-4 font-bold">Snippet Details</h1>
            <div className="flex m-4 justify-between items-center">
                <h3 className="text-l">{snippet.title}</h3>
                <div className="flex gap-4">
                    <Link className="p-2 border rounded" href={`/snippets/${id}/edit`}>Edit</Link>
                    <form action={boundDeleteSnippet}>
                        <button className="p-2 border rounded" type="submit">Delete</button>
                    </form>
                </div>
            </div>
            <pre className="p-3 border rounded bg-gray-200 border-gray-200" style={{textWrap: "balance"}}><code>{snippet.code}</code></pre>

        </div>
    );
}