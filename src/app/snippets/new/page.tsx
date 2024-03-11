"use client"
import {createSnippet} from "@/actions/createSnippet";
import {useFormState} from "react-dom";

export default function SnippetCreatePage() {
    const [formState, stateFulCreateSnippet] = useFormState(createSnippet, {message: ""})
    return (
        <form action={stateFulCreateSnippet}>
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
            {
                formState.message && <div className="text-red-500 py-4">{formState.message}</div>
            }

            <button type="submit" className="bg-blue-200 rounded p-2 mt-4 w-full">Create</button>
        </form>
    );
}