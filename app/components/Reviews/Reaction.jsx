import React, { memo, Suspense} from "react";

const Reaction = memo(function DisplayButton({
  buttonProps,
  reactions = null,
}) {
  const { ids, hide, push, pushReaction, length, hasReacted } = buttonProps;
  return (
    <Suspense fallback="loading">
      <div>
        <p className="text-slate-800">
          <span className="font-medium text-sm">{length}</span> people found
          this review helpfull
        </p>
        {!hide && (
          <div className={`flex items-center justify-between pt-8 `}>
            <p className="">Was this review helpfull?</p>{" "}
            <span className="space-x-2 ">
              <button
                className={`font-medium  px-2 rounded-md ring-1 ring-schemes-light-outline ${
                  hasReacted === "YES"
                    ? " bg-schemes-light-primary text-schemes-light-onPrimary"
                    : ""
                } `}
                data-review_id={ids}
                disabled={push}
                onClick={!hide ? pushReaction : () => console.log(hide)}
              >
                Yes
              </button>

              <button
                className={`font-medium  px-2 rounded-md ring-1 ring-schemes-light-outline ${
                  hasReacted === "NO"
                    ? " bg-schemes-light-primary text-schemes-light-onPrimary"
                    : ""
                } `}
                data-review_id={ids}
                disabled={push}
                onClick={!hide ? pushReaction : () => console.log(hide)}
              >
                No
              </button>
            </span>
          </div>
        )}
      </div>
    </Suspense>
  );
});

export default Reaction;
