import { Response as ResponseAction } from "@/lib/actions/response/response";
import { responseSchema } from "@/lib/actions/response/zodResponse";
import { Post, Response } from "@/lib/types/post";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch } from "react";
import { useForm } from "react-hook-form";

export function CreateResponse({
    post, 
    setMessages
} : {
    post: Post, 
    setMessages: Dispatch<React.SetStateAction<Response[]>>
}){
    const {
        register,
        formState: {errors},
        handleSubmit,
        setValue
    } = useForm<{response: string}>({
        defaultValues: {response: ""},
        resolver: zodResolver(responseSchema)
    });

    const sendResponse  = async(data: {response: string}) => {
        const result = await ResponseAction({response: data.response, postId: post.id});

        if (result.state) {
            setMessages(res => ({
                ...res,
                ...result.newMessage
            }))

            setValue("response", "");
            
        }else{
            alert(result.message);
        }
    }

    return (
        <form className="flex justify-between w-70" onSubmit={handleSubmit(sendResponse)}>
            <input 
                {...register("response")}
                type="text" 
                placeholder="Add a comment..." 
                className="text-sm outline-0 max-w-50" />


            <button 
                type="submit" 
                className={`bg-linear-to-r ${
                    errors.response ? "from-[#ff0000] to-[#ff0000]" : "from-[#512da8] to-[#6236c8] text-white" 
                } rounded-md cursor-pointer px-3 p-1`}>
                
                Send
            </button>
        </form>
    )
}