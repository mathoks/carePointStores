export const Avatar = ({src})=>{
    return (
        <div className="">
  <div className=" ring-primary ring-offset-base-100  rounded-full ring ring-offset-2  overflow-clip">
    <img className="h-4 w-4 aspect-auto rounded-full" src= { src ?? "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"} />
  </div>
</div>
    )
}