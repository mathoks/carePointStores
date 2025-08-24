export const createLink = (formData, tag) => {
    let links = [];
    formData.forEach((value, key) => {
      if (key === "link") {
        links.push(value);
      }
    });
    if(links.length === 0) return null;
    return links;
  };

  export const createArray = (formData, tag) => {
    let links = [];
    formData.forEach((value, key) => {
      if (key === tag) {
        links.push(value);
      }
    });
    if(links.length === 0) return [];
    return links;
  };

  export const createProductIds = (formData) => {
    let links = [];
    formData.forEach((value, key) => {
      if (key === "productId") {
        links.push(value);
      }
    });
    if(links.length === 0) return null;
    return links;
  };