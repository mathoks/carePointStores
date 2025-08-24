'use server'
export const addReviewReactions = async (review_id, category_id, user_id, prod ) => {
    const response = await fetch(
      `http://localhost:3000/api/v1/products/${prod}/add-reaction`,
      {
        "Access-Control-Allow-Origin": "http://localhost:3000",
        method: "POST",
  
        "Content-Type": "application/json",
  
        body: JSON.stringify({
          count: 'YES',
          category_id,
          user_id,
          review_id
        }),
      }
    );
    return await response.json();
  };