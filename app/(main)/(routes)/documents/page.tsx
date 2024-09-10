"use client";

import React from 'react';
import Image from 'next/image';
import { useUser } from '@clerk/nextjs';
import { PlusCircle } from 'lucide-react';
import { toast } from 'sonner';
import { CreateNewDocument } from '@/services/api/document';
import { Button } from '@/components/ui/button';

interface UseUserT {
  isLoaded: boolean;
  isSignedIn: boolean;
  user: { id: string; firstName: string };
}

function DocumentPage() {
  const { user } = useUser() as UseUserT;

  async function FetchApiDocument() {
    try {
      let promise = CreateNewDocument({
        title: 'Untitled',
      });

      toast.promise(promise, {
        loading: 'Creating a new note...',
        success: 'New note created!',
        error: 'Failed to create a new note.',
      });

      let result = await promise;

      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }

  const onCreate = () => {
    FetchApiDocument();
  };

  return (
    <div className="flex h-full flex-col items-center justify-center space-y-4">
      <Image src="/empty.png" height={300} width={300} alt="Empty" className="dark:hidden" />
      <Image
        src="/empty-dark.png"
        height={300}
        width={300}
        alt="Empty"
        className="hidden dark:block"
      />
      <h2 className="text-lg font-medium">Welcome to {user?.firstName}&apos;s Standard Notion</h2>
      <Button onClick={onCreate}>
        <PlusCircle className="mr-2 h-4 w-4" />
        Create a note
      </Button>
    </div>
  );
}

export default DocumentPage;
