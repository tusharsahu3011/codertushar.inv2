"use client";

import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import {
    BookOpen,
    Route,
    FolderGit2,
    GraduationCap,
    Boxes,
    Users,
} from "lucide-react";
import FeatureCard from "./FeatureCard";
import Reveal from "@/components/ui/Reveal";

const features = [
    {
        icon: BookOpen,
        title: "Programming Notes",
        description:
            "Beginner-friendly notes covering programming concepts in a simple and practical way.",
        color: "blue",
    },
    {
        icon: Route,
        title: "Learning Roadmaps",
        description:
            "Step-by-step roadmaps to help you master programming without confusion.",
        color: "violet",
    },
    {
        icon: FolderGit2,
        title: "Real Projects",
        description:
            "Build practical projects and improve your development skills with hands-on experience.",
        color: "cyan",
    },
    {
        icon: GraduationCap,
        title: "Tutorials",
        description:
            "Easy-to-follow tutorials designed especially for beginners and students.",
        color: "emerald",
    },
    {
        icon: Boxes,
        title: "Resources",
        description:
            "Cheat sheets, templates, tools and downloadable resources to speed up your learning.",
        color: "amber",
    },
    {
        icon: Users,
        title: "Community",
        description:
            "Join a growing community of learners and build your programming journey together.",
        color: "pink",
    },
];

export default function Features() {
    return (
        <Section>
            <Container>
                <Reveal>
                    <div className="mb-14 text-center">

                        <p className="mb-3 text-sm uppercase tracking-[0.3em] text-blue-400">
                            {"What's Coming"}
                        </p>

                        <h2 className="text-4xl font-bold text-white md:text-5xl">
                            Everything You Need
                        </h2>

                        <p className="mx-auto mt-6 max-w-2xl text-zinc-400">
                            A complete platform designed to help beginners learn
                            programming with practical resources and real projects.
                        </p>

                    </div>
                </Reveal>
                <Reveal>
                    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                        {features.map((feature) => {
                            return (
                                <FeatureCard
                                    key={feature.title}
                                    icon={feature.icon}
                                    title={feature.title}
                                    description={feature.description}
                                    color={feature.color}
                                />
                            );
                        })}
                    </div>
                </Reveal>

            </Container>
        </Section>
    );
}
