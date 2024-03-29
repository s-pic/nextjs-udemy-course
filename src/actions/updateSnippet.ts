"use server"
import {db} from "@/db";
import {redirect} from "next/navigation";
import {revalidatePath} from "next/cache";

export const updateSnippet = async (
    code: string, formData: FormData
) => {
    const snippetId = formData.get("snippetId");
    if (snippetId === null || typeof snippetId !== "string") throw new Error("Invalid snippet id");

    const parsedId = parseInt(snippetId);
    if (isNaN(parsedId)) throw new Error("Invalid snippet id");

    await db.snippet.update({
        where: { id: parsedId },
        data: { code },
    })

    revalidatePath("/snippets/" + snippetId)
    redirect("/snippets/" + snippetId)
}

export const deleteSnippet = async (id: number) => {
    await db.snippet.delete({ where: { id } });
    revalidatePath("/")

    redirect("/")
}