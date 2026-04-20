import { Dispatch, SetStateAction } from "react";
import PrimaryBtn from "../buttons/primaryBtn";
import { inputStyles, SocialIcons } from "../page/auth";

export default function LoginForm({active, setActive} : {active: boolean, setActive: Dispatch<SetStateAction<boolean>>}){
    return (
        <div className={`sign-in${active ? " sm:translate-x-full" : ""}
         absolute inset-y-0 left-0 max-sm:w-full w-1/2 z-2 transition-all duration-700 ease-in-out`}>
            <form
            onSubmit={e => e.preventDefault()}
            className="bg-(--p-ll-background-color) h-full flex flex-col items-center justify-center px-10"
            >
            <h1 className="text-[26px] font-bold text-(--s-text-color)">Sign In</h1>

            <SocialIcons />

            <span className="text-[12px] text-gray-500">or use your email password</span>

            <input type="email"  placeholder="Email" className={inputStyles} />
            <input type="password"  placeholder="Password" className={inputStyles} />

            <a href="#" className="text-[13px] text-gray-500 no-underline my-4 hover:underline">
                Forget Your Password?
            </a>

            <PrimaryBtn isDirty={false} isSubmitting={false}>Sign In</PrimaryBtn>

            <button 
                type="button"
                onClick={() => setActive(true)}
                className="sm:hidden pt-5 bg-(--p-ll-background-color) text-sm">
                Already have an account? Sign in</button>
            </form>
        </div>
    )
}