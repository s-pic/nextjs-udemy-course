"use client"

import {Snippet} from "@prisma/client";
import {useRouter} from "next/navigation";
import Link from "next/link";

export const SnippetList = ({snippets}: {snippets: Snippet[]}) => {
    const {push} = useRouter()
    const snippetElements = snippets.map((snippet) => (
        <li
            key={snippet.id}
        >
            <Link
            className="flex justify-between items-center p-2 border rounded mb-4"
            href={`/snippets/${snippet.id}`}>
            <div>{snippet.title}</div>
            <pre>{snippet.code}</pre>

        </Link>
        </li>
    ));

    return (
    <ul>
        {snippetElements}
    </ul>)
}