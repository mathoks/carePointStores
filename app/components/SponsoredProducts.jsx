import React from "react";

const SponsoredProducts = () => {
  const List = [
    "https://healthplusnigeria.com/cdn/shop/files/imz9yocdw1caxmvwfpmt.webp?v=1726896807",
    "https://m.media-amazon.com/images/I/61mpEXbBXoL._AC_UF1000,1000_QL80_.jpg",
    "https://healthplusnigeria.com/cdn/shop/files/imz9yocdw1caxmvwfpmt.webp?v=1726896807",
    "https://m.media-amazon.com/images/I/61mpEXbBXoL._AC_UF1000,1000_QL80_.jpg",
    "https://healthplusnigeria.com/cdn/shop/files/imz9yocdw1caxmvwfpmt.webp?v=1726896807"
  ];
  return (
    <div className=" bg-slate-100  carousel inline-flex items-center  w-[calc(100vw-32px)] md:w-[calc(100%-4px)] gap-2">
      {List.map((image, i) => (
        <div
          key={i}
          className=" w-40 h-fit bg-white min-w-40 my-2  flex flex-col space-y-2"
        >
          <div>
            <img src={image} />
          </div>
          <div className="text-slate-950 ">
            <span className=" line-clamp-1 text-sm">
              Vitamin C 1000mg gggggggggggggggggggggggggggggg
            </span>
            <br></br>
            <span className="text-xl font-medium"># 400</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SponsoredProducts;
