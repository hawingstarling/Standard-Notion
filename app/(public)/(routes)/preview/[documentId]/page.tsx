'use client';

import dynamic from "next/dynamic";
import { useMemo } from "react";

import { Cover } from "@/components/Cover/Cover";
import { Toolbar } from "@/components/Toolbar/Toolbar";
import { Skeleton } from "@/components/ui/skeleton";
import { GetById, UpdateDocument } from "@/services/api/document";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

interface DocumentIdPageProps {
	params: {
		documentId: string
	}
}

const DocumentIdPage = ({
	params
}: DocumentIdPageProps) => {
  const Editor = useMemo(
    () => dynamic(() => import("@/components/Editor/Editor"), { ssr: false }), 
    []
  )

  const queryClient = useQueryClient();
  const { data: document } = useQuery({
    queryKey: ['documentIdPage', params.documentId],
    queryFn: () => GetById(params.documentId as string),
  });
  const { mutate: update } = useMutation({
    mutationFn: UpdateDocument,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['documentIdPage']
      })
    }
  })

  const onChange = (content: string) => {
    update({
      id: params.documentId,
      content
    })
  }

	if (document === undefined) {
		return (
      <div>
        <Cover.Skeleton />
        <div className="md:max-w-3xl lg:max-w-4xl mx-auto mt-10">
          <div className="space-x-4 pl-8 pt-4">
            <Skeleton className="h-4 w-[50%]" />
            <Skeleton className="h-4 w-[80%]" />
            <Skeleton className="h-4 w-[40%]" />
            <Skeleton className="h-4 w-[60%]" />
          </div>
        </div>
      </div>
    )
	}

	if (document === null) {
		return <div>Not found</div>
	}

  return (
		<div className="pb-40">
      <Cover preview url={document.coverImage} />
			<div className="md:max-w-3xl lg:max-w-4xl mx-auto">
				<Toolbar preview initialData={document} />
        <Editor 
          editable={false}
          onChange={onChange}
          initialContent={document.content}
        />
			</div>
		</div>
	);
};

export default DocumentIdPage;
