import React from "react";

const status = async () => {
  const data = await fetch("http://localhost:3000/api/v1/auth/login/email/check", {
    headers: {
      "Content-Type": "text/html",
    },
  });

  return await data.text();
};

const page = async (props) => {
  const html = await status();
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: html,
      }}
    />
  );
};

export default page;
