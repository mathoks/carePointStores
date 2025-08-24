"use client";
import React, { useEffect } from "react";
import { useForm } from "@tanstack/react-form";
import { useAppSelector, useAppDispatch, useAddress } from "@/app/lib/hooks";
import CountryModal from "../settings/modals/CountryModal";
import { Country, CountryFlagDisplay } from "@/app/util/StatesLga";
import { setActive } from "@/app/lib/features/settings/ShippingSlice";
import CheveronLeft from "@/public/icons/CheveronLeft";
import { removeSpecialChar } from "@/app/utills/utills";

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

export default function AddressForm({id}) {
  const {isError, mutate, isSuccess, isPending} = useAddress(id)
  const { index, stateIndex, lgaIndex } = useAppSelector(
    (state) => state.shipping
  );
  const dispatch = useAppDispatch();
  const form = useForm({
    defaultValues: {
      country: "",
      street: "",
      contact_name: "",
      country_code: "",
      mobile_number: "",
      suite_no: "",
      zip_code: "",
      state: "",
      is_default: false,
      lga: "",
    },

    onSubmit: async ({ value }) => {
      // Do something with form data
      try {
        mutate(value)
        if(isSuccess){
          console.log("Success")
          form.reset()
        }
      } catch (error) {
        if(isError && error.message){
          console.log("Error: " + error.message)
        }
      }
      finally{
        console.log("Completed")
      }
      console.log(value);
    },
  });

  useEffect(() => {
    const stateDiv = document.getElementById("state");
    const lgaDiv = document.getElementById("lga");
    form.setFieldValue("country", Country[index].name),
      form.setFieldValue("country_code", Country[index]?.code.trim());
    form.setFieldValue("state", Country[index].state[stateIndex].name),
      form.setFieldValue(
        "lga",
        Country[index].state[stateIndex].LGAs[lgaIndex]
      );
    stateDiv.nextSibling.innerText = Country[index].state[stateIndex].name;
    lgaDiv.nextSibling.innerText =
      Country[index]?.state[stateIndex].LGAs[lgaIndex];
  }, [index, stateIndex, lgaIndex]);

  return (
    <div className="grid grid-rows-6 mx-auto md:mt-16   md:max-w-[50%] md:place-items-center     ">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="flex flex-col row-span-full gap-2"
      >
        <div className="flex flex-col space-y-4 bg-white p-4 shadow-sm">
          {/* A type-safe field component*/}
          <form.Field
            name="country"
            // eslint-disable-next-line react/no-children-prop
            children={(field) => {
              // Avoid hasty abstractions. Render props are great!
              return (
                <div className="flex flex-col space-y-4  bg-white">
                  <p className=" font-semibold">Country/region </p>
                  <label
                    className="relative grid grid-flow-row h-9 shadow-sm rounded-sm border-2"
                    htmlFor={field.name}
                  >
                    <input
                      id={field.name}
                      name={field.name}
                      inputMode="numeric"
                      autoComplete="country-name"
                      type="text"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      readOnly={true}
                      onClick={() => {
                        dispatch(setActive(field.name));
                        document.getElementById("my_modal_5").showModal();
                      }}
                      onChange={(e) => null}
                      className="font-semibold   border-2 rounded-sm pl-8 z-0 bg-white btn-sm  focus:outline-none sr-only"
                    />
                    <div className="absolute top-[0.2rem] inset-x-2">
                      <CountryFlagDisplay
                        countryCode={Country[index].logo}
                        countryName={Country[index].name}
                        show={true}
                      />
                    </div>
                    <span className="absolute top-[0.18rem] right-2 text-gray-400  text-base  ">
                      <CheveronLeft />
                    </span>
                  </label>
                  <span className=" text-schemes-light-error">
                    <FieldInfo field={field} />
                  </span>
                </div>
              );
            }}
          />
        </div>
        <div className="grid grid-cols-4 gap-4 items-start  bg-white p-4 shadow-sm">
          <label className=" text-nowrap font-semibold ">
            Contact Information
          </label>
          <form.Field
            name="contact_name"
            validators={{
              onChange: ({ value }) =>
                !value
                  ? "Please enter a contact name"
                  : value.length < 3
                  ? "contact name must be at least 3 characters"
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
                <div className="flex flex-col space-y-1 col-span-4">
                  <label className=" text-sm" htmlFor={field.name}></label>
                  <input
                    autoComplete="name"
                    id={field.name}
                    name={field.name}
                    placeholder="Contact name*"
                    inputMode="text"
                    type="text"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) =>
                      field.handleChange(removeSpecialChar(e.target.value))
                    }
                    className="font-semibold input-sm bg-white border-2 rounded-sm shadow-sm"
                  />

                  <span className=" text-schemes-light-error">
                    <FieldInfo field={field} />
                  </span>
                </div>
              );
            }}
          />
          <div className="col-span-1">
            <form.Field
              validators={{
                onChange: ({ value }) => {
                  const digitsOnly = value.slice(1).replace(/\D/g, "");
                  return !value
                    ? "Enter country code"
                    : !value.startsWith("+")
                    ? "number must start with a + sign"
                    : digitsOnly.length === 0
                    ? "Non digit characters are not allowed"
                    : !(digitsOnly.length >= 1 && digitsOnly.length <= 3)
                    ? "Must have at least 1  to 3 digits"
                    : undefined;
                },
                onChangeAsyncDebounceMs: 500,
                onChangeAsync: async ({ value }) => {
                  await new Promise((resolve) => setTimeout(resolve, 1000));
                  return (
                    value.includes("error") &&
                    'No "error" allowed in first name'
                  );
                },
              }}
              name="country_code"
              // eslint-disable-next-line react/no-children-prop
              children={(field) => (
                <div className="flex flex-col space-y-1">
                  <label className="text-sm" htmlFor={field.name}>
                    {" "}
                  </label>
                  <input
                    id={field.name}
                    name={field.name}
                    autoComplete="home tel-country-code"
                    type={"text"}
                    placeholder="+234"
                    inputMode="numeric"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) =>
                      field.handleChange(removeSpecialChar(e.target.value))
                    }
                    className="font-semibold input-sm bg-white border-2 rounded-sm shadow-sm"
                  />
                  <span className=" text-schemes-light-error">
                    <FieldInfo field={field} />
                  </span>
                </div>
              )}
            />
          </div>
          <div className=" col-span-3">
            {/* A type-safe field component*/}
            <form.Field
              name="mobile_number"
              validators={{
                onChange: ({ value }) =>
                  !value
                    ? "Please enter 10-11 digits"
                    : value.replace(/\D/g, "").length < 10 ||
                      value.replace(/\D/g, "").length > 11
                    ? "number must be at least 10-11 digits long"
                    : value.replace(/\D/g, "").length > 0 &&
                      value.replace(/\D/g, "")[0] === "0"
                    ? "First digit cannot be 0"
                    : undefined,
                onChangeAsyncDebounceMs: 500,
                onChangeAsync: async ({ value }) => {
                  await new Promise((resolve) => setTimeout(resolve, 1000));
                  return (
                    value.includes("error") &&
                    'No "error" allowed in first name'
                  );
                },
              }}
              // eslint-disable-next-line react/no-children-prop
              children={(field) => {
                // Avoid hasty abstractions. Render props are great!
                return (
                  <div className="flex flex-col space-y-1">
                    <label className="text-sm " htmlFor={field.name}></label>
                    <input
                      id={field.name}
                      name={field.name}
                      autoComplete="mobile tel"
                      type="number"
                      inputMode="numeric"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      placeholder=" Mobile number*"
                      onChange={(e) =>
                        field.handleChange(removeSpecialChar(e.target.value))
                      }
                      className=" font-semibold input-sm bg-white border-2 rounded-sm shadow-sm"
                    />
                    <span className=" text-schemes-light-error">
                      <FieldInfo field={field} />
                    </span>
                  </div>
                );
              }}
            />
          </div>
        </div>
        <div>
          <div className=" py-2 grid col-span-4 gap-4 px-4  bg-white shadow-sm">
            <p className=" font-semibold ">Address</p>
            <div className="flex flex-col space-y-4">
              {/* A type-safe field component*/}
              <form.Field
                name="street"
                validators={{
                  onChange: ({ value }) =>
                    !value
                      ? "Please enter an address"
                      : value.length < 3
                      ? "First name must be at least 3 characters"
                      : undefined,
                  onChangeAsyncDebounceMs: 500,
                  onChangeAsync: async ({ value }) => {
                    await new Promise((resolve) => setTimeout(resolve, 1000));
                    return (
                      value.includes("error") &&
                      'No "error" allowed in first name'
                    );
                  },
                }}
                // eslint-disable-next-line react/no-children-prop
                children={(field) => {
                  // Avoid hasty abstractions. Render props are great!
                  return (
                    <label htmlFor={field.name} className="flex flex-col space-y-1 ">
                      {/* <label className=" text-sm" htmlFor={field.name}>Country/region</label> */}
                      <input
                        id={field.name}
                        name={field.name}
                        inputMode="text"
                        autoComplete="shipping address-line1"
                        type="text"
                        placeholder="stree, house, apartment/unit*"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) =>
                          field.handleChange(removeSpecialChar(e.target.value))
                        }
                        className="font-semibold input-sm bg-white border-2 rounded-sm"
                      />
                      <span className=" text-schemes-light-error rounded-sm shadow-sm">
                        <FieldInfo field={field} />
                      </span>
                    </label>
                  );
                }}
              />
            </div>
            <div className="flex flex-col space-y-4">
              {/* A type-safe field component*/}
              <form.Field
                name="suite_no"
                // eslint-disable-next-line react/no-children-prop
                children={(field) => {
                  // Avoid hasty abstractions. Render props are great!
                  return (
                    <label htmlFor={field.name} className="flex flex-col space-y-1 ">
                      {/* <label className=" text-sm" htmlFor={field.name}>Country/region</label> */}
                      <input
                        id={field.name}
                        name={field.name}
                        inputMode="text"
                        type="text"
                        placeholder="Apt, suite, unit, etc(optional)"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) =>
                          field.handleChange(removeSpecialChar(e.target.value))
                        }
                        className="font-semibold input-sm bg-white border-2 rounded-sm shadow-sm"
                        autoComplete="shipping address-level1"
                      />
                      <span className=" text-schemes-light-error">
                        <FieldInfo field={field} />
                      </span>
                    </label>
                  );
                }}
              />
            </div>
            <div className="flex flex-col space-y-4">
              {/* A type-safe field component*/}
              <form.Field
                name="state"
                // eslint-disable-next-line react/no-children-prop
                children={(field) => {
                  // Avoid hasty abstractions. Render props are great!
                  return (
                    <label htmlFor={field.name} className="flex flex-col space-y-1 relative h-9 shadow-sm rounded-sm border-2 cursor-pointer">
                      {/* <label className=" text-sm" htmlFor={field.name}>Country/region</label> */}
                      <input
                        id={field.name}
                        name={field.name}
                        inputMode="numeric"
                        type="text"
                        placeholder="State/City"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onClick={() => {
                          dispatch(setActive(field.name));
                          // dispatch(setFunc({func: field.handleChange}));
                          document.getElementById("my_modal_5").showModal();
                        }}
                        onChange={(e) => null}
                        className=" input-sm font-semibold bg-white border-2 rounded-sm focus:outline-none sr-only"
                      />
                      <p className=" font-semibold px-4 text-sm"></p>
                      <span className="absolute top-[0.01rem] right-2 text-gray-400  text-base  ">
                        <CheveronLeft />
                      </span>
                    </label>
                  );
                }}
              />
            </div>
            <div className="flex flex-col space-y-4">
              {/* A type-safe field component*/}
              <form.Field
                name="lga"
                // eslint-disable-next-line react/no-children-prop
                children={(field) => {
                  // Avoid hasty abstractions. Render props are great!
                  return (
                    <label htmlFor={field.name} className="flex flex-col space-y-1 relative h-9 shadow-sm rounded-sm border-2   cursor-pointer">
                      {/* <label className=" text-sm" htmlFor={field.name}>Country/region</label> */}
                      <input
                        id={field.name}
                        name={field.name}
                        inputMode="numeric"
                        type="text"
                        placeholder="LGA"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onClick={() => {
                          dispatch(setActive(field.name));
                          // dispatch(setFunc({func: field.handleChange}))
                          document.getElementById("my_modal_5").showModal();
                        }}
                        onChange={() => null}
                        className=" input-sm bg-white border-2 rounded-sm font-semibold focus:outline-none sr-only"
                      />
                      <p className="px-4 font-semibold text-sm"></p>
                      <span className="absolute top-[0.005rem] right-2 text-gray-400  text-base  ">
                        <CheveronLeft />
                      </span>
                    </label>
                  );
                }}
              />
            </div>
            <div className="flex flex-col space-y-4 pb-4">
              {/* A type-safe field component*/}
              <form.Field
                name="zip_code"
                validators={{
                  onChange: ({ value }) =>
                    !value
                      ? "Zip address is required"
                      : value.length < 6
                      ? "zip address must be less than 3 digits"
                      : undefined,
                  onChangeAsyncDebounceMs: 500,
                  onChangeAsync: async ({ value }) => {
                    await new Promise((resolve) => setTimeout(resolve, 1000));
                    return (
                      value.includes("error") &&
                      'No "error" allowed in first name'
                    );
                  },
                }}
                // eslint-disable-next-line react/no-children-prop
                children={(field) => {
                  // Avoid hasty abstractions. Render props are great!
                  return (
                    <label htmlFor={field.name}  className="flex flex-col space-y-1 ">
                      {/* <label className=" text-sm" htmlFor={field.name}>Country/region</label> */}
                      <input
                        id={field.name}
                        name={field.name}
                        inputMode="numeric"
                        type="number"
                        placeholder="Zip code"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) =>
                          field.handleChange(removeSpecialChar(e.target.value))
                        }
                        className=" input-sm bg-white border-2 rounded-sm shadow-sm"
                      />
                      <span className=" text-schemes-light-error">
                        <FieldInfo field={field} />
                      </span>
                    </label>
                  );
                }}
              />
            </div>
          </div>
          <div className=" bg-white p-4 mt-2 mb-1 shadow-sm">
            <form.Field
              name="is_default"
              // eslint-disable-next-line react/no-children-prop
              children={(field) => {
                return (
                  <label
                    htmlFor="is_default"
                    className=" flex items-center cursor-pointer justify-between"
                  >
                    <span className=" ms-3 text-sm font-medium">
                      Set as default shipping address
                    </span>
                    <input
                      type="checkbox"
                      checked={field.state.value}
                      onChange={(e) => field.handleChange(e.target.checked)}
                      name={field.name}
                      className=" sr-only peer"
                      id={field.name}
                    />
                    <div className=" relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-transparent  dark:peer-focus:ring-schemes-light-surfaceTint peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full  peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-schemes-light-surfaceTint dark:peer-checked:bg-schemes-light-surfaceTint      "></div>
                  </label>
                );
              }}
            />
          </div>
        </div>
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
      <CountryModal />
    </div>
  );
}
