import {db} from "@/db";
import {SnippetList} from "@/components/SnippetList";
import Link from "next/link";

export default async function Home() {
    const snippets = await db.snippet.findMany()

    return (
        <div>
            <div className="flex mt-4 mb-8 justify-between items-center">
                <h1 className="text-xl font-bold">Snippets</h1>
                <Link className="border p-2 rounded" href="/snippets/new">New</Link>
            </div>
            <ul className="flex gap-2 flex-col">
                <SnippetList snippets={snippets}/>
            </ul>
        </div>
    );
}
