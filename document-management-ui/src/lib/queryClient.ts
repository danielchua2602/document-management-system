import { QueryClient, isServer } from "@tanstack/react-query";

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  });
}

let browserQueryClient: QueryClient | null = null;

export function getQueryClient() {
  if (isServer) {
    // Make a new QueryClient for each server request
    return makeQueryClient();
  }

  // Reuse the same QueryClient on the client side
  if (!browserQueryClient) {
    browserQueryClient = makeQueryClient();
  }

  return browserQueryClient;
}
