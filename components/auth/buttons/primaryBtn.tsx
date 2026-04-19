export default function PrimaryBtn({ children }: { children: React.ReactNode }) {
    return (
        <button type="submit"
        className="mt-2.5 bg-[#512da8] hover:bg-[#4527a0] text-white text-[12px] font-semibold uppercase tracking-[0.5px] py-2.5 px-11.25 border border-transparent rounded-lg cursor-pointer transition-colors"
        >
        {children}
        </button>
    );
}