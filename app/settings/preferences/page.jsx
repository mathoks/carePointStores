'use client'
import { ProductList } from "@/app/utills/utills";
import { useForm } from "@tanstack/react-form";
import React, { useEffect, useState } from "react";

const Page = () => {
  
  const [default_, setDefault] = useState({});  
  useEffect(()=>{
    const options = ['Minerals', 'Vitamins']
    const newObj = {}
    options.forEach(option => {newObj[option] = true})
    setDefault({...newObj});
  }, [])

  const form = useForm({
    defaultValues: default_,
    onSubmit: async ({ value }) => {
        console.log(value)
    //     try {
    //         mutate(value)
    //         if(isSuccess){
    //           console.log("Success")
    //           form.reset()
    //         }
    //       } catch (error) {
    //         if(isError && error.message){
    //           console.log("Error: " + error.message)
    //         }
    //       }
    //       finally{
    //         console.log("Completed")
    //       }
    //       console.log(value); 
     },
  });

  const Field = ({props}) => (
    <form.Field
      name={props}
      // eslint-disable-next-line react/no-children-prop
      children={(field) => {
        // Avoid hasty abstractions. Render props are great!
        return (
          <div className="flex  items-center justify-between  bg-white ">
            <label
              className=""
              htmlFor={field.name}
            >{props}</label>
            <input
              id={field.name}
              name={field.name}
              type="checkbox"
              checked={field.state.value}
              onBlur={field.handleBlur}
              readOnly={true}
              onChange={(e) => field.handleChange(e.target.checked)}
              className="font-semibold   border-2 rounded-sm bg-white btn-sm  focus:outline-none "
            />
          </div>
        );
      }}
    />
  );
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className="px-4 mt-8 space-y-4"
    >
    <legend>Select your prefered categories</legend>
    {ProductList.map((category , id)=>
        <Field key={id} props={category}/>
    )}
      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
        // eslint-disable-next-line react/no-children-prop
        children={([canSubmit, isSubmitting]) => (
          <div className="px-4 p-4 bg-white">
            <button
              className="w-full bg-schemes-light-surfaceTint text-schemes-light-onPrimary cursor-pointer py-2.5 btn"
              type="submit"
              disabled={!canSubmit}
            >
              {isSubmitting ? "..." : "Save"}
            </button>
          </div>
        )}
      />
    </form>
  );
};

export default Page;
