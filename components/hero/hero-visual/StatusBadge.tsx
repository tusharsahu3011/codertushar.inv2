type StatusBadgeProps = {
    label: string;
    color: "blue" | "emerald";
    className: string;
};

export default function StatusBadge({
    label,
    color,
    className,
}: StatusBadgeProps) {
    const styles = {
        blue: {
            wrapper:
                "border-blue-500/20 bg-blue-500/10",
            dot:
                "bg-blue-400",
            text:
                "text-blue-300",
        },

        emerald: {
            wrapper:
                "border-emerald-500/20 bg-emerald-500/10",
            dot:
                "bg-emerald-400",
            text:
                "text-emerald-300",
        },
    };

    return (
        <div
            className={`absolute rounded-full border px-4 py-2 backdrop-blur-xl ${styles[color].wrapper} ${className}`}
        >
            <div className="flex items-center gap-2">
                <span
                    className={`h-2 w-2 rounded-full ${styles[color].dot}`}
                />

                <span
                    className={`text-xs font-medium ${styles[color].text}`}
                >
                    {label}
                </span>
            </div>
        </div>
    );
}
