import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Create Account | BikeZone" },
      {
        name: "description",
        content: "Create a free BikeZone account to save bikes, book test rides and unlock offers.",
      },
      { property: "og:title", content: "Create Account | BikeZone" },
      { property: "og:description", content: "Join BikeZone in under a minute." },
    ],
  }),
  component: Signup,
});

const schema = z.object({
  name: z.string().trim().min(2, "Enter your full name").max(80),
  email: z.string().trim().email("Enter a valid email").max(160),
  phone: z.string().trim().min(8, "Enter a valid phone number").max(20),
  password: z.string().min(6, "Password must be at least 6 characters").max(72),
});

function Signup() {
  const { signIn } = useStore();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Check your details");
      return;
    }
    setError("");
    signIn({ name: parsed.data.name, email: parsed.data.email });
    toast.success("Account created — happy hunting!");
    navigate({ to: "/" });
  };

  return (
    <div className="mx-auto max-w-md px-4 py-20">
      <h1 className="text-5xl">Join BikeZone</h1>
      <p className="mt-3 text-muted-foreground">
        Save bikes, book test rides and get first access to price drops.
      </p>

      <form onSubmit={submit} className="mt-8 rounded-xl border border-border bg-card p-7" noValidate>
        <div className="grid gap-5">
          <div className="grid gap-2">
            <Label htmlFor="name">Full name</Label>
            <Input id="name" name="name" placeholder="Rider name" className="bg-secondary/60" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" placeholder="you@email.com" className="bg-secondary/60" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" name="phone" placeholder="+91 90000 00000" className="bg-secondary/60" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" placeholder="••••••••" className="bg-secondary/60" />
          </div>
        </div>
        {error && <p className="mt-3 text-xs text-destructive">{error}</p>}
        <Button type="submit" size="lg" className="mt-6 w-full font-semibold">
          Create account
        </Button>
        <p className="mt-5 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-primary">
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
}
