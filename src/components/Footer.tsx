"use client";
import { Mail, Phone, Sparkles, Clock } from "lucide-react";
import { Separator } from "./ui/separator";
import CenterUnderline from "./animation/CenterUnderline ";
import { motion, type Variants } from "motion/react";
import { format } from "date-fns";
import { useEffect, useState } from "react";

const TWITTER_URL = "https://x.com/Dacron4show?t=-XZuMFlvkKQK5xz1w-NrSA&s=09";
// TODO: replace with your real GitHub profile URL
const GITHUB_URL = "https://github.com/Proton-number";
const EMAIL = "favouradebimpe63@gmail.com";
const PHONE_DISPLAY = "+2348125813782";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

function Footer() {
  // null on the server and first render, so server and client match (no hydration warning)
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const year = format(new Date(), "yyyy");

  return (
    <footer className="bg-[#f1e6e0] px-6 py-24 md:px-14 md:py-32">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="container mx-auto"
      >
        <div className="grid gap-12 md:grid-cols-2">
          {/* Left: birthday + live clock */}
          <motion.div variants={item} className="space-y-4">
            <div className="flex items-center space-x-2">
              <motion.div
                animate={{ scale: [1, 1.2, 1], rotate: 360 }}
                transition={{
                  rotate: { duration: 6, repeat: Infinity, ease: "linear" },
                  scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                }}
              >
                <Sparkles className="h-6 w-6 text-primary" />
              </motion.div>
              <h2 className="font-serif text-xl font-medium">
                ¡ES MI CUMPLEAÑOS!
              </h2>
            </div>

            <div className="flex items-center gap-2 font-serif text-muted-foreground">
              <Clock className="h-4 w-4" />
              <time dateTime={now?.toISOString()}>
                {now ? format(now, "MMM dd, yyyy") : "—"}
              </time>
              <p className="pl-6 tabular-nums">
                {now ? format(now, "HH:mm:ss") : "--:--:--"}
              </p>
            </div>
          </motion.div>

          {/* Right: social + contact */}
          <div className="space-y-10">
            <motion.div variants={item} className="flex flex-col gap-2">
              <h2 className="font-serif text-xl font-medium">FOLLOW ME:</h2>
              <a href={TWITTER_URL} target="_blank" rel="noopener noreferrer">
                <CenterUnderline
                  label=" X (Twitter)"
                  className="font-serif text-muted-foreground"
                />
              </a>
              <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
                <CenterUnderline
                  label="Github"
                  className="font-serif text-muted-foreground"
                />
              </a>
            </motion.div>

            <motion.div variants={item} className="space-y-4">
              <h2 className="font-serif text-xl font-medium">CONTACT ME:</h2>
              <div className="space-y-4">
                <a href={`mailto:${EMAIL}`}>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    <CenterUnderline label={EMAIL} className="font-serif" />
                  </div>
                </a>
                <a href={`tel:${PHONE_DISPLAY}`}>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    <CenterUnderline
                      label={`Call ${PHONE_DISPLAY}`}
                      className="font-serif"
                    />
                  </div>
                </a>
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div variants={item}>
          <Separator className="my-12" />

          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              © {year} Adebimpe Favour. All Rights Reserved.
            </p>
            <Sparkles className="h-6 w-6 text-primary" />
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
}

export default Footer;
