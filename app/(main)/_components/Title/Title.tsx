'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { UpdateDocument } from '@/services/api/document';
import { Document } from '@prisma/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useRef, useState } from 'react';

interface TitleProps {
  initialData: Document;
}

export const Title = ({ 
	initialData 
}: TitleProps) => {
	const queryClient = useQueryClient();
	const inputRef = useRef<HTMLInputElement>(null);
	const { mutate: update } = useMutation({
		mutationFn: UpdateDocument,
		onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['documents']
      });
			queryClient.invalidateQueries({
        queryKey: ['documentId']
      })
    }
	})

	const [title, setTitle] = useState(initialData.title || 'Untitle');
	const [isEditing, setIsEditing] = useState(false);

	const enableInput = () => {
		setTitle(initialData.title);
		setIsEditing(true);
		setTimeout(() => {
			inputRef.current?.focus();
			inputRef.current?.setSelectionRange(0, inputRef.current.value.length)	
		}, 0)
	}

	const disableInput = () => {
		setIsEditing(false);
	}

	const onChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setTitle(event.target.value);
		update({
			id: initialData.id,
			title: event.target.value || 'Untitle'
		});
	}

	const onKeyDown = (
		event: React.KeyboardEvent<HTMLInputElement>
	) => {
		if (event.key === "Enter") {
			disableInput();
		}
	}

  return (
		<div className="flex items-center gap-x-1">
			{!!initialData.icon && <p>{initialData.icon}</p>}
			{isEditing ? (
				<Input
					ref={inputRef}
					onClick={enableInput}
					onBlur={disableInput}
					onChange={onChange}
					onKeyDown={onKeyDown}
					value={title}
					className="h-7 px-2 focus-visible:ring-transparent"
				/>
			): (
				<Button
					onClick={enableInput}
					variant="ghost"
					size="sm"
					className="font-normal h-auto p-1"
				>
					<span className="truncate">
						{initialData?.title}
					</span>
				</Button>
			)}
		</div>
	);
};

Title.Skeleton = function TitleSkeleton() {
	return <Skeleton className="h-9 w-20 rounded-md" />
}