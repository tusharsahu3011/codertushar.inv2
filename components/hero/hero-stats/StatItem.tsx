type StatItemProps = {
    title: string;
    status: string;
};

export default function StatItem({
    title,
    status,
}: StatItemProps) {
    return (
        <div>
            <p className="text-3xl font-bold text-white">
                {title}
            </p>

            <span className="mt-2 block text-sm text-zinc-500">
                {status}
            </span>
        </div>
    );
}
