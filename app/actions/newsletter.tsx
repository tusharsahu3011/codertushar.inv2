"use server";

import WelcomeEmail from "@/emails/WelcomeEmail";

import { resend } from "@/lib/resend";
import { supabase } from "@/lib/supabase";

const emailRegex =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function subscribe(
  email: string,
  turnstileToken: string
) {

  const value =
    email.trim().toLowerCase();

  /* ============================= */
  /* Validation                    */
  /* ============================= */

  if (!value) {
    return {
      success: false,
      message:
        "Please enter your email address.",
    };
  }

  if (!emailRegex.test(value)) {
    return {
      success: false,
      message:
        "Please enter a valid email address.",
    };
  }

  if (!turnstileToken) {
    return {
      success: false,
      message:
        "Security verification failed.",
    };
  }

  /* ============================= */
  /* Verify Cloudflare Turnstile   */
  /* ============================= */

  const verifyResponse =
    await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          secret:
            process.env
              .TURNSTILE_SECRET_KEY!,
          response:
            turnstileToken,
        }),
      }
    );

  const verification =
    await verifyResponse.json();

  if (!verification.success) {

    console.error(
      "Turnstile:",
      verification
    );

    return {
      success: false,
      message:
        "Verification failed. Please try again.",
    };

  }

  /* ============================= */
  /* Duplicate Check               */
  /* ============================= */

  const {
    data: existing,
    error: existingError,
  } = await supabase
    .from("waitlist")
    .select("id")
    .eq("email", value)
    .maybeSingle();

  if (existingError) {

    console.error(existingError);

    return {
      success: false,
      message:
        "Unable to verify your email.",
    };

  }

  if (existing) {

    return {
      success: false,
      message:
        "You're already on the waitlist 🚀",
    };

  }
  /* ============================= */
  /* Save Email                    */
  /* ============================= */

  const { error: insertError } =
    await supabase
      .from("waitlist")
      .insert({
        email: value,
      });

  if (insertError) {

    console.error(insertError);

    return {
      success: false,
      message:
        "Unable to join the waitlist.",
    };

  }

  /* ============================= */
  /* Send Welcome Email            */
  /* ============================= */

  const {
    error: emailError,
  } = await resend.emails.send({

    from:
      "Coder Tushar <hello@codertushar.in>",

    to: value,

    subject:
      "🎉 Welcome to the Coder Tushar Waitlist",

    react: (
      <WelcomeEmail
        name="Developer"
        email={value}
      />
    ),

  });

  if (emailError) {

    console.error(
      "Resend:",
      emailError
    );

    /*
     * Don't fail the signup if the
     * welcome email couldn't be sent.
     * The email is already saved in Supabase.
     */

    return {
      success: true,
      message:
        "You're on the waitlist! We couldn't send the welcome email right now, but your spot is confirmed.",
    };

  }

  /* ============================= */
  /* Success                       */
  /* ============================= */

  return {

    success: true,

    message:
      "🎉 Welcome aboard! Check your inbox for your welcome email.",

  };

}