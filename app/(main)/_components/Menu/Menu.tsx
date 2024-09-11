'use client';

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator
} from "@/components/ui/dropdown-menu"
import { Skeleton } from "@/components/ui/skeleton";
import { Archive } from "@/services/api/document";
import { useUser } from "@clerk/clerk-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MoreHorizontal, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface MenuProps {
  documentId: string;
}

export const Menu = ({ 
	documentId 
}: MenuProps) => {
	const router = useRouter();
	const { user } = useUser();
	const queryClient = useQueryClient();

	const { mutateAsync: archive } = useMutation({
		mutationFn: Archive,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['documents']
			})
		}
	})

	const onArchive = async () => {
		await toast.promise(
			archive(documentId),
			{
				loading: "Moving to trash...",
				success: "Note moved to trash!",
				error: "Failed to archive note."
			}
		)
		router.push("/documents")
	}

  return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					size="sm"
					variant="ghost"
				>
					<MoreHorizontal className="h-4 w-4" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				className="w-60"
				align="end"
				alignOffset={8}
				forceMount
			>
				<DropdownMenuItem onClick={onArchive}>
					<Trash className="h-4 w-4 mr-2" />
					Delete
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<div className="text-sm text-muted-foreground p-2">
					Last edited by: {user?.fullName}
				</div>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

Menu.Skeleton = function MenuSkeleton() {
	return (
		<Skeleton className="h-10 w-10" />
	)
}