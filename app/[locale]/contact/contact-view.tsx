"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Send } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";

export default function ContactView() {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "ok" | "err"; text: string } | null>(
    null
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFeedback(null);
    const form = e.currentTarget;
    const fd = new FormData(form);
    const name = String(fd.get("name") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const message = String(fd.get("message") ?? "").trim();

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setFeedback({
          type: "err",
          text:
            typeof data.error === "string" ? data.error : t("contact.errorGeneric"),
        });
        return;
      }

      setFeedback({ type: "ok", text: t("contact.success") });
      form.reset();
    } catch {
      setFeedback({ type: "err", text: t("contact.errorNetwork") });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl font-bold mb-4">{t("contact.title")}</h1>
        <p className="text-muted-foreground text-lg">{t("contact.subtitle")}</p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-8"
        >
          <div className="flex items-start gap-4">
            <div className="p-3 bg-primary/10 rounded-xl text-primary">
              <Mail />
            </div>
            <div>
              <h3 className="font-semibold text-lg">{t("contact.emailLabel")}</h3>
              <p className="text-muted-foreground">mrsarunpatbook3@gmail.com</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="p-3 bg-primary/10 rounded-xl text-primary">
              <MapPin />
            </div>
            <div>
              <h3 className="font-semibold text-lg">{t("contact.locationLabel")}</h3>
              <p className="text-muted-foreground">{t("contact.locationValue")}</p>
            </div>
          </div>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          onSubmit={handleSubmit}
          className="space-y-6 bg-card p-8 rounded-2xl border shadow-sm"
        >
          {feedback && (
            <p
              role="status"
              className={
                feedback.type === "ok"
                  ? "text-sm text-green-600 dark:text-green-400"
                  : "text-sm text-destructive"
              }
            >
              {feedback.text}
            </p>
          )}
          <div className="space-y-2">
            <label htmlFor="contact-name" className="text-sm font-medium">
              {t("contact.nameLabel")}
            </label>
            <Input
              id="contact-name"
              name="name"
              required
              placeholder={t("contact.namePlaceholder")}
              className="rounded-xl"
              autoComplete="name"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="contact-email" className="text-sm font-medium">
              {t("contact.emailFieldLabel")}
            </label>
            <Input
              id="contact-email"
              name="email"
              required
              type="email"
              placeholder={t("contact.emailPlaceholder")}
              className="rounded-xl"
              autoComplete="email"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="contact-message" className="text-sm font-medium">
              {t("contact.messageLabel")}
            </label>
            <Textarea
              id="contact-message"
              name="message"
              required
              placeholder={t("contact.messagePlaceholder")}
              className="rounded-xl min-h-[120px]"
            />
          </div>
          <Button type="submit" className="w-full rounded-xl" disabled={isSubmitting}>
            {isSubmitting ? t("contact.submitting") : t("contact.submit")}
            {!isSubmitting && <Send className="w-4 h-4 ml-2" />}
          </Button>
        </motion.form>
      </div>
    </div>
  );
}
