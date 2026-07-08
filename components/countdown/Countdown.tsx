"use client";

import { useEffect, useState } from "react";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import { siteConfig } from "@/constants/site";
import CountdownCard from "./CountdownCard";
import Reveal from "@/components/ui/Reveal";

export default function Countdown() {
    const calculateTime = () => {
        const difference =
            new Date(siteConfig.launchDate).getTime() - Date.now();

        if (difference <= 0) {
            return {
                days: "00",
                hours: "00",
                minutes: "00",
                seconds: "00",
            };
        }

        return {
            days: String(Math.floor(difference / (1000 * 60 * 60 * 24))).padStart(2, "0"),
            hours: String(Math.floor((difference / (1000 * 60 * 60)) % 24)).padStart(2, "0"),
            minutes: String(Math.floor((difference / (1000 * 60)) % 60)).padStart(2, "0"),
            seconds: String(Math.floor((difference / 1000) % 60)).padStart(2, "0"),
        };
    };

    const [timeLeft, setTimeLeft] = useState(
        calculateTime
    );

    useEffect(() => {

        const timer = setInterval(() => {
            setTimeLeft(calculateTime());
        }, 1000);

        return () => clearInterval(timer);

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
                            We're Getting Ready
                        </h2>

                        <p className="mx-auto mt-6 max-w-2xl text-zinc-400">
                            Every day brings us one step closer to launching something
                            special for developers.
                        </p>

                    </div>
                </Reveal>
                <Reveal>
                    <div className="mt-14 grid grid-cols-2 gap-6 md:grid-cols-4">

                        <CountdownCard
                            value={timeLeft.days}
                            label="Days"
                        />

                        <CountdownCard
                            value={timeLeft.hours}
                            label="Hours"
                        />

                        <CountdownCard
                            value={timeLeft.minutes}
                            label="Minutes"
                        />

                        <CountdownCard
                            value={timeLeft.seconds}
                            label="Seconds"
                        />

                    </div>
                </Reveal>
            </Container>
        </Section>
    );
}
