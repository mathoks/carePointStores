import { redirect } from "next/navigation";


const baseURL = "http://localhost:3000/api/v1";

const LogInUser = async ({email}) => {
    const endPoint = `${baseURL}/auth/login/email`
    const response = await fetch(endPoint,{ 
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
         email
        }),
      });
    
    if(response.ok)
    redirect('/login/mail/check');
    throw new Error("couldn't login")
}
export {
    LogInUser,
};