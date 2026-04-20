import { useForm } from "react-hook-form";
import PrimaryBtn from "../buttons/primaryBtn";
import { inputStyles, SocialIcons } from "../page/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterDataType, RegisterSchema } from "../validators/registerSchema";
import { validateEmail } from "../serverActions/validateEmail";
import { Dispatch, SetStateAction } from "react";

export default function RegisterForm({active, setActive} : {active: boolean, setActive: Dispatch<SetStateAction<boolean>>}){
    const {
        handleSubmit,
        register,
        formState: {errors, isDirty, isSubmitting }
    } = useForm<RegisterDataType>({
        resolver: zodResolver(RegisterSchema)
    });

    const handleSubmitForm  = async(data: RegisterDataType) => {
        const result = await validateEmail(data);
    }

    return (
        <div className={`absolute max-sm:w-full w-1/2 max-sm:flex flex-col inset-y-0 left-0  h-full transition-all duration-700 ease-in-out z-1 opacity-0
        ${active ? "sm:translate-x-full opacity-100 z-5 animate-slide-in" : ""}`}>
                
            <form
            
            onSubmit={handleSubmit(handleSubmitForm)}
            className="bg-(--p-ll-background-color) h-full flex flex-col items-center justify-center px-10 gap-0"
            >

            <h1 className="text-[26px] font-bold text-(--p-text-color)">Create Account</h1>

            <SocialIcons />

            <span className="text-[12px] text-gray-500">or use your email for registeration</span>

            <input {...register("name")}      type="text"      placeholder="Name"     className={inputStyles} />
            <p className="text-xs text-red-500 w-full pb-2">{errors.name?.message}</p>

            <input {...register("email")}     type="email"     placeholder="Email"    className={inputStyles} />
            <p className="text-xs text-red-500 w-full pb-2">{errors.email?.message}</p>

            <input {...register("password")}  type="password"  placeholder="Password" className={inputStyles} />
            <p className="text-xs text-red-500 w-full pb-2">{errors.password?.message}</p>
            

            <PrimaryBtn isDirty={isDirty} isSubmitting={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Sign Up" }
            </PrimaryBtn>

            <button 
                type="button"
                onClick={() => setActive(false)}
                className="sm:hidden pt-5 bg-(--p-ll-background-color) text-sm">
                Don't have an account? Sign in</button>

            </form>
        </div>
    ) 
}