"use client";

import { useRef, useState, useTransition } from "react";

import { Turnstile } from "@marsidev/react-turnstile";

import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";

import { subscribe } from "@/app/actions/newsletter";
import { trackEvent } from "@/lib/analytics";

export default function Newsletter() {

    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [success, setSuccess] = useState(false);

    const [turnstileToken, setTurnstileToken] =
        useState("");

    const [isPending, startTransition] =
        useTransition();

    const turnstileRef = useRef<any>(null);

    function resetForm() {

        setEmail("");

        setTurnstileToken("");

        turnstileRef.current?.reset();

    }

    function handleSubmit(
        e: React.FormEvent<HTMLFormElement>
    ) {

        e.preventDefault();

        setMessage("");

        if (!email.trim()) {

            setSuccess(false);

            setMessage(
                "Please enter your email address."
            );

            return;

        }

        if (!turnstileToken) {

            setSuccess(false);

            setMessage(
                "Please complete the verification."
            );

            return;

        }

        startTransition(async () => {

            const result =
                await subscribe(
                    email,
                    turnstileToken
                );

            setSuccess(result.success);

            setMessage(result.message);

            if (result.success) {

                trackEvent(
                    "waitlist_joined",
                    {
                        email_domain:
                            email.split("@")[1],
                    }
                );

                resetForm();

            } else {

                trackEvent(
                    "waitlist_join_failed"
                );

                turnstileRef.current?.reset();

                setTurnstileToken("");

            }

        });

    }

    return (

        <Section>

            <Container>

                <Reveal>

                    <div
                        className="
                            mx-auto
                            max-w-4xl
                            rounded-[32px]
                            border
                            border-white/10
                            bg-white/5
                            p-10
                            backdrop-blur-xl
                            md:p-16
                        "
                    >

                        <div className="text-center">

                            <p
                                className="
                                    mb-3
                                    text-sm
                                    uppercase
                                    tracking-[0.3em]
                                    text-blue-400
                                "
                            >
                                Stay Updated
                            </p>

                            <h2
                                className="
                                    text-4xl
                                    font-bold
                                    text-white
                                    md:text-5xl
                                "
                            >
                                Be the First to Know
                            </h2>

                            <p
                                className="
                                    mx-auto
                                    mt-6
                                    max-w-2xl
                                    text-zinc-400
                                "
                            >
                                Enter your email and
                                we'll notify you the
                                moment{" "}

                                <strong
                                    className="
                                        text-white
                                    "
                                >
                                    codertushar.in
                                </strong>

                                {" "}launches.

                            </p>
                            <form
                                onSubmit={handleSubmit}
                                className="
                                mx-auto
                                mt-10
                                max-w-2xl
                            "
                            >

                                <label
                                    htmlFor="newsletter-email"
                                    className="sr-only"
                                >
                                    Email address
                                </label>

                                {/* Input + Button */}

                                <div
                                    className="
                                    flex
                                    flex-col
                                    gap-4
                                    sm:flex-row
                                "
                                >

                                    <input
                                        id="newsletter-email"
                                        type="email"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(
                                                e.target.value
                                            )
                                        }
                                        placeholder="Enter your email address"
                                        autoComplete="email"
                                        aria-label="Email address"
                                        required
                                        disabled={isPending}
                                        className="
                                        h-14
                                        flex-1
                                        rounded-2xl
                                        border
                                        border-white/10
                                        bg-black/20
                                        px-5
                                        text-white
                                        placeholder:text-zinc-500
                                        outline-none
                                        transition-all
                                        duration-300
                                        focus:border-blue-500/60
                                        focus:ring-2
                                        focus:ring-blue-500/20
                                        disabled:cursor-not-allowed
                                        disabled:opacity-60
                                    "
                                    />

                                    <button
                                        type="submit"
                                        disabled={
                                            isPending ||
                                            !turnstileToken
                                        }
                                        onClick={() =>
                                            trackEvent(
                                                "notify_button_clicked"
                                            )
                                        }
                                        className="
                                        h-14
                                        rounded-2xl
                                        bg-white
                                        px-8
                                        font-semibold
                                        text-slate-900
                                        transition-all
                                        duration-300
                                        hover:scale-[1.02]
                                        hover:bg-slate-100
                                        active:scale-[0.98]
                                        disabled:cursor-not-allowed
                                        disabled:opacity-60
                                    "
                                    >
                                        {isPending
                                            ? "Joining..."
                                            : "Notify Me"}
                                    </button>

                                </div>

                                {/* Turnstile */}

                                <div
                                    className="
                                    mt-6
                                    flex
                                    justify-center
                                "
                                >

                                    <Turnstile
                                        ref={turnstileRef}
                                        siteKey={
                                            process.env
                                                .NEXT_PUBLIC_TURNSTILE_SITE_KEY!
                                        }
                                        options={{
                                            theme: "dark",
                                            size: "normal",
                                        }}
                                        onSuccess={(token) =>
                                            setTurnstileToken(
                                                token
                                            )
                                        }
                                        onExpire={() =>
                                            setTurnstileToken("")
                                        }
                                        onError={() => {

                                            setTurnstileToken("");

                                            setSuccess(false);

                                            setMessage(
                                                "Verification failed. Please try again."
                                            );

                                        }}
                                    />

                                </div>
                            </form>

                            {/* Status */}

                            <div
                                className="
                                mt-6
                                min-h-[60px]
                            "
                            >

                                {message ? (

                                    <div
                                        role="status"
                                        aria-live="polite"
                                        className={`
                                        rounded-2xl
                                        border
                                        px-5
                                        py-4
                                        text-center
                                        text-sm
                                        font-medium
                                        transition-all
                                        duration-300

                                        ${success
                                                ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-300"
                                                : "border-red-500/20 bg-red-500/10 text-red-300"
                                            }
                                    `}
                                    >

                                        {message}

                                    </div>

                                ) : (

                                    <p
                                        className="
                                        text-center
                                        text-sm
                                        leading-7
                                        text-zinc-500
                                    "
                                    >
                                        No spam.
                                        {" "}
                                        Only one email when we launch.
                                        <br />
                                        Your email stays private and is
                                        never shared with third parties.
                                    </p>

                                )}

                            </div>

                        </div>

                </Reveal>

            </Container>

        </Section>

    );

}