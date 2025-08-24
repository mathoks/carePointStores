 "use client";
// import {
//   QueryClient,
//   QueryClientProvider,
// } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
// import { useState } from "react";
// export const ReactQueryClientProvider = ({ children }) => {
//   const [queryClient] = useState(
//     () =>
//       new QueryClient({
//         defaultOptions: {
//           queries: {
//             staleTime: 60 * 1000,
//           },
//         },
//       })
//   );
//   return (
//     <QueryClientProvider client={queryClient}>{children}<ReactQueryDevtools/></QueryClientProvider>
//   );
// };

import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { getQueryClient } from "./getQueryClient";

export const ReactQueryClientProvider = ({ children }) => {
  const queryClient = getQueryClient()
  return (
    <QueryClientProvider client={queryClient}>{children}

    {/* <ReactQueryDevtools/> */}
    </QueryClientProvider>
  );
};
