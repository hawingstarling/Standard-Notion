"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader
} from "@/components/ui/dialog"
import { useCoverImage } from "@/hook/useCoverImage";
import { SingleImageDropzone } from "@/components/SingleImageDropzone/SingleImageDropzone";
import { useState } from "react";
import { useEdgeStore } from "@/lib/edgestore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UpdateDocument } from "@/services/api/document";
import { useParams } from "next/navigation";

export const CoverImageModal = () => {
  const params = useParams();
  const queyClient = useQueryClient();
  const { mutate: update } = useMutation({
    mutationFn: UpdateDocument,
    onSuccess: () => {
      queyClient.invalidateQueries({
        queryKey: ['documentIdPage']
      })
    }
  })
  const [file, setFile] = useState<File>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const coverImage = useCoverImage();
  const { edgestore } = useEdgeStore();

  const onClose = () => {
    setFile(undefined);
    setIsSubmitting(false);

    coverImage.onClose();
  }

  const onChange = async (file?: File) => {
    if (file) {
      setIsSubmitting(true);
      setFile(file);

      const res = await edgestore.publicFiles.upload({
        file,
        options: {
          replaceTargetUrl: coverImage.url
        }
      })

      update({
        id: params.documentId as string,
        coverImage: res.url
      })

      onClose();
    }
  }

  return (
    <Dialog open={coverImage.isOpen} onOpenChange={coverImage.onClose}>
      <DialogContent>
        <DialogHeader>
          <h2 className="text-center text-lg font-semibold">
            Cover image
          </h2>
        </DialogHeader>
        <SingleImageDropzone 
          className="w-full outline-none"
          disabled={isSubmitting}
          value={file}
          onChange={onChange}
        />
      </DialogContent>
    </Dialog>
  )
}