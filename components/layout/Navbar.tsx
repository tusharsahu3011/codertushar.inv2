"use client";

import { useEffect, useRef, useState } from "react";

import Image from "next/image";
import Link from "next/link";

import Container from "@/components/ui/Container";
import { siteConfig } from "@/constants/site";

const RETRY_DELAY_MS = 5000;
const MAX_RETRY_ATTEMPTS = 5;

export default function Navbar() {

    const [imageFailed, setImageFailed] =
        useState(false);

    // Bumping this forces the <Image> to remount
    // with a fresh (cache-busted) src, which is
    // what actually triggers a new load attempt.
    const [retryToken, setRetryToken] =
        useState(0);

    const attemptsRef =
        useRef(0);

    useEffect(() => {

        if (!imageFailed) {
            return;
        }

        if (attemptsRef.current >= MAX_RETRY_ATTEMPTS) {
            return;
        }

        const timeoutId = setTimeout(() => {

            attemptsRef.current += 1;

            setRetryToken((token) => token + 1);
            setImageFailed(false);

        }, RETRY_DELAY_MS);

        return () => {
            clearTimeout(timeoutId);
        };

    }, [imageFailed]);

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

                        {imageFailed ? (

                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-blue-500 font-extrabold tracking-tight text-white shadow-lg shadow-blue-700/30">
                                CT
                            </div>

                        ) : (

                            <Image
                                key={retryToken}
                                src="/logo-icon.png"
                                alt={`${siteConfig.name} logo`}
                                width={40}
                                height={40}
                                priority
                                className="h-10 w-10 rounded-xl object-contain"
                                onError={() => {
                                    setImageFailed(true);
                                }}
                            />

                        )}

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
