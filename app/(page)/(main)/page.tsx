"use client"

import { ResgisterCode } from "@/lib/actions/register/registerCode";
import { useForm } from "react-hook-form";


type DataType = {email: string, password: string, name: string}
export default  function Home() {
  const {register, handleSubmit} = useForm<DataType>();

  const enviar = async(data: DataType) => {
    const result = await ResgisterCode(data); 
    
  }
  
  return (
    
    <form className="flex gap-5 flex-col " onSubmit={handleSubmit(enviar)}>
      <input {...register("email")} type="email" className="border" placeholder="email" />
      <input {...register("password")} type="text" className="border" placeholder="password" />
      <input {...register("name")} type="text" className="border" placeholder="name" />
      <button type="submit">Enviar</button>
    </form>
  );
}
