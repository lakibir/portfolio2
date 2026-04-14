"use client";

import { useState } from "react";

import { LoaderCircle, Mail, MapPin, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { siteConfig } from "@/lib/portfolio";
import type { ContactInput } from "@/lib/validations/contact";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

const defaultValues: ContactInput = {
  name: "",
  email: "",
  message: "",
  company: "",
};

export function ContactSection() {
  const [requestState, setRequestState] = useState<"idle" | "success" | "error">("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({ defaultValues });

  const onSubmit = handleSubmit(async (values) => {
    setRequestState("idle");

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    if (!response.ok) {
      let errorMessage = "Message could not be sent. Check your email settings and try again.";

      try {
        const body = (await response.json()) as { message?: string };
        if (body?.message) {
          errorMessage = body.message;
        }
      } catch {
        // Keep fallback message when response body cannot be parsed.
      }

      setRequestState("error");
      toast.error(errorMessage);
      return;
    }

    reset(defaultValues);
    setRequestState("success");
    toast.success("Message sent. I will get back to you shortly.");
  });

  return (
    <section id="contact" className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12">
        <Reveal>
          <SectionHeading
            eyebrow="Contact"
            title="Let's work together"
            description="Share your project goals and timeline."
          />
          <div className="mt-8 grid gap-4">
            <div className="rounded-[1.75rem] border border-white/10 bg-white/6 p-5 backdrop-blur-xl">
              <p className="inline-flex items-center gap-2 text-sm font-medium text-foreground">
                <Mail className="h-4 w-4 text-accent" />
                {siteConfig.email}
              </p>
            </div>
            <div className="rounded-[1.75rem] border border-white/10 bg-white/6 p-5 backdrop-blur-xl">
              <p className="inline-flex items-center gap-2 text-sm font-medium text-foreground">
                <MapPin className="h-4 w-4 text-accent" />
                {siteConfig.location}
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal className="rounded-4xl border border-white/10 bg-white/6 p-6 backdrop-blur-xl" delay={0.08}>
          <form className="space-y-5" onSubmit={onSubmit} noValidate>
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="grid gap-2 text-sm text-muted">
                Name
                <input
                  {...register("name", { required: "Please enter your name.", minLength: 2 })}
                  className="rounded-2xl border border-white/10 bg-background/70 px-4 py-3 text-foreground outline-none transition focus:border-accent"
                  placeholder="Your name"
                />
                {errors.name ? <span className="text-sm text-red-300">{errors.name.message}</span> : null}
              </label>

              <label className="grid gap-2 text-sm text-muted">
                Email
                <input
                  {...register("email", {
                    required: "Please enter your email.",
                    pattern: {
                      value: /^\S+@\S+\.\S+$/,
                      message: "Enter a valid email address.",
                    },
                  })}
                  className="rounded-2xl border border-white/10 bg-background/70 px-4 py-3 text-foreground outline-none transition focus:border-accent"
                  placeholder="name@company.com"
                  type="email"
                />
                {errors.email ? <span className="text-sm text-red-300">{errors.email.message}</span> : null}
              </label>
            </div>

            <label className="hidden" aria-hidden="true">
              Company
              <input tabIndex={-1} autoComplete="off" {...register("company")} />
            </label>

            <label className="grid gap-2 text-sm text-muted">
              Message
              <textarea
                {...register("message", {
                  required: "Please add a short project brief.",
                  minLength: {
                    value: 20,
                    message: "Please provide at least 20 characters.",
                  },
                })}
                className="min-h-40 rounded-3xl border border-white/10 bg-background/70 px-4 py-3 text-foreground outline-none transition focus:border-accent"
                placeholder="Tell me about your role, project scope, timeline, or what you are trying to improve."
              />
              {errors.message ? <span className="text-sm text-red-300">{errors.message.message}</span> : null}
            </label>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center rounded-full bg-accent px-5 py-3 text-sm font-medium text-accent-foreground transition hover:-translate-y-px disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? (
                  <>
                    <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Send message
                  </>
                )}
              </button>

              <p className="text-sm text-muted">
                {requestState === "success"
                  ? "Your message has been delivered successfully."
                  : requestState === "error"
                    ? "Submission failed. Check EMAIL_USER and EMAIL_PASS."
                    : "Usually replies within 1 business day."}
              </p>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
