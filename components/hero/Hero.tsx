"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import Heading from "@/components/ui/Heading";
import Text from "@/components/ui/Text";
import { fadeUp } from "@/lib/animations";
import HeroVisual from "./HeroVisual";
import StatItem from "./hero-stats/StatItem";

export default function Hero() {
    return (
        <Section className="flex min-h-screen items-center pt-32 md:pt-36">
            <Container>
                <motion.div
                    className="grid w-full items-center gap-16 lg:grid-cols-2"
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    transition={{
                        duration: 0.9,
                        ease: "easeOut",
                    }}
                >
                    <div>

                        {/* Badge */}
                        <Badge className="mb-8">

                            <span className="h-2 w-2 rounded-full bg-emerald-400" />

                            <span className="text-sm text-zinc-300">
                                Currently Building codertushar.in
                            </span>

                        </Badge>

                        {/* Heading */}
                        <Heading>

                            <span className="block">Something</span>

                            <span className="block bg-gradient-to-r from-white via-blue-100 to-zinc-500 bg-clip-text text-transparent">
                                Awesome
                            </span>

                            <span className="block">
                                is Coming Soon.
                            </span>

                        </Heading>

                        {/* Description */}
                        <Text className="mt-10 max-w-2xl">
                            A premium destination for programmers to learn through
                            roadmaps, notes, projects, tutorials and practical
                            resources.
                        </Text>

                        <div className="mt-12 flex flex-col gap-4 sm:flex-row">

                            <Button 
                            size="lg" 
                            aria-label="Explore the upcoming Coder Tushar website"
                            >
                                Explore Soon
                            </Button>

                            <Button 
                            variant="secondary" 
                            size="lg" 
                            aria-label="Follow the development journey"
                            >
                                Follow Journey
                            </Button>

                        </div>

                        <div className="mt-16 grid grid-cols-2 gap-6 border-t border-white/10 pt-8 md:grid-cols-4">
                            <StatItem
                                title="Blogs"
                                status="In Progress"
                            />

                            <StatItem
                                title="Projects"
                                status="In Progress"
                            />

                            <StatItem
                                title="Notes"
                                status="In Progress"
                            />

                            <StatItem
                                title="Roadmaps"
                                status="In Progress"
                            />
                        </div>
                    </div>
                    <div className="hidden items-center justify-center lg:flex">
                        <HeroVisual />
                    </div>

                </motion.div>
            </Container>
        </Section>
    );
}
