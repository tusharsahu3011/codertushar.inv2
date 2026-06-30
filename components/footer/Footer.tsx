import Container from "@/components/ui/Container";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa6";
import { siteConfig } from "@/constants/site";

export default function Footer() {
    return (
        <footer className="border-t border-white/10 py-10">
            <Container>
                <div className="flex flex-col items-center justify-between gap-6 text-center md:flex-row">

                    <div>
                        <h3 className="text-lg font-semibold text-white">
                            {siteConfig.name}
                        </h3>

                        <p className="mt-2 text-sm text-zinc-500">
                            {siteConfig.description}
                        </p>
                    </div>
                    <div className="flex flex-col items-center gap-4 md:items-end">
                        <div className="flex items-center gap-4">

                            <a
                                href="#"
                                className="rounded-xl border border-white/10 bg-white/5 p-3 transition-colors hover:border-white/20 hover:bg-white/10"
                                aria-label="GitHub"
                            >
                                <FaGithub className="h-5 w-5 text-zinc-300" />
                            </a>

                            <a
                                href="#"
                                className="rounded-xl border border-white/10 bg-white/5 p-3 transition-colors hover:border-white/20 hover:bg-white/10"
                                aria-label="Instagram"
                            >
                                <FaInstagram className="h-5 w-5 text-zinc-300" />
                            </a>

                            <a
                                href="#"
                                className="rounded-xl border border-white/10 bg-white/5 p-3 transition-colors hover:border-white/20 hover:bg-white/10"
                                aria-label="LinkedIn"
                            >
                                <FaLinkedin className="h-5 w-5 text-zinc-300" />
                            </a>

                        </div>

                        <p className="text-center text-sm text-zinc-500 md:text-right">
                            {siteConfig.copyright}
                        </p>
                    </div>
                </div>
            </Container>
        </footer>
    );
}
