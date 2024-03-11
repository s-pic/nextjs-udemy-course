"use client"

import {Snippet} from "@prisma/client";
import {Editor} from "@monaco-editor/react";
import {useLayoutEffect, useRef, useState} from "react";
import {updateSnippet} from "@/actions/updateSnippet";

type Props = {
    snippet: Snippet;
}

export const SnippetEditForm = ({snippet}: Props) => {
    const [code, setCode] = useState<string | undefined>(snippet.code)

    const latestCodeRef = useRef<string | undefined>(snippet.code)
    useLayoutEffect(() => {
        latestCodeRef.current = code
    }, [code])


    const didCodeChange = snippet.code !== code

    const boundUpdateSnippet = updateSnippet.bind(null, code) // first arg is bount. Second one wll be form data

    return (
        <form action={boundUpdateSnippet}>
            <Editor
                height="40vh"
                defaultLanguage="typescript"
                defaultValue={code}
                theme="vs-dark"
                options={{minimap: {enabled: false}}}
                onChange={setCode}
            ></Editor>

            <button
                type="submit"
                disabled={!didCodeChange}
                className=" bg-blue-500 text-white rounded p-2 px-4 mt-4 disabled:bg-blue-100"
            >Save</button>

            <input type="hidden" name="snippetId" value={snippet.id} />
        </form>
    );
}