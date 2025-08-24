import { useDispatch, useSelector, useStore } from "react-redux";
import {
  useQueryClient,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useSuspenseQuery,
  useSuspenseInfiniteQuery,
} from "@tanstack/react-query";
import {
  addToCart,
  Increament,
  setIsErrorMessage,
  setIsSuccessMessage,
  setIsCompletePrompt,
} from "./features/cart/cartSlice";
import { api } from "../utills/api";
import { deleteItemm, deleteItemms, SaveCart } from "../utills/utills";
import { resetBox, setCompleted } from "./features/Reviews/ReviewSlice";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes();
export const useAppSelector = useSelector.withTypes();
export const useAppStore = useStore.withTypes();

const base_api = process.env.API_URL;
const ReturnData = (data) => {
  return new Promise((resolved) => {
    setTimeout(() => {
      resolved(data);
    }, 2000);
  });
};
async function ReturnItem(params) {
  const result = await ReturnData(params);
  return result;
}
const fetchProjects = async ({ pageParam }) => {
  const response = await fetch(
    `http://localhost:3000/api/v1/products?skip=${0}${
      pageParam !== undefined ? `&cursor=${pageParam}` : ""
    }&take=${10}&sort=createdAt%20desc`,
    { "Access-Control-Allow-Origin": "http://localhost:3000/" }
  );
  return await response.json();
};

const fetchReviews = async ({ pageParam }) => {
  const response = await fetch(
    `http://localhost:3000/api/v1/products/${
      pageParam.prod_id
    }/getAllReviews?skip=${0}${
      pageParam?.nextCursor !== undefined
        ? `&cursor=${pageParam?.nextCursor}`
        : ""
    }&take=${10}&sort=createdAt%20desc&category_id=${pageParam.category_id}`,
    { "Access-Control-Allow-Origin": "http://localhost:3000/" }
  );
  return await response.json();
};

const fetchReviewsReaction = async () => {
  const response = await api.post(
    `http://localhost:3000/api/v1/products/${prod}/review-reactions?category_id=${0}&user_id=${10}`
  );
  return await response.json();
};

const addReviewReaction = async (
  reviewer_id,
  category_id,
  user_id,
  prod,
  innerText
) => {
  const response = await fetch(
    `http://localhost:3000/api/v1/products/${prod}/add-reaction`,
    {
      "Access-Control-Allow-Origin": "http://localhost:3000",
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        reation_type: innerText.toUpperCase(),
        category_id,
        user_id,
        reviewer_id,
      }),
    }
  );
  return await response.json();
};

const addReview = async (data) => {
  const { user, createdat, ...rest } = data;
  const response = await fetch(
    `http://localhost:3000/api/v1/products/${data?.prod_id}/add-reviews`,
    {
      "Access-Control-Allow-Origin": "http://localhost:3000",
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        rest,
        user_id: user.id,
      }),
    }
  );
  return await response.json();
};

const addAddress = async (data) => {
  const { user_id, country_code, mobile_number, ...rest } = data;
  const response = await api.post(`users/Add-Address/${user_id}`, {
    body: {
      ...rest,
      mobile_no: `${country_code}${mobile_number}`,
    },
  });
  return response.data;
};

const addPreference = async (data) => {
  const { user_id, country_code, mobile_number, ...rest } = data;
  const response = await api.post(`users/Add-Address/${user_id}`, {
    body: {
      ...rest,
      mobile_no: `${country_code}${mobile_number}`,
    },
  });
  return response.data;
};

const addCartItem = async (data) => {
  const { user, img, name, variant_name, ...rest } = data;
  console.log(rest)
  const response = await fetch(
    `http://localhost:3000/api/v1/cart/${rest.CartItemID}/update-cartItem`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        user: user, // Include user in headers
      },
      body: JSON.stringify(rest),
    }
  );

  return response.json();
};

const deleteCartItem = async (cartItemID, id) => {
  const response = await fetch(
    `http://localhost:3000/api/v1/cart/${cartItemID}/remove-cartItem`,
    {
      "Access-Control-Allow-Origin": "http://localhost:3000",
      method: "DELETE",

      headers: {
        "Content-Type": "application/json",
        user: id,
      },
    }
  );
  
  return await response.json();
};
const deleteReview = async (category_id, user_id, prod_id) => {
  const response = await fetch(
    `http://localhost:3000/api/v1/products/${prod_id}/remove-review?category_id=${category_id}&user_id=${user_id}`,
    {
      "Access-Control-Allow-Origin": "http://localhost:3000",
      method: "DELETE",

      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return await response.json();
};

const fetchProReviewsSumm = async (prod) => {
  const response = await fetch(
    `http://localhost:3000/api/v1/products/${prod}/review-summary`,
    { "Access-Control-Allow-Origin": "http://localhost:3001/" }
  );
  return await response.json();
};
const fetchReviewByUser = async (prod, category_id, user_id) => {
  const response = await fetch(
    `http://localhost:3000/api/v1/products/${prod}/user-review?category=${category_id}&user=${user_id}`,
    { "Access-Control-Allow-Origin": "http://localhost:3001/" }
  );

  return await response.json();
};

const fetchById = async (id) => {
  const response = await fetch(`${process.env.API_URL}/products/${id}`);
  const data = await response.json();
  return data;
};
export const useFetchQuery = (productOptions) => {
  console.log(productOptions);
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useSuspenseInfiniteQuery(productOptions);

  return {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  };
};

export const useFetchReviews = (category_id, prod_id) => {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["Allreviews", prod_id, category_id],
    queryFn: fetchReviews,
    initialPageParam: { nextCursor: undefined, category_id, prod_id },
    //  initialData: { pageParams: [{nextCursor : comments[comments?.length - 1]?.id , category_id, prod_id}],  pages: [comments]},
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.length > 0) {
        const id = lastPage[lastPage?.length - 1];
        const nextCursor = id?.id;
        return { nextCursor: nextCursor ?? undefined, category_id, prod_id };
      }

      return { nextCursor: undefined, category_id, prod_id };
    },
  });

  return {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  };
};

export const useFetchReview = (prod, category_id, user_id) => {
  const { data, error, isLoading } = useSuspenseQuery({
    queryKey: ["review", prod, category_id, user_id],
    queryFn: () => fetchReviewByUser(prod, category_id, user_id),
  });
  return { data, error, isLoading };
};

export const useFetchProdById = (prod) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["review", prod],
    queryFn: () => fetchById(prod),
  });
  return { data, error, isLoading };
};

export const useFetchProdReviewSumm = (prod) => {
  const { data, error, isLoading } = useSuspenseQuery({
    queryKey: ["reviews", prod],
    queryFn: () => fetchProReviewsSumm(prod),
    select: (data) => {
      return { ...data, average_rating: Number(data.average_rating) };
    },
  });
  return { data, error, isLoading };
};

export const useFetchReviewReaction = (review_id, category_id) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["reactions", review_id, category_id],
    queryFn: () => fetchReviewsReaction(review_id, category_id),
  });
  return { data, error, isLoading };
};

export const useAddReviewReaction = (prod, category_id, user_id) => {
  const queryClient = useQueryClient();
  const { data, isError, isPending, isSuccess, mutate } = useMutation({
    mutationFn: ({ innerText, review_id }) =>
      addReviewReaction(review_id, category_id, user_id, prod, innerText),
    onMutate: async ({ innerText, review_id }) => {
      await queryClient.cancelQueries({ queryKey: ["reaction", review_id] });
      const previous = await queryClient.getQueryData(["reaction", review_id]);
      queryClient.setQueryData(["reaction", review_id], (old) => {
        if (!!old.length) {
          if (innerText === "No") {
            const gg = old.find(({ reviewer_id }) => reviewer_id === review_id);
            gg?.reation_type !== "NO"
              ? (gg.reation_type = "NO")
              : (gg.reation_type = null);
            return [...old];
          } else {
            const gg = old.find(({ reviewer_id }) => reviewer_id === review_id);
            gg.reation_type !== "YES"
              ? (gg.reation_type = "YES")
              : (gg.reation_type = null);
            return [...old];
          }
        } else return;
      });

      return previous;
    },
    onError: (err, newEntry, context) => {
      queryClient.setQueryData(
        ["review", prod, category_id, user_id],
        context.previous
      );
    },
    onSettled: (data, err, newEntry) => {
      queryClient.invalidateQueries({
        queryKey: ["reaction", newEntry.review_id],
      });
    },
  });
  return { data, isError, mutate, isPending, isSuccess };
};

export const useDeletReview = (props) => {
  const queryClient = useQueryClient();
  const { data, isError, isPending, isSuccess, mutate } = useMutation({
    mutationFn: (id) =>
      deleteReview(props.category_id, props.user_id, props.prod_id),
    onMutate: async (id) => {
      await Promise.all([
        queryClient.cancelQueries({
          queryKey: ["review", props.prod_id, props.category_id, props.user_id],
        }),
        queryClient.cancelQueries({ queryKey: ["product", props.prod_id] }),
      ]);

      const previous = await queryClient.getQueryData([
        "product",
        props.prod_id,
      ]);
      queryClient.setQueryData(
        ["product", props.prod_id],
        ({ prod_reviews }) => {
          const filterdArray = prod_reviews.filter(
            (review) => review.id !== id
          );

          return {
            ...previous,
            prod_reviews: [...filterdArray],
          };
        }
      );

      return { ...previous };
    },
    onError: (err, newEntry, context) => {
      queryClient.setQueryData(
        ["review", props.prod_id, props.category_id, props.user_id],
        context.previous
      );
    },
    onSettled: async (data, err, newEntry, context) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["product", props.prod_id],
        }),
        queryClient.invalidateQueries({
          queryKey: ["reviews", props.prod_id],
        }),
        queryClient.invalidateQueries({
          queryKey: ["review", props.prod_id, props.category_id, props.user_id],
        }),
      ]);
    },
  });
  return { data, isError, mutate, isPending, isSuccess };
};

export const useAddReview = (prod, category_id, user_id) => {
  const queryClient = useQueryClient();
    const dispatch = useAppDispatch();
  const { data, isError, isPending, isSuccess, mutate } = useMutation({
    mutationFn: (data) => addReview(data),
    onMutate: async (newEntry) => {
      await queryClient.cancelQueries({
        queryKey: ["product", prod],
      });
      const previous = await queryClient.getQueryData(["product", prod]);

      queryClient.setQueryData(["product", prod], ({ prod_reviews }) => {
        if (!prod_reviews.length) {
          return {
            ...previous,
            prod_reviews: [newEntry],
          };
        } else
          return {
            ...previous,
            prod_reviews: [newEntry, ...prod_reviews],
          };
      });

      return { ...previous };
    },
    onError: (err, newEntry, context) => {
      dispatch(setIsSuccessMessage('an error occured'))
      queryClient.setQueryData(["product", prod], context.previous);
    },
     onSuccess: async () => {
      dispatch(setIsSuccessMessage("Thanks for your review"));
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["review", prod, category_id, user_id],
        }),
        queryClient.invalidateQueries({
          queryKey: ["reviews", prod],
        }),
      ]);
      document.getElementById("revForm").reset();
    },
    onSettled: async () => {
      dispatch(resetBox(true))
      dispatch(setCompleted(true))
    },
  });
  return {mutate, isPending};
};

export const useAddToCart = (id) => {
  console.log(id)
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  const { data, isError, isPending, isSuccess, mutate } = useMutation({
    mutationFn: ({ data, increamentData = {}, dualAction = false }) => {
      // console.log(id, data, "kkll", increamentData);
      if (increamentData?.operation === "add") {
        const newData = {
          ...data,
          // Quantity: newQuantity,
          TotalPrice: data.Price * data.Quantity,
        };

        if (id !== "guest") return addCartItem({ ...newData, user: id, operation: increamentData?.operation });
        return newData;
      }
      if (increamentData?.operation === "minus" && data?.Quantity > 1) {
        const newData = {
          ...data,
          // Quantity: newQuantity,
          TotalPrice: data.Price * data.Quantity,
        };

        if (id !== "guest") return addCartItem({ ...newData, user: id, operation: increamentData?.operation  });
        return newData;
      } else if (
        increamentData?.operation === "minus" &&
        data?.Quantity === 0
      ) {
         if (id !== "guest") return deleteCartItem(data?.CartItemID, id);
        return data?.CartItemID;
      } else if (increamentData?.delete) {
        console.log(data, id, "delete");
        if (id !== "guest") return deleteCartItem(data?.CartItemID, id);
        return data;
      } else {
        if (id !== "guest") return addCartItem({ ...data, user: id , operation: increamentData?.operation });
        return data;
      }
    },

    onMutate: async ({ data }) => {
      console.log(data)
      // 1. Cancel any outgoing queries for the same key to prevent race conditions.
      await queryClient.cancelQueries({ queryKey: ["cart"] });

      // 2. Snapshot the previous data for rollback in case of an error.
      const previousData = queryClient.getQueryData(["cart"]);
      console.log(previousData)
      // 3. Optimistically update the cart data in the cache.
      queryClient.setQueryData(["cart"], (oldCart) => {
        // Check if oldCart exists to prevent errors.
        if (!oldCart) {
          return { cart_item: [data] };
        }

        const { cart_item } = oldCart;

        let updatedCartItems;

        // Check if the item already exists in the cart.
        const itemExists =
          typeof data !== "string"
            ? cart_item.some((item) => item.CartItemID === data.CartItemID)
            : cart_item.some((item) => item.CartItemID === data);

        if (itemExists && typeof data !== "string") {
          // Update the quantity of the existing item.
          updatedCartItems = cart_item.map((item) =>
            item.CartItemID === data.CartItemID
              ? { ...item, Quantity: data.Quantity }
              : item
          );
        }
        // Add the new item to the cart.
        else
          updatedCartItems =
            typeof data !== "string" ? [...cart_item, data] : [...cart_item];

        // Filter out items with a quantity of 0.
        const filteredCartItems =
          typeof data !== "string"
            ? updatedCartItems.filter((item) => item.Quantity > 0)
            : updatedCartItems.filter((item) => item.CartItemID !== data);

        return {
          ...oldCart,
          cart_item: filteredCartItems,
        };
      });

      // 4. Return the previous data in a context object for the onError function.
      return { previousData };
    },
    onError: async (err, _, context) => {
      console.log(context, err);
      queryClient.setQueryData(['cart'], context.previousData);
      return dispatch(setIsErrorMessage("An error occurred"));
    },
    onSuccess: (dat, variables, context) => {
      const { increamentData } = variables;
      (!id || id === "guest") && SaveCart(queryClient.getQueryData(["cart"]));
      if (dat?.Quantity === 1) {
        dispatch(setIsSuccessMessage("item added successfully"));
      } else if (dat?.Quantity === 0) {
        dispatch(setIsSuccessMessage("item removed successfully"));
      } else if (!!increamentData.delete) {
        dispatch(setIsCompletePrompt("yes"));
      } else {
        dispatch(setIsSuccessMessage("item updated successfully"));
      }
        id !== "guest" && queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  return { data, isError, mutate, isPending, isSuccess };
};

export const useAddress = (user_id) => {
  const { data, isError, isPending, isSuccess, mutate } = useMutation({
    mutationFn: (data) => addAddress({ ...data, user_id: user_id }),
  });
  return { data, isError, mutate, isPending, isSuccess };
};
