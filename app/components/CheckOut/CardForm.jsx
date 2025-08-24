import React from "react";
import { useForm } from "@tanstack/react-form";
import PlaceOrderBtn from "../bottons/PlaceOrderBtn";

function FieldInfo({ field }) {
  return (
    <>
      {field.state.meta.isTouched && field.state.meta.errors.length ? (
        <em>{field.state.meta.errors.join(",")}</em>
      ) : null}
      {field.state.meta.isValidating ? "Validating..." : null}
    </>
  );
}

export default function CardForm({active, Total}) {
  const form = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
    },
    onSubmit: async ({ value }) => {
      // Do something with form data
      console.log(value);
    },
  });

  return (
    <div className="grid grid-rows-6">
      <div className=" row-span-1">
      <h1>Pay securely using your credit card</h1>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
          
        }}
        className="flex flex-col space-y-6 row-span-5 gap-2"
      >
        <div className="flex flex-col space-y-4">
          {/* A type-safe field component*/}
          <form.Field
            name="cardnumber"
            validators={{
              onChange: ({ value }) =>
                !value
                  ? "A card number is required"
                  : value.length < 3
                  ? "First name must be at least 3 characters"
                  : undefined,
              onChangeAsyncDebounceMs: 500,
              onChangeAsync: async ({ value }) => {
                await new Promise((resolve) => setTimeout(resolve, 1000));
                return (
                  value.includes("error") && 'No "error" allowed in first name'
                );
              },
            }}
            // eslint-disable-next-line react/no-children-prop
            children={(field) => {
              // Avoid hasty abstractions. Render props are great!
              return (
                <div className="flex flex-col space-y-1">
                  <label className=" text-sm" htmlFor={field.name}>Card number</label>
                  <input
                    id={field.name}
                    name={field.name}
                    inputMode="numeric"
                    type="text"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    disabled={active}
                    className=" input-sm bg-schemes-light-surface border-2 rounded-sm"

                  />
                  <FieldInfo field={field} />
                </div>
              );
            }}
          />
          <form.Field
            name="cardname"
            validators={{
              onChange: ({ value }) =>
                !value
                  ? "A card number is required"
                  : value.length < 3
                  ? "First name must be at least 3 characters"
                  : undefined,
              onChangeAsyncDebounceMs: 500,
              onChangeAsync: async ({ value }) => {
                await new Promise((resolve) => setTimeout(resolve, 1000));
                return (
                  value.includes("error") && 'No "error" allowed in first name'
                );
              },
            }}
            // eslint-disable-next-line react/no-children-prop
            children={(field) => {
              // Avoid hasty abstractions. Render props are great!
              return (
                <div className="flex flex-col space-y-1">
                  <label className=" text-sm" htmlFor={field.name}>Name on card</label>
                  <input
                    id={field.name}
                    name={field.name}
                    inputMode="text"
                    type="text"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    disabled={active}
                    className=" input-sm bg-schemes-light-surface border-2 rounded-sm"

                  />
                  <FieldInfo field={field} />
                </div>
              );
            }}
          />
        </div>
        <div className="grid grid-cols-4 gap-4 items-center">
        <div className="col-span-2">
          <form.Field
            name="expiration"
            // eslint-disable-next-line react/no-children-prop
            children={(field) => (
              <div className="flex flex-col space-y-1">
                <label className="text-sm" htmlFor={field.name}>Expiry date </label>
                <input
                  id={field.name}
                  name={field.name}
                  type={'number'}
                  placeholder="MM/YY"
                  inputMode="numeric"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className=" input-sm bg-schemes-light-surface border-2 rounded-sm"

                />
                <FieldInfo field={field} />
              </div>
            )}
          />
        </div>
        <div className=" col-span-2">
          {/* A type-safe field component*/}
          <form.Field
            name="cardsecurity"
            validators={{
              onChange: ({ value }) =>
                !value
                  ? "A security value must be provided"
                  : value.length === 3
                  ? "security code must be at least 3 characters"
                  : undefined,
              onChangeAsyncDebounceMs: 500,
              onChangeAsync: async ({ value }) => {
                await new Promise((resolve) => setTimeout(resolve, 1000));
                return (
                  value.includes("error") && 'No "error" allowed in first name'
                );
              },
            }}
            // eslint-disable-next-line react/no-children-prop
            children={(field) => {
              // Avoid hasty abstractions. Render props are great!
              return (
                <div className="flex flex-col space-y-1">
                  <label className="text-sm " htmlFor={field.name}>Security code</label>
                  <input
                    id={field.name}
                    name={field.name}
                    type="number"
                    inputMode="numeric"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    disabled={active}
                    className=" input-sm bg-schemes-light-surface border-2 rounded-sm"
                  />
                  <FieldInfo field={field} />
                </div>
              );
            }}
          />
        </div>
        </div>
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          // eslint-disable-next-line react/no-children-prop
          children={([canSubmit, isSubmitting]) => (
            <>
              {/* <button type="submit" disabled={!canSubmit}>
                {isSubmitting ? "..." : "Submit"}
              </button> */}
              <PlaceOrderBtn Total = {Total} disabled= {!canSubmit} isSubmitting = {isSubmitting}/>
              {/* <button type="reset" onClick={() => form.reset()}>
                Reset
              </button> */}
            </>
          )}
        />
      </form>
    </div>
  );
}
