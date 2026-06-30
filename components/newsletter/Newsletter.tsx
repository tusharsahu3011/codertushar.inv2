"use client";

import { useState, useTransition } from "react";

import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";

import { subscribe } from "@/app/actions/newsletter";

export default function Newsletter() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [success, setSuccess] = useState(false);

    const [isPending, startTransition] = useTransition();

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        setMessage("");

        startTransition(async () => {
            const result = await subscribe(email);

            setSuccess(result.success);
            setMessage(result.message);

            if (result.success) {
                setEmail("");
            }
        });
    }

    return (
        <Section>
            <Container>
                <Reveal>
                    <div className="mx-auto max-w-4xl rounded-[32px] border border-white/10 bg-white/5 p-10 backdrop-blur-xl md:p-16">

                        <div className="text-center">

                            <p className="mb-3 text-sm uppercase tracking-[0.3em] text-blue-400">
                                Stay Updated
                            </p>

                            <h2 className="text-4xl font-bold text-white md:text-5xl">
                                Be the First to Know
                            </h2>

                            <p className="mx-auto mt-6 max-w-2xl text-zinc-400">
                                Enter your email and we'll notify you as soon as
                                codertushar.in goes live.
                            </p>

                        </div>

                        <form
                            onSubmit={handleSubmit}
                            className="mx-auto mt-10 flex max-w-2xl flex-col gap-4 sm:flex-row"
                        >

                            <input
                                type="email"
                                value={email}
                                onChange={(e) =>
                                    setEmail(e.target.value)
                                }
                                placeholder="Enter your email address"
                                autoComplete="email"
                                required
                                className="h-14 flex-1 rounded-2xl border border-white/10 bg-black/20 px-5 text-white placeholder:text-zinc-500 outline-none transition-colors focus:border-blue-500/50"
                            />

                            <button
                                type="submit"
                                disabled={isPending}
                                className="h-14 rounded-2xl bg-white px-8 font-semibold text-slate-900 transition-all duration-300 hover:scale-[1.02] hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {isPending
                                    ? "Joining..."
                                    : "Notify Me"}
                            </button>

                        </form>

                        {message && (
                            <p
                                className={`mt-5 text-center text-sm ${success
                                        ? "text-emerald-400"
                                        : "text-red-400"
                                    }`}
                            >
                                {message}
                            </p>
                        )}

                        {!message && (
                            <p className="mt-5 text-center text-sm text-zinc-500">
                                No spam. One email when we launch. That's it.
                            </p>
                        )}

                    </div>
                </Reveal>
            </Container>
        </Section>
    );
}