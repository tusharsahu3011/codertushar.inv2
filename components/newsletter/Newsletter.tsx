"use client";

import {
    useEffect,
    useMemo,
    useRef,
    useState,
    useTransition,
} from "react";

import {
    CircleAlert,
    CircleCheck,
    LoaderCircle,
    Mail,
    MailCheck,
} from "lucide-react";

import {
    Turnstile,
    type TurnstileInstance,
} from "@marsidev/react-turnstile";

import { subscribe } from "@/app/actions/newsletter";

import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";

import { trackEvent } from "@/lib/analytics";

type NewsletterStatus =
    | "idle"
    | "valid"
    | "verifying"
    | "joining"
    | "success"
    | "duplicate"
    | "email_failed"
    | "validation_error"
    | "verification_error"
    | "server_error";

const emailRegex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const STATUS_CONFIG = {

    idle: {
        button: "Notify Me",
        border:
            "border-white/10 focus:border-blue-500/60",
    },

    valid: {
        button: "Notify Me",
        border:
            "border-blue-500/50 focus:border-blue-500",
    },

    verifying: {
        button: "Verifying...",
        border:
            "border-blue-500/50 focus:border-blue-500",
    },

    joining: {
        button: "Joining Waitlist...",
        border:
            "border-blue-500/50 focus:border-blue-500",
    },

    success: {
        button: "Joined",
        border:
            "border-emerald-500/50 focus:border-emerald-500",
    },

    duplicate: {
        button: "Already Joined",
        border:
            "border-blue-500/50 focus:border-blue-500",
    },

    email_failed: {
        button: "Joined",
        border:
            "border-emerald-500/50 focus:border-emerald-500",
    },

    validation_error: {
        button: "Notify Me",
        border:
            "border-red-500/50 focus:border-red-500",
    },

    verification_error: {
        button: "Verify Again",
        border:
            "border-red-500/50 focus:border-red-500",
    },

    server_error: {
        button: "Try Again",
        border:
            "border-red-500/50 focus:border-red-500",
    },

} as const;

