"use server"
import {db} from "@/db";
import {revalidatePath} from "next/cache";

import {redirect} from "next/navigation";
export async function createSnippet(
    formState: {message: string},
    data: FormData) {

    const title = data.get("title")
    const code = data.get("code")
    if (!title || !code || typeof title !== "string" || typeof code !== "string") {
        return {
            message: "Title and code are required"
        }
    }
    switch (true) {
        case title.length < 3:
            return {
                message: "Title must be at least 3 characters"
            }
        case code.length < 3:
            return {
                message: "Code must be at least 3 characters"
            }
        case code.length > 1000:
            return {
                message: "Code mustnot be longer than 1000 characters"
            }
    }
    try {
        await db.snippet.create({data: {title, code}})
        revalidatePath("/")
    } catch (e) {
        console.error(e)
        return {
            message: "Something went wrong"
        }
    }
    redirect("/")
}