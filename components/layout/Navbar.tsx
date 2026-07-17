import Link from "next/link";
import Container from "@/components/ui/Container";
import { siteConfig } from "@/constants/site";

export default function Navbar() {
    return (
        <header className="fixed inset-x-0 top-0 z-50">
            <Container>
                <div className="mt-6 flex h-16 items-center justify-between rounded-2xl border border-white/10 bg-black/30 px-6 backdrop-blur-2xl">

                    {/* Logo */}
                    <Link
                        href="/"
                        aria-label={`${siteConfig.name} Home`}
                        className="flex items-center gap-3 rounded-xl transition-all duration-300 hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#030712]"
                    >
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-blue-500 font-extrabold tracking-tight text-white shadow-lg shadow-blue-700/30">
                            CT
                        </div>

                        <div>
                            <h1 className="text-base font-semibold tracking-tight text-white">
                                {siteConfig.name}
                            </h1>

                            <p className="text-xs text-zinc-400">
                                Developer
                            </p>
                        </div>
                    </Link>

                    {/* Status */}
                    <div className="hidden items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 md:flex">
                        <span
                            className="h-2 w-2 rounded-full bg-emerald-400"
                            aria-hidden="true"
                        />

                        <span
                            aria-live="polite"
                            className="text-sm font-medium text-emerald-300"
                        >
                            {siteConfig.status}
                        </span>
                    </div>

                </div>
            </Container>
        </header>
    );
}