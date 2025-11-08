import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import DocumentPageClient from "./DocumentPageClient";
import { DocumentApi } from "@/api/DocumentsApi";
import { getQueryClient } from "@/lib/queryClient";

const { fetchDocuments } = DocumentApi();

export default async function DocumentsPage() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["documents"],
    queryFn: () => fetchDocuments({}),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DocumentPageClient />
    </HydrationBoundary>
  );
}