export default function Newsletter() {

    const [email, setEmail] =
        useState("");

    const [message, setMessage] =
        useState("");

    const [status, setStatus] =
        useState<NewsletterStatus>("idle");

    const [
        turnstileToken,
        setTurnstileToken,
    ] = useState("");

    const [
        isPending,
        startTransition,
    ] = useTransition();

    const turnstileRef =
        useRef<TurnstileInstance | null>(null);

    const isEmailValid =
        useMemo(() => {

            return emailRegex.test(
                email.trim()
            );

        }, [email]);

    const isLocked =

        status === "success" ||
        status === "duplicate" ||
        status === "email_failed";

    const isLoading =

        status === "verifying" ||
        status === "joining";

    const isButtonDisabled =

        !isEmailValid ||
        isPending ||
        isLocked; useEffect(() => {

            if (isLocked) {
                return;
            }

            const value =
                email.trim();

            if (!value) {

                setStatus("idle");
                setMessage("");

                return;

            }

            if (emailRegex.test(value)) {

                setStatus("valid");
                setMessage("");

            } else {

                setStatus("idle");

            }

        }, [
            email,
            isLocked,
        ]);

    function getInputIcon() {

        switch (status) {

            case "success":
            case "email_failed":

                return (
                    <CircleCheck
                        size={20}
                        className="text-emerald-400"
                    />
                );

            case "duplicate":

                return (
                    <MailCheck
                        size={20}
                        className="text-blue-400"
                    />
                );

            case "validation_error":
            case "verification_error":
            case "server_error":

                return (
                    <CircleAlert
                        size={20}
                        className="text-red-400"
                    />
                );

            case "valid":

                return (
                    <MailCheck
                        size={20}
                        className="text-blue-400"
                    />
                );

            case "verifying":
            case "joining":

                return (
                    <LoaderCircle
                        size={20}
                        className="animate-spin text-zinc-300"
                    />
                );

            default:

                return (
                    <Mail
                        size={20}
                        className="text-zinc-500"
                    />
                );

        }

    }

    function handleSubmit(
        e: React.FormEvent<HTMLFormElement>
    ) {

        e.preventDefault();

        if (
            isButtonDisabled
        ) {
            return;
        }

        setMessage("");

        setStatus(
            "verifying"
        );

        turnstileRef.current?.execute();

    }

    async function handleTurnstileSuccess(
        token: string
    ) {

        setTurnstileToken(
            token
        );

        setStatus(
            "joining"
        );

        startTransition(async () => {

            trackEvent(
                "notify_button_clicked"
            );

            const result =
                await subscribe(
                    email,
                    token
                );

            setStatus(
                result.status
            );

            setMessage(
                result.message
            );

            if (
                result.status === "success" ||
                result.status === "email_failed"
            ) {

                trackEvent(
                    "waitlist_joined",
                    {
                        email_domain:
                            email.split("@")[1],
                    }
                );

                return;

            }

            trackEvent(
                "waitlist_join_failed"
            );

            turnstileRef.current?.reset();

            setTurnstileToken("");

        });

    }

    function handleTurnstileError() {

        setTurnstileToken("");

        setStatus(
            "verification_error"
        );

        setMessage(
            "Security verification failed. Please try again."
        );

    }

    function handleTurnstileExpire() {

        setTurnstileToken("");

        setStatus(
            "verification_error"
        );

        setMessage(
            "Verification expired. Please try again."
        );

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
                    >                        <div className="text-center">

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
                                Join the official waitlist and
                                get notified the moment{" "}

                                <span className="font-semibold text-white">
                                    codertushar.in
                                </span>

                                {" "}goes live.

                                <br />

                                You&apos;ll receive only launch
                                updates — no spam, ever.

                            </p>

                        </div>

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

                            <div className="relative">

                                <input
                                    id="newsletter-email"
                                    type="email"
                                    value={email}
                                    onChange={(e) =>
                                        setEmail(
                                            e.target.value
                                        )
                                    }
                                    placeholder="you@example.com"
                                    autoComplete="email"
                                    aria-label="Email address"
                                    readOnly={isLocked}
                                    className={`
                                        h-14
                                        w-full
                                        rounded-2xl
                                        border
                                        bg-black/20
                                        pl-5
                                        pr-14
                                        text-white
                                        placeholder:text-zinc-500
                                        outline-none
                                        transition-all
                                        duration-300
                                        ${STATUS_CONFIG[status].border}
                                    `}
                                />

                                <div
                                    className="
                                        pointer-events-none
                                        absolute
                                        right-5
                                        top-1/2
                                        -translate-y-1/2
                                    "
                                >
                                    {getInputIcon()}
                                </div>

                            </div>

                            <Turnstile
                                ref={turnstileRef}
                                siteKey={
                                    process.env
                                        .NEXT_PUBLIC_TURNSTILE_SITE_KEY!
                                }
                                options={{
                                    theme: "dark",
                                    size: "invisible",
                                }}
                                onSuccess={
                                    handleTurnstileSuccess
                                }
                                onError={
                                    handleTurnstileError
                                }
                                onExpire={
                                    handleTurnstileExpire
                                }
                            />

                            <button
                                type="submit"
                                disabled={isButtonDisabled}
                                className={`
                                    mt-6
                                    flex
                                    h-14
                                    w-full
                                    items-center
                                    justify-center
                                    gap-2
                                    rounded-2xl
                                    font-semibold
                                    transition-all
                                    duration-300

                                    ${status === "success" ||
                                        status === "email_failed"
                                        ? "bg-emerald-500 text-white"
                                        : status === "duplicate"
                                            ? "bg-blue-500 text-white"
                                            : "bg-white text-slate-900 hover:scale-[1.02] hover:bg-slate-100"
                                    }

                                    disabled:cursor-not-allowed
                                    disabled:opacity-60
                                `}
                            >

                                {isLoading && (
                                    <LoaderCircle
                                        size={18}
                                        className="animate-spin"
                                    />
                                )}

                                {!isLoading &&
                                    (status === "success" ||
                                        status === "email_failed") && (
                                        <CircleCheck
                                            size={18}
                                        />
                                    )}

                                {!isLoading &&
                                    status === "duplicate" && (
                                        <MailCheck
                                            size={18}
                                        />
                                    )}

                                {STATUS_CONFIG[status].button}

                            </button>                        </form>

                        <div
                            className="
                                mt-6
                                min-h-[72px]
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

                                        ${status === "success" ||
                                            status === "email_failed"
                                            ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-300"
                                            : status === "duplicate"
                                                ? "border-blue-500/20 bg-blue-500/10 text-blue-300"
                                                : "border-red-500/20 bg-red-500/10 text-red-300"
                                        }
                                    `}
                                >

                                    <div
                                        className="
                                            flex
                                            items-center
                                            justify-center
                                            gap-2
                                        "
                                    >

                                        {(status === "success" ||
                                            status === "email_failed") && (
                                                <CircleCheck
                                                    size={18}
                                                />
                                            )}

                                        {status === "duplicate" && (
                                            <MailCheck
                                                size={18}
                                            />
                                        )}

                                        {(status === "validation_error" ||
                                            status === "verification_error" ||
                                            status === "server_error") && (
                                                <CircleAlert
                                                    size={18}
                                                />
                                            )}

                                        <span>
                                            {message}
                                        </span>

                                    </div>

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
                                    Your email is only used for
                                    launch updates. No spam.
                                    Ever.
                                </p>

                            )}

                        </div>

                        <div
                            className="
                                mt-8
                                flex
                                flex-col
                                items-center
                                gap-2
                            "
                        >

                            <p
                                className="
                                    text-xs
                                    uppercase
                                    tracking-[0.25em]
                                    text-zinc-600"
                            >
                                Privacy First
                            </p>

                            <p
                                className="
                                    max-w-xl
                                    text-center
                                    text-sm
                                    leading-7
                                    text-zinc-500
                                "
                            >
                                Your email is securely stored,
                                never shared with third parties,
                                and will only be used to send
                                launch updates and important
                                announcements about{" "}
                                <span
                                    className="
                                        text-zinc-300
                                    "
                                >
                                    codertushar.in
                                </span>.
                            </p>

                        </div>

                    </div>

                </Reveal>

            </Container>

        </Section>

    );

}