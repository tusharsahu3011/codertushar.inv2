"use server";

import WelcomeEmail from "@/emails/WelcomeEmail";

import { resend } from "@/lib/resend";
import { supabase } from "@/lib/supabase";

const emailRegex =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
type SubscribeResult = {
  status:
  | "success"
  | "duplicate"
  | "email_failed"
  | "validation_error"
  | "verification_error"
  | "server_error";

  message: string;
};

export async function subscribe(
  email: string,
  turnstileToken: string
): Promise<SubscribeResult> {

  const value =
    email.trim().toLowerCase();

  /* ============================= */
  /* Validation                    */
  /* ============================= */

  if (!value) {
    return {
      status: "validation_error",
      message: "Please enter your email address.",
    };
  }

  if (!emailRegex.test(value)) {
    return {
      status: "validation_error",
      message: "Please enter a valid email address.",
    };
  }

  if (!turnstileToken) {
    return {
      status: "verification_error",
      message: "Security verification failed.",
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
      status: "verification_error",
      message: "Verification failed. Please try again.",
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
    .select("id, duplicate_reminder_sent_at")
    .eq("email", value)
    .maybeSingle();

  if (existingError) {

    console.error(existingError);

    return {
      status: "server_error",
      message: "Unable to verify your email.",
    };

  }

  if (existing) {

    /*
     * Already on the waitlist. Send a
     * reminder email, but only the very
     * first time — repeated submits for the
     * same (already-registered) email must
     * NOT trigger another email.
     */

    if (!existing.duplicate_reminder_sent_at) {

      const {
        error: reminderEmailError,
      } = await resend.emails.send({

        from:
          "Coder Tushar <hello@codertushar.in>",

        to: value,

        subject:
          "You're already on the Coder Tushar Waitlist",

        react: (
          <WelcomeEmail
            name="Developer"
            email={value}
          />
        ),

      });

      if (reminderEmailError) {

        console.error(
          "Resend (duplicate reminder):",
          reminderEmailError
        );

        /*
         * Don't fail the request just
         * because the reminder email
         * couldn't be sent — the user is
         * still on the waitlist either way.
         */

      } else {

        const {
          error: markSentError,
        } = await supabase
          .from("waitlist")
          .update({
            duplicate_reminder_sent_at:
              new Date().toISOString(),
          })
          .eq("id", existing.id);

        if (markSentError) {

          console.error(
            "Supabase (mark reminder sent):",
            markSentError
          );

        }

      }

    }

    return {
      status: "duplicate",
      message:
        "You're already on our waitlist. We'll notify you when we launch.",
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
      status: "server_error",
      message: "Unable to join the waitlist.",
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
      status: "email_failed",
      message:
        "You're on the waitlist! Your spot is confirmed, but we couldn't send the welcome email right now.",
    };

  }

  /* ============================= */
  /* Success                       */
  /* ============================= */

  return {
    status: "success",
    message:
      "You're officially on the waitlist. We'll notify you when we launch.",
  };

}