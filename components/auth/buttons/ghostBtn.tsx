export default function GhostBtn({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
    return (
        <button
        type="button"
        onClick={onClick}
        className="mt-2.5 bg-transparent hover:bg-white/10 text-white text-[12px] font-semibold uppercase tracking-[0.5px] py-2.5 px-11.25 border border-white rounded-lg cursor-pointer transition-colors"
        >
        {children}
        </button>
    );
}