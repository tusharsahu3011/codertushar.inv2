"use client";

import { useEffect, useState } from "react";

import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";

import { siteConfig } from "@/constants/site";

import CountdownCard from "./CountdownCard";

type TimeLeft = {
    days: string;
    hours: string;
    minutes: string;
    seconds: string;
};

function calculateTime(): TimeLeft {

    const difference =
        new Date(siteConfig.launchDate).getTime() -
        Date.now();

    if (difference <= 0) {

        return {
            days: "00",
            hours: "00",
            minutes: "00",
            seconds: "00",
        };

    }

    return {

        days: String(
            Math.floor(
                difference /
                (1000 * 60 * 60 * 24)
            )
        ).padStart(2, "0"),

        hours: String(
            Math.floor(
                (difference /
                    (1000 * 60 * 60)) %
                24
            )
        ).padStart(2, "0"),

        minutes: String(
            Math.floor(
                (difference /
                    (1000 * 60)) %
                60
            )
        ).padStart(2, "0"),

        seconds: String(
            Math.floor(
                (difference / 1000) %
                60
            )
        ).padStart(2, "0"),

    };

}

export default function Countdown() {

    const [mounted, setMounted] =
        useState(false);

    const [timeLeft, setTimeLeft] =
        useState<TimeLeft>({
            days: "00",
            hours: "00",
            minutes: "00",
            seconds: "00",
        });

    useEffect(() => {

        setMounted(true);

        setTimeLeft(calculateTime());

        const interval = window.setInterval(() => {
            setTimeLeft(calculateTime());
        }, 1000);

        return () => {
            window.clearInterval(interval);
        };

    }, []);
    return (

        <Section>

            <Container>

                <Reveal>

                    <div className="text-center">

                        <p className="mb-3 text-sm uppercase tracking-[0.3em] text-blue-400">
                            Launch Countdown
                        </p>

                        <h2 className="text-4xl font-bold text-white md:text-5xl">
                            We&apos;re Getting Ready
                        </h2>

                        <p className="mx-auto mt-6 max-w-2xl text-zinc-400">
                            Every day brings us one step closer to launching
                            something special for developers.
                        </p>

                    </div>

                </Reveal>

                <Reveal>

                    <div className="mt-14 grid grid-cols-2 gap-6 md:grid-cols-4">

                        <CountdownCard
                            value={mounted ? timeLeft.days : "00"}
                            label="Days"
                        />

                        <CountdownCard
                            value={mounted ? timeLeft.hours : "00"}
                            label="Hours"
                        />

                        <CountdownCard
                            value={mounted ? timeLeft.minutes : "00"}
                            label="Minutes"
                        />

                        <CountdownCard
                            value={mounted ? timeLeft.seconds : "00"}
                            label="Seconds"
                        />

                    </div>

                </Reveal>

            </Container>

        </Section>

    );

}