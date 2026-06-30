"use client";

import { useEffect } from "react";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";

type ErrorProps = {
    error: Error & { digest?: string };
    reset: () => void;
};

export default function Error({
    error,
    reset,
}: ErrorProps) {

    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <Section className="flex min-h-screen items-center justify-center">
            <Container>

                <div className="mx-auto max-w-2xl text-center">

                    <p className="mb-4 text-sm uppercase tracking-[0.3em] text-red-400">
                        Something Went Wrong
                    </p>

                    <h1 className="text-5xl font-black text-white md:text-7xl">
                        Oops!
                    </h1>

                    <p className="mt-6 text-lg text-zinc-400">
                        An unexpected error occurred. Please try again.
                    </p>

                    <div className="mt-10">
                        <Button onClick={reset}>
                            Try Again
                        </Button>
                    </div>

                </div>

            </Container>
        </Section>
    );
}