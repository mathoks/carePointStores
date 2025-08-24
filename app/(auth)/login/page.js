import LoginForm from "@/app/components/Forms/LoginForm";

export default function SignInPage() {
  return (
    <div className="grid grid-cols-1 gap-10 mx-auto">
      <div className="flex flex-col space-y-2">
        <div className="flex  space-x-2 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="p-2 bg-schemes-light-primary  rounded-full size-10  text-schemes-light-onPrimary"
            viewBox="0 0 24 24"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
          <p className=" font-bold text-left">Carepointstores</p>
        </div>

        <span className="text-sm text-schemes-light-onSurfaceVariant text-wrap">
          Your number one suppliments online store in Nigeria
        </span>
      </div>
      <div className="flex flex-col  space-y-4 max-w-md ">
        <div className="flex flex-col items-center">
          <p className=" font-bold text-2xl">Sign In</p>
          <span className="text-sm text-center text-schemes-light-onSurfaceVariant text-wrap">
            Please note that email verification is required for signup. Your
            email will only be use to verify your identity for security purposes{" "}
          </span>
        </div>

        <LoginForm />
        <div className="flex w-full flex-col h-4"></div>
      </div>
    </div>
  );
}
