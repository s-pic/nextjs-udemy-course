import {notFound} from "next/navigation";
import {db} from "@/db";
import {SnippetEditForm} from "@/components/SnippetEditForm";

type SnippetEditPageProps = {
    params: {
        id: string;
    };
}

export default async function EditSnippetPage(props: SnippetEditPageProps) {
    const {params} = props
    const idAsNumber = parseInt(params.id, 10)
    if (isNaN(idAsNumber)) return notFound()

    const snippet = await db.snippet.findFirst({where: {id: idAsNumber}})
    if (!snippet) return notFound()



    return (
        <div>
            <h3 className="text-xl text-bold mt-2 mb-4">Edit Snippet</h3>
           <SnippetEditForm snippet={snippet} />
        </div>
    )
}