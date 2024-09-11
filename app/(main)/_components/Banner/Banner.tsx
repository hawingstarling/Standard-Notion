'use client';

import { ConfirmModal } from '@/components/modals/ConfirmModal';
import { Button } from '@/components/ui/button';
import { Remove, Restore } from '@/services/api/document';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface BannerProps {
  documentId: string;
}

export const Banner = ({ documentId }: BannerProps) => {
	const router = useRouter();
  const queryClient = useQueryClient()
	
  const { mutateAsync: remove } = useMutation({
    mutationFn: Remove,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['documents'],
      }),
      queryClient.invalidateQueries({
        queryKey: ['documentId'],
      })
    }
  });
  const { mutateAsync: restore } = useMutation({
    mutationFn: Restore,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['documents']
      }),
      queryClient.invalidateQueries({
        queryKey: ['documentId'],
      })
    }
  });

	const onRestore = async () => {
    await toast.promise(
      restore(documentId),
      {
        loading: 'Restoring note...',
        success: 'Note restored!',
        error: 'Failed to restore note.',
      }
    )
  };


	const onRemove = async () => {
    await toast.promise(
      remove(documentId),
      {
        loading: 'Deleting note...',
        success: 'Note deleted!',
        error: 'Failed to delete note.',
      }
    );
    router.push("/documents");
  };

  return (
		<div className="w-full bg-rose-500 text-center text-sm p-2 text-white flex  items-center gap-x-2 justify-center">
			<p>
        This page is in Trash
      </p>
      <Button
        size="sm"
        onClick={onRestore}
        variant="outline"
        className="border-white bg-transparent hover:bg-primary/5 hover:text-white p-1 px-2 h-auto font-normal" 
      >
        Restore page
      </Button>
      <ConfirmModal onConfirm={onRemove}>
        <Button 
          size="sm"
          variant="outline"
          className="border-white bg-transparent hover:bg-primary/5 text-white hover:text-white p-1 px-2 h-auto font-normal"
        >
          Delete forever
        </Button>
      </ConfirmModal>
		</div>
	);
};
