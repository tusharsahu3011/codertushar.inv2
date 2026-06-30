"use server";

import { supabase } from "@/lib/supabase";

const emailRegex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function subscribe(email: string) {
    const value = email.trim().toLowerCase();

    if (!value) {
        return {
            success: false,
            message: "Please enter your email.",
        };
    }

    if (!emailRegex.test(value)) {
        return {
            success: false,
            message: "Please enter a valid email.",
        };
    }

    const { data: existing, error: existingError } =
        await supabase
            .from("waitlist")
            .select("id")
            .eq("email", value)
            .maybeSingle();

    if (existingError) {
        return {
            success: false,
            message: "Something went wrong.",
        };
    }

    if (existing) {
        return {
            success: false,
            message: "You're already on the waitlist 🚀",
        };
    }

   const { error } = await supabase
    .from("waitlist")
    .insert({
        email: value,
    });

if (error) {
    console.error(error);

    return {
        success: false,
        message: error.message,
    };
}

    return {
        success: true,
        message:
            "Welcome aboard 🚀 You'll be notified when we launch.",
    };
}