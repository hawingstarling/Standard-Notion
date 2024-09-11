"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "../ui/button";
import { ImageIcon, X } from "lucide-react";
import { useCoverImage } from "@/hook/useCoverImage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RemoveCoverImage } from "@/services/api/document";
import { useParams } from "next/navigation";
import { useEdgeStore } from "@/lib/edgestore";
import { Skeleton } from "../ui/skeleton";

interface CoverImageProps {
  url?: string | null;
  preview?: boolean
}

export const Cover = ({
  url,
  preview
}: CoverImageProps) => {
  const { edgestore } = useEdgeStore();
  const coverImage = useCoverImage();
  const params = useParams();
  const queryClient = useQueryClient();
  const { mutate: removeCoverImage } = useMutation({
    mutationFn: RemoveCoverImage,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['documentIdPage']
      })
    }
  })

  const onRemove = async () => {
    if (url) {
      await edgestore.publicFiles.delete({
        url: url
      })
    }
    removeCoverImage(params.documentId as string)
  }

  return (
    <div className={cn(
      "relative w-full h-[35vh] group",
      !url && "h-[12vh]",
      url && "bg-muted"
    )}>
      {!!url && (
        <Image 
          src={url}
          fill
          alt="cover"
          className="object-cover"
        />
      )}
      {url && !preview && (
        <div
          className="opacity-0 group-hover:opacity-100 absolute bottom-5 right-5 flex items-center gap-x-2"
        >
          <Button
            onClick={() => coverImage.onReplace(url)}
            className="to-muted-foreground text-xs"
            variant="outline"
            size="sm"
          >
            <ImageIcon className="h-4 w-4" />
            Change cover
          </Button>
          <Button
            onClick={onRemove}
            className="to-muted-foreground text-xs"
            variant="outline"
            size="sm"
          >
            <X className="h-4 w-4" />
            Remove
          </Button>
        </div>
      )}
    </div>
  )
}

Cover.Skeleton = function CoverSkeleton () {
  return <Skeleton className="w-full h-[12vh]" />
}