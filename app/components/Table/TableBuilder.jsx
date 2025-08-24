import React from "react";

const TableBuilder = ({ categoryId, id }) => {
  return (
    <div className=" space-y-2 ">
      <div className="border-2 border-schemes-light-outline">
        <div className=" border-b-8 border-schemes-light-outline">
          <h1 className=" font-bold text-lg">Supplement Facts</h1>
          <h2>Serving Size {1} Tablet </h2>
        </div>
        <table className='table shrink table-fixed'>
          <caption>Council budget (in £) 2018</caption>
          <thead className="border-b-4 border-schemes-light-outline  ">
            <tr>
              <th className="border-b border-schemes-light-outline text-schemes-light-onPrimaryContainer text-sm font-bold"></th>
              <th className="border-b border-schemes-light-outline text-schemes-light-onPrimaryContainer text-sm font-bold items-center">
                <span>Amount</span>
                <span>Per Serving</span>
              </th>
              <th className="border-b items-center border-schemes-light-outline text-schemes-light-onPrimaryContainer text-sm font-bold">
                <span>% Daily</span>
                <span>Value</span>
              </th>
            </tr>
          </thead>
          <tbody className=" border-b-8 border-schemes-light-outline">
            <tr className="">
              <td>Vitamin C (as Ascorbic acid)</td>
              <td>1 g (1,000mg)</td>
              <td>1111%</td>
            </tr>
            <tr>
              <td>Rose Hips Powder (Rosa canina) (Fruit)</td>
              <td>25mg</td>
              <td>&#10013;</td>
            </tr>
            <tr>
              <td className="">Citrus Bioflavonoid Complex</td>
              <td className=" justify-center">25mg</td>
              <td>&#10013;</td>
            </tr>
          </tbody>
          <tfoot className=" text-nowrap">
            <tr>
              <td>&#10013; Daily Value not established</td>
            </tr>
          </tfoot>
        </table>
      </div>
      <p>Other ingredients: not listed....</p>
    </div>
  );
};

export default TableBuilder;
