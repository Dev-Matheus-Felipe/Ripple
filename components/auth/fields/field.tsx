export default function Field({ type, placeholder }: { type: string; placeholder: string }) {
    return (
        <input
        type={type}
        placeholder={placeholder}
        className="bg-[#eee] border-none my-2 py-2.5 px-3.75 text-[13px] rounded-lg w-full outline-none focus:ring-2 focus:ring-[#512da8]/30 transition-all"
        />
    );
}