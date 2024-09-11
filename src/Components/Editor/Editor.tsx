"use client";

import {
  BlockNoteEditor,
  PartialBlock
} from "@blocknote/core"
import {
  BlockNoteView,
} from "@blocknote/mantine"
import {
  useCreateBlockNote
} from "@blocknote/react"
import "@blocknote/mantine/style.css";
import { useTheme } from "next-themes";
import { useEdgeStore } from "@/lib/edgestore"
import { useDebounceCallback } from "usehooks-ts";
interface EditorProps {
  onChange: (value: string) => void;
  initialContent?: string | null;
  editable?: boolean;
}

const Editor = ({
  onChange,
  initialContent,
  editable
}: EditorProps) => {
  const { resolvedTheme } = useTheme();
  const { edgestore } = useEdgeStore();

  const handleUpload = async (file: File) => {
    const response = await edgestore.publicFiles.upload({
      file
    })

    return response.url;
  }

  const onDeboucedChange = useDebounceCallback((value: string) => {
    onChange(value)
  }, 500)

  const editor: BlockNoteEditor = useCreateBlockNote({
    initialContent: initialContent
      ? (JSON.parse(initialContent) as PartialBlock[])
      : undefined,
    uploadFile: handleUpload
  })
  return (
    <div>
      <BlockNoteView 
        editable={editable}
        editor={editor}
        theme={resolvedTheme === "dark" ? "dark" : "light"}
        onChange={() => {
          onDeboucedChange(JSON.stringify(editor.document, null, 2))
        }}
      />
    </div>
  )
}

export default Editor;