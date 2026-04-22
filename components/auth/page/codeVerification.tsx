"use client"

import { useRef } from "react";
import createUser from "../serverActions/createUser";
import { useParams, useSearchParams } from "next/navigation";

const LENGTH = 6;

export default function CodeVerification() {
    const refs = useRef<(HTMLInputElement | null)[]>([]);
    const params = useSearchParams();

    function focus(i: number) {
        const idx = Math.max(0, Math.min(i, LENGTH - 1));
        refs.current[idx]?.focus();
    }

    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>, i: number) {
        if (e.key === "Backspace") {
            e.preventDefault();
            const input = refs.current[i]!;

            if (input.value !== "") 
                input.value = "";

            else if (i > 0) {
                refs.current[i - 1]!.value = "";
                focus(i - 1);
            }

        } else if (e.key === "ArrowLeft") {
            e.preventDefault();
            focus(i - 1);

        } else if (e.key === "ArrowRight") {
            e.preventDefault();
            focus(i + 1);
        }
    }

    function handleInput(e: React.FormEvent<HTMLInputElement>, i: number) {
        const input = e.currentTarget;
        const val = input.value;
        input.value = "";

        if (!val || !/^[0-9A-Za-z]$/.test(val)) return;

        input.value = val;
        if (i < LENGTH - 1) focus(i + 1);
    }

    function handlePaste(e: React.ClipboardEvent<HTMLInputElement>, i: number) {
        e.preventDefault();

        const text = e.clipboardData.getData("text").replace(/\s/g, "");
        let idx = i;

        for (const char of text) {
            if (idx >= LENGTH) break;
            if (/^[0-9A-Za-z]$/.test(char)) {
                refs.current[idx]!.value = char;
                idx++;
            }
        }
        focus(Math.min(idx, LENGTH - 1));
    }

    async function getCode() {
        const code = refs.current.map(r => r?.value ?? "").join("");
        const email = params.get("email");

        const result = await createUser(code, email ?? "");

        console.log(result);
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-[2%]">
            <div className={`relative rounded-[30px] flex bg-(--p-ll-background-color)
            shadow-[0_5px_15px_rgba(0,0,0,0.35)] w-2xl max-w-full sm:min-h-120 min-h-100`}>

                <div className={`w-[40%] rounded-[30px] h-full absolute left-full
                sm:bg-linear-to-r from-[#5c6bc0] to-[#512da8] -translate-x-full`} />

                <div className={`flex flex-col min-h-full sm:w-[90%] w-full bg-(--p-ll-background-color)
                justify-center items-center sm:rounded-[30px_150px_100px_30px] rounded-[30px] z-2`}>

                    <h1 className="text-[26px] font-bold text-(--s-text-color) pb-3">Verify Your Account</h1>
                    <h3 className="text-[15px] text-gray-500">Enter the verification code sent to your email</h3>

                    <div className="flex sm:gap-5 gap-3 py-7 pb-15">
                        {Array.from({ length: LENGTH }, (_, i) => (
                            <input
                                key={i}
                                ref={(el) => { refs.current[i] = el; }}
                                type="text"
                                inputMode="numeric"
                                maxLength={1}
                                onKeyDown={(e) => handleKeyDown(e, i)}
                                onInput={(e) => handleInput(e, i)}
                                onPaste={(e) => handlePaste(e, i)}
                                onFocus={(e) => e.currentTarget.select()}
                                className="w-12 h-12 text-center text-xl border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5c6bc0]"
                            />
                        ))}
                    </div>

                    <button
                        onClick={() => getCode()}
                        className={`mt-2.5 bg-[#512da8] hover:bg-[#4527a0] text-white text-[12px]
                        font-semibold uppercase tracking-[0.5px] py-3 px-11.25 border border-transparent
                        rounded-lg cursor-pointer transition-colors`}>
                        Verify
                    </button>
                </div>
            </div>
        </div>
    );
}