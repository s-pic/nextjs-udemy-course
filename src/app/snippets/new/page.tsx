import { db } from "@/db";
import {redirect} from "next/navigation";

async function createSnippet(data: FormData) {
    "use server"

    const title = data.get("title")
    const code = data.get("code")
    if (!title || !code) throw new Error("Title and code are required")
    if (typeof title !== "string" || typeof code !== "string") throw new Error("Invalid input")

    const snippet = await db.snippet.create({ data: { title, code } })
    redirect("/")
}

export default function SnippetCreatePage() {
    return (
        <form action={createSnippet}>
            <h3 className="font-bold mt-2 mb-4">Create a snippet</h3>

            <div className="flex flex-col gap-4">
                <div className="flex gap-4">
                    <label htmlFor="title" className="w-12">Title</label>
                    <input id="title" name="title" type="text" className="border rounded p-2 w-full"/>
                </div>
            </div>

            <div className="flex flex-col gap-4 mt-2">
                <div className="flex gap-4">
                    <label htmlFor="code" className="w-12">Code</label>
                    <textarea id="code" name="code" className="border rounded p-2 w-full"/>
                </div>
            </div>

            <button type="submit" className="bg-blue-200 rounded p-2 mt-4 w-full">Create</button>
        </form>
    );
}