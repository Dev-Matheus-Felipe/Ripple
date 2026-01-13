"use client"

import { Register } from "@/lib/actions/register/register";
import { ResgisterCode } from "@/lib/actions/register/registerCode";
import { sign } from "crypto";
import { signIn, signOut } from "next-auth/react";
import { useForm } from "react-hook-form";

type DataType = {
  email: string, 
  password: string, 
  name: string
}

export default  function Login() {
  const {register, handleSubmit} = useForm<DataType>();

  const enviar = async(data: DataType) => {
    const result = await ResgisterCode(data); 
    
  }
  
  return (
    <>
      <form className="flex gap-5 flex-col " onSubmit={handleSubmit(enviar)}>
        <input {...register("email")} type="email" className="border" placeholder="email" />
        <input {...register("password")} type="text" className="border" placeholder="password" />
        <input {...register("name")} type="text" className="border" placeholder="name" />
        <button type="submit">Enviar</button>
      </form>

      <button onClick={async() => {
        const result2 = await signIn("credentials", {
          email: "rippleproject74@gmail.com",
          password: "ripple123",
        })

        console.log(result2)
      }}>LOGIN</button>
      < br />
      <button onClick={() => signOut()}>SIGN OUT</button>
    </>
  );
}
