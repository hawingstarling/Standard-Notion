"use client";

import { GetTrash, Remove, Restore } from '@/services/api/document';
import { useParams, useRouter } from 'next/navigation';
import React from 'react';
import { toast } from 'sonner';
import { Search, Trash, Undo } from 'lucide-react';
import { Document } from '@prisma/client';
import Spinner from '@/components/Spinner';
import { Input } from '@/components/ui/input';
import { ConfirmModal } from '@/components/modals/ConfirmModal';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const TrashBox = () => {
  const router = useRouter();
  const params = useParams();
  const queryClient = useQueryClient()
  const [search, setSearch] = React.useState('');
  const [trashs, setTrashs] = React.useState<Document[]>([]);
  const filteredDocuments = trashs.filter((trashs) => {
    return trashs.title.toLowerCase().includes(search.toLowerCase());
  });
  const { mutateAsync: remove } = useMutation({
    mutationFn: Remove,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['documents']
      })
    }
  });
  const { mutateAsync: restore } = useMutation({
    mutationFn: Restore,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['documents']
      })
    }
  });

  const onClick = (documentId: string) => {
    router.push(`/documents/${documentId}`);
  };

  const onRestore = async (event: React.MouseEvent<HTMLDivElement, MouseEvent>, documentId: string) => {
    event.stopPropagation();

    await toast.promise(
      restore(documentId),
      {
        loading: 'Restoring note...',
        success: 'Note restored!',
        error: 'Failed to restore note.',
      }
    )
    setTrashs((prev) => prev.filter((doc) => doc.id !== documentId))
  };

  const onRemove = async (documentId: string) => {
    await toast.promise(
      remove(documentId),
      {
        loading: 'Deleting note...',
        success: 'Note deleted!',
        error: 'Failed to delete note.',
      }
    )
    setTrashs((prev) => prev.filter((doc) => doc.id !== documentId))

    if (params.documentId === documentId) {
      router.push('/documents');
    }
  };

  async function FetchApiDocuments() {
    let { data } = await GetTrash();

    setTrashs((data as any).data as Document[]);
  }

  React.useEffect(() => {
    FetchApiDocuments();
  }, []);

  if (trashs === undefined) {
    return (
      <div className="flex h-full items-center justify-center p-4">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="text-sm">
      <div className="flex items-center gap-x-1 p-2">
        <Search className="h-4 w-4" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-7 bg-secondary px-2 focus-visible:ring-transparent"
          placeholder="Filter by page title..."
        />
      </div>
      {/* Will be rendered only if it is the last element */}
      <div className="mt-2 px-1 pb-1">
        <p className="hidden pb-2 text-center text-xs text-muted-foreground last:block">
          No documents found.
        </p>
        {filteredDocuments?.map((document) => (
          <div
            key={document.id}
            role="button"
            onClick={() => onClick(document.id)}
            className="flex w-full items-center justify-between rounded-sm text-sm text-primary hover:bg-primary/5"
          >
            <span className="truncate pl-2">{document.title}</span>
            <div className="flex items-center">
              <div
                onClick={(e) => onRestore(e, document.id)}
                role="button"
                className="rounded-sm p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600"
              >
                <Undo className="h-4 w-4 text-muted-foreground" />
              </div>
              <ConfirmModal onConfirm={() => onRemove(document.id)}>
                <div
                  role="button"
                  className="rounded-sm p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600"
                >
                  <Trash className="h-4 w-4 text-muted-foreground" />
                </div>
              </ConfirmModal>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
