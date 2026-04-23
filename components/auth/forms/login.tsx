import { Dispatch, SetStateAction } from "react";
import PrimaryBtn from "../buttons/primaryBtn";
import { inputStyles, SocialIcons } from "../page/auth";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";

export default function LoginForm({active, setActive} : {active: boolean, setActive: Dispatch<SetStateAction<boolean>>}){
    const {
        register,
        handleSubmit,
        formState: {isDirty, isSubmitting, errors}
    } = useForm();

    const handleSubmitForm = async(data: any) => {
        const result = await signIn("credentials", {
            email: data.email,
            password: data.password,
             callbackUrl: "/"
        })

        console.log(result);
    }

    return (
        <div className={`${active ? "md:translate-x-full" : ""}
         absolute inset-y-0 left-0 max-md:w-full w-1/2 z-2 transition-all duration-200 delay-200 ease-in-out`}>
            <form
            onSubmit={handleSubmit(handleSubmitForm)}
            className="bg-(--p-ll-background-color) h-full flex flex-col items-center justify-center md:px-10 px-5"
            >
            <h1 className="text-[26px] font-bold text-(--s-text-color)">Sign In</h1>

            <SocialIcons />

            <span className="text-[12px] text-gray-500">or use your email password</span>

            <input {...register("email")}    type="email"  placeholder="Email" className={inputStyles} />
            <input {...register("password")} type="password"  placeholder="Password" className={inputStyles} />

            <a href="#" className="text-[13px] text-gray-500 no-underline my-4 hover:underline">
                Forget Your Password?
            </a>

            <PrimaryBtn isDirty={isDirty} isSubmitting={isSubmitting}>{isSubmitting ? "Submitting" : "Sign in"}</PrimaryBtn>

            <button 
                type="button"
                onClick={() => setActive(prev => !prev)}
                className="sm:hidden pt-10 bg-(--p-ll-background-color) text-sm">
                Already have an account? Sign in</button>
            </form>
        </div>
    )
}