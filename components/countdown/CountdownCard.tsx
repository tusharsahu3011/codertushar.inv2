type CountdownCardProps = {
    value: string;
    label: string;
};

export default function CountdownCard({
    value,
    label,
}: CountdownCardProps) {
    return (
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-xl">
            <div className="text-5xl font-black text-white">
                {value}
            </div>

            <p className="mt-3 text-sm uppercase tracking-widest text-zinc-500">
                {label}
            </p>
        </div>
    );
}