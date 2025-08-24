import { queryOptions, keepPreviousData} from "@tanstack/react-query";

export const productOptions = (id) => {
  return queryOptions({
    queryKey: ["product", id],
    queryFn: async () => {
      const response = await fetch(
        `http://localhost:3000/api/v1/products/${id}`
      );
      return response.json();
    },
  });
};

export const productFYIOptions = (category) => {
  return queryOptions({
    queryKey: ["category", category],
    queryFn: async () => {
      const response = await fetch(
        `http://localhost:3000/api/v1/products/hints/${category}`
      );
      return response.json();
    },
    enabled: false,
  });
};

export const trendingproductOptions = (category) => {
  return queryOptions({
    queryKey: ["trendingproduct", category],
    queryFn: async () => {
      const response = await fetch(
        `http://localhost:3000/api/v1/products/trending/${category}`
      );
      return response.json();
    },
  });
};

export const ratingsSummaryOptions = (id) => {
  return queryOptions({
    queryKey: ["reviews", id],
    queryFn: async () => {
      const response = await fetch(
        `http://localhost:3000/api/v1/products/${id}/review-summary`,
        { "Access-Control-Allow-Origin": "http://localhost:3001/" }
      );
      return response.json();
    },
  });
};

export const AllproductOptions = ({query}) => {
 
    return queryOptions({
      queryKey: ['products', query],
      queryFn: async (p) => {
      
        const response = await fetch(
            // `http://localhost:3000/api/v1/products?skip=${1}${
            // `&cursor=${p.pageParam}`
            // }&take=${4}&sort=createdAt%20desc`,
             `http://localhost:3000/api/v1/products?skip=${1}&cursor=${p.pageParam}&filter=${query}
            &take=${4}&sort=createdAt%20desc`,
            { "Access-Control-Allow-Origin": "http://localhost:3000/" }
          );
          return await response.json();
      },
      initialPageParam: '',
    getNextPageParam: (lastPage, pages) => {
      const nextCursor = lastPage[lastPage?.length - 1]?.id;
     
      return nextCursor ?? undefined;
    },
    maxPages: 10,
    placeholderData: keepPreviousData
    });
  };

  export const SearchOptions = ({query, pageParam}) => {
    return queryOptions({
      queryKey: ['search', query, pageParam],
      queryFn: async () => {
        const response = await fetch(
            `http://localhost:3000/api/v1/products/search?search=${query}&skip=${0}&${
              pageParam !== undefined ? `&cursor=${pageParam}` : ""
            }&take=${10}&sort=createdAt%20desc`,
            { "Access-Control-Allow-Origin": "http://localhost:3000/" }
          );
          return await response.json();
      },
      initialPageParam: undefined,
    getNextPageParam: (lastPage, pages) => {
      const nextCursor = lastPage[lastPage?.length - 1]?.id;
      return nextCursor ?? undefined;
    },
    maxPages: 10,
    });
  };