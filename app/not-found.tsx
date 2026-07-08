import Link from "next/link";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";

export default function NotFound() {
    return (
        <Section className="flex min-h-screen items-center justify-center">
            <Container>

                <div className="mx-auto max-w-2xl text-center">

                    <p className="mb-4 text-sm uppercase tracking-[0.3em] text-blue-400">
                        Error 404
                    </p>

                    <h1 className="text-6xl font-black text-white md:text-8xl">
                        Page Not Found
                    </h1>

                    <p className="mt-6 text-lg text-zinc-400">
                        The page You&apos;re looking for doesn&apos;t exist or has been moved.
                    </p>

                    <Link
                        href="/"
                        className="mt-10 inline-block"
                    >
                        <Button>
                            Back to Home
                        </Button>
                    </Link>

                </div>

            </Container>
        </Section>
    );
}
