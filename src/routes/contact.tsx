import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact BikeZone — Showrooms & Support" },
      {
        name: "description",
        content:
          "Talk to the BikeZone team about a bike, a booking or a valuation. Call, email or send us a message.",
      },
      { property: "og:title", content: "Contact BikeZone — Showrooms & Support" },
      {
        property: "og:description",
        content: "Reach our motorcycle specialists seven days a week.",
      },
    ],
  }),
  component: Contact,
});

const schema = z.object({
  name: z.string().trim().min(2, "Enter your full name").max(80),
  email: z.string().trim().email("Enter a valid email").max(160),
  phone: z.string().trim().min(8, "Enter a valid phone number").max(20),
  message: z.string().trim().min(10, "Tell us a bit more").max(1000),
});

function Contact() {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const parsed = schema.safeParse(Object.fromEntries(form));
    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0]);
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      return;
    }
    setErrors({});
    e.currentTarget.reset();
    toast.success("Message sent — we'll reply within one working day.");
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-14">
      <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary">Talk to us</p>
      <h1 className="mt-2 text-5xl">Contact BikeZone</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        Questions on stock, finance or a trade-in? Our specialists answer seven days a week.
      </p>

      <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
        <form onSubmit={submit} className="rounded-xl border border-border bg-card p-7" noValidate>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Full name" name="name" error={errors["name"]} placeholder="Rider name" />
            <Field
              label="Email"
              name="email"
              type="email"
              error={errors["email"]}
              placeholder="you@email.com"
            />
            <Field
              label="Phone"
              name="phone"
              error={errors["phone"]}
              placeholder="+91 90000 00000"
            />
            <div className="grid gap-2">
              <Label htmlFor="topic">Topic</Label>
              <select
                id="topic"
                name="topic"
                className="h-10 rounded-md border border-input bg-secondary/60 px-3 text-sm"
              >
                <option>Buying a bike</option>
                <option>Selling my bike</option>
                <option>Finance & EMI</option>
                <option>Service support</option>
              </select>
            </div>
          </div>
          <div className="mt-5 grid gap-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              name="message"
              rows={5}
              maxLength={1000}
              placeholder="Tell us which bike you're after…"
              className="bg-secondary/60"
            />
            {errors["message"] && (
              <p className="text-xs text-destructive">{errors["message"]}</p>
            )}
          </div>
          <Button type="submit" size="lg" className="mt-6 font-semibold">
            Send message
          </Button>
        </form>

        <aside className="grid h-fit gap-4">
          {[
            { Icon: Phone, title: "Call us", text: "+91 90000 12345" },
            { Icon: Mail, title: "Email", text: "hello@bikezone.in" },
            { Icon: MapPin, title: "Flagship showroom", text: "12 Ember Lane, Bengaluru 560001" },
            { Icon: Clock, title: "Open", text: "Mon–Sun · 9:00 to 20:00" },
          ].map(({ Icon, title, text }) => (
            <div key={title} className="rounded-xl border border-border bg-card p-5">
              <Icon className="h-5 w-5 text-primary" />
              <h2 className="mt-3 text-lg font-semibold">{title}</h2>
              <p className="text-sm text-muted-foreground">{text}</p>
            </div>
          ))}
        </aside>
      </div>
    </div>
  );
}

function Field({
  label,
  name,
  error,
  type = "text",
  placeholder,
}: {
  label: string;
  name: string;
  error?: string | undefined;
  type?: string | undefined;
  placeholder?: string | undefined;
}) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={name}>{label}</Label>
      <Input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        maxLength={160}
        className="bg-secondary/60"
      />
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
