import { QueryClient, queryOptions } from "@tanstack/react-query";

const queryClient = new QueryClient()
export const cartOptions = (id, filter = false) => {
    const shouldFetch = (!!id && id !== 'guest') ? true : false
  return queryOptions({
    queryKey: ["cart"],
    queryFn: async () => {
      
      const response = await fetch(
        `http://localhost:3000/api/v1/cart/${id}/getCart`, { headers: { 'user' : id} }
      );
      return response.json()
    },
    
    enabled: shouldFetch,
    // refetchOnReconnect: shouldFetch,
    // refetchOnMount: shouldFetch,
    // refetchOnWindowFocus:shouldFetch,
    select: (data)=>{
        if(!filter){
            return data.cart_item 
      }  
        return data
    },
  });
};

export const SuspensecartOptions = (id, filter = false) => {
    const shouldFetch =  (id && id !== 'guest') ? true : false
  return queryOptions({
    queryKey: ["cart"],
    queryFn: async () => {
      const response = await fetch(
        `http://localhost:3000/api/v1/cart/${id}/getCart`, { headers: { 'user' : id} }
      );
      return response.json()
    },
    refetchOnReconnect: shouldFetch,
    refetchOnMount: shouldFetch,
    refetchOnWindowFocus:shouldFetch,
    select: (data)=>{
        if(!filter){
            return data.cart_item 
      }  
        return data
    },
  });
};

export const AddCart = (id) => {
  return queryOptions({
    queryKey: ["cartItem", id],
    queryFn: async () => {
      const response = await fetch(
        `http://localhost:3000/api/v1/products/${id}/add-cartItem`,
        { "Access-Control-Allow-Origin": "http://localhost:3001/", headers: { 'user' : id}, 
        body: JSON.stringify({
        reation_type: innerText.toUpperCase(),
        category_id,
        user_id,
        reviewer_id,
      }),}
      );
      return response.json();
    },
  });
};


export const MergeCart = (id, cart_items = []) => {
  return queryOptions({
    queryKey: ["cart"],
    queryFn: async () => {
      const response = await fetch(
        `http://localhost:3000/api/v1/cart/merge-cartItem`,
        {
          "Access-Control-Allow-Origin": "http://localhost:3001/",
          headers: { "Content-Type": "application/json", user: id },
          method: "PATCH",
          body: JSON.stringify({ cart_items }),
        }
      );
      return response.json();
    },
  });
};

export const AllproductOptions = ({pageParam}) => {
    return queryOptions({
      queryKey: ['products'],
      queryFn: async () => {
        const response = await fetch(
            `http://localhost:3000/api/v1/products?skip=${0}${
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

  export const UpdateCart = ({pageParam}) => {
    return queryOptions({
      queryKey: ['cartitems'],
      queryFn: async () => {
        const response = await fetch(
            `http://localhost:3000/api/v1/products?skip=${0}${
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