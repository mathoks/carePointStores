import { api } from "@/app/utills/api"; // If you're using Axios elsewhere, keep this import
import { queryOptions } from "@tanstack/react-query";

export const userPrefOptions = (id) => {
  console.log(id)
  return queryOptions({
    queryKey: ["preference", id],
    queryFn: async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/v1/users/profile/${id}/preference`
        );

        if (!response.ok) { // Check for HTTP errors (4xx or 5xx)
          const errorText = await response.text(); // Get error message from server (if available)
          throw new Error(`HTTP error ${response.status}: ${errorText || response.statusText}`);
        }

        const data = await response.json(); // Parse JSON from the response body
        
        return data; // Return the parsed JSON data

      } catch (error) {
        console.error("Error fetching data:", error);
        throw error; // Re-throw the error so React Query can handle it
      }
    },
    select: (data) => {
        console.log(data)
        return data
    }
  });
};