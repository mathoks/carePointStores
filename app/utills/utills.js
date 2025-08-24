import { nanoid } from "@reduxjs/toolkit";
import { array, date } from "joi";
import _ from "lodash";
import { addToCart } from "../lib/features/cart/cartSlice";
import Cookies from "js-cookie";
function deleteEntry(array, item) {
  const index = array.indexOf(item);
  if (index !== -1) {
    array.splice(index, 1);
    return array;
  } else return [...array, item];
}

const removeSpecialChar = (text) => {
  return _.replace(text, /[^\w\s]/g, "");
};
const deleteItemms = (array = [], id, dispatch) => {
  console.log(array, id, dispatch)
  const index = array.findIndex((item) => item.CartItemID === id);
  if (index !== -1) {
    array.splice(index, 1);
    dispatch(addToCart([...array]))
    return [...array];
  }
};

const deleteItemm = (array = [], id, dispatch) => {
  console.log(array, id, dispatch)
  const index = array.findIndex((item) => item.CartItemID === id );
  if (index !== -1) {
    array.splice(index, 1);
    //  dispatch(addToCart([...array]))
    return [...array];
  }
};

const createItems = (object = {}, hasVariant) => {
  let NewItem = {};
 
  if (hasVariant) {
    
    NewItem = {
      Quantity: object.order_qt,
      CartItemID: nanoid(8),
      variant_id: object.id,
      TotalPrice: object.price * 1,
      stockQuantity: object.stock_qt,
      Price: object.price,
      productID: object.product_id,
      name: object?.name,
      variant_name: object.variant_name,
      img: object?.img,
      ProductID: null,
      isVariant: "true",
    };
  } else {

    NewItem = {
      CartItemID: nanoid(8),
      Quantity: object.order_qt,
      ProductID: object.id,
      TotalPrice: object.price * 1,
      isVariant: "false",
      stockQuantity: object.stockQt,
      Price: object.price,
      variant_id: null,
      name: object.name,
      img: object?.prodimage[0]?.image,
    };
  }
  return { ...NewItem };
};

const createItem = (object = {}, hasVariant) => {
  let NewItem = {};
  
  NewItem = {
    Quantity: object.order_qt,
    CartItemID: nanoid(8),
    variant_id: object.id ?? null,
    TotalPrice: object.price * 1,
    stockQuantity: object.stock_qt ?? object.stockQt,
    Price: object.price,
    ProductID: object.product_id,
    name: object?.name,
    variant_name: object.variant_name ?? null,
    img: object?.img ?? null,
    isVariant: hasVariant,
  };
  return { ...NewItem };
};

const Summarize = (items = []) => {
  const groupedProduct = new Map();
  for (const item of items) {
    const { ProductID, isVariant, variant_id } = item;
    if (!groupedProduct.has(ProductID)) {
      if (variant_id) {
        const newProduct = {
          ProductID: ProductID,
          name: item?.name ?? item?.product?.name,
          variant: [],
        };
        groupedProduct.set(ProductID, newProduct);
      } else groupedProduct.set(ProductID, { ...item, variant: null });
    }
    groupedProduct.get(ProductID).variant?.push(item);
    
  }
  console.log(Array.from(groupedProduct.values()))
  return Array.from(groupedProduct.values());
};


const sortByVariantName = (items = []) => {
  return [...items].sort((a, b) => {
    const nameA = a?.ProductID.toLowerCase() 
    const nameB = b?.ProductID.toLowerCase()
    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    return 0;
  });
};

const SaveCart = (cart) => {
   const {cart_item = []} = cart;
  if (!!cart_item.length) {
    localStorage.setItem("cart", JSON.stringify(cart_item));
  } else {
    localStorage.removeItem("cart");
  }
};

const GetCartFromLocals = () => {
const cart_items = localStorage.getItem('cart')
if(!!cart_items){
  const parsedItems = JSON.parse(cart_items)
if (parsedItems && !!parsedItems?.length){
  const SaveToCookie = Cookies.set('cart', cart_items , {expires: 1, path: '/api/auth/'});
  return SaveToCookie;
} else return []
}
return []
};

const GetCartFromLocal = () => {
  const cart_items_string = localStorage.getItem('cart');
  if (cart_items_string) {
    try {
      const parsedItems = JSON.parse(cart_items_string);
      if (Array.isArray(parsedItems) && parsedItems.length > 0) {
        // Create a new array, filtering out the 'name' property from each object.
        const itemsWithoutName = parsedItems.map(item => {
          // Use object destructuring to omit the 'name' property
          const { name, img, variant_name, ...restOfItem } = item;
          return restOfItem;
        });
        
        // Stringify the new array before storing it in the cookie.
        const cookieValue = JSON.stringify(itemsWithoutName);
        const SaveToCookie = Cookies.set('cart', cookieValue, {expires: 1, path: '/api/auth/'});
        
        return SaveToCookie;
      }
    } catch (error) {
      console.error("Error parsing or processing cart data from localStorage:", error);
    }
  }
  return [];
};

const ProductList = [
  "All-categories",
  "Vitamins",
  "Weight-gainers",
  "Laxatives",
  "Suppliments",
  "Muscle-build",
  "Minerals",
  "Amino-acids",
  "Probiotics",
  "Enzymes",
  "Herbs and Biotanicals",
  "Fatty-Acids",
  "Blood-Tonics",
];
export {
  deleteEntry,
  ProductList,
  Summarize,
  removeSpecialChar,
  deleteItemm,
  deleteItemms,
  createItem,
  sortByVariantName,
  SaveCart,
  GetCartFromLocal
};
