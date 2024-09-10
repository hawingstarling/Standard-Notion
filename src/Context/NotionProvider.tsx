import { ReactNode } from "react";
import { ClerkProvider } from "@clerk/nextjs";

export const NotionProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!}
    >
        {children}
    </ClerkProvider>
  );
};