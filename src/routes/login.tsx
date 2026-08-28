import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Login | BikeZone" },
      {
        name: "description",
        content: "Sign in to your BikeZone account to track bookings, wishlists and offers.",
      },
      { property: "og:title", content: "Login | BikeZone" },
      { property: "og:description", content: "Access your BikeZone rider account." },
    ],
  }),
  component: Login,
});

const schema = z.object({
  email: z.string().trim().email("Enter a valid email").max(160),
  password: z.string().min(6, "Password must be at least 6 characters").max(72),
});

function Login() {
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
    const name = parsed.data.email.split("@")[0] ?? "Rider";
    signIn({ name, email: parsed.data.email });
    toast.success("Welcome back to BikeZone");
    navigate({ to: "/" });
  };

  return (
    <div className="mx-auto max-w-md px-4 py-20">
      <h1 className="text-5xl">Welcome back</h1>
      <p className="mt-3 text-muted-foreground">
        Sign in to sync your wishlist, bookings and saved searches.
      </p>

      <form onSubmit={submit} className="mt-8 rounded-xl border border-border bg-card p-7" noValidate>
        <div className="grid gap-5">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" placeholder="you@email.com" className="bg-secondary/60" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" placeholder="••••••••" className="bg-secondary/60" />
          </div>
        </div>
        {error && <p className="mt-3 text-xs text-destructive">{error}</p>}
        <Button type="submit" size="lg" className="mt-6 w-full font-semibold">
          Sign in
        </Button>
        <p className="mt-5 text-center text-sm text-muted-foreground">
          New to BikeZone?{" "}
          <Link to="/signup" className="font-semibold text-primary">
            Create an account
          </Link>
        </p>
      </form>
    </div>
  );
}
