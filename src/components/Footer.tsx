"use client";
import { Mail, Phone, Sparkles, Clock } from "lucide-react";
import { Separator } from "./ui/separator";
import CenterUnderline from "./animation/CenterUnderline ";
import { birthdayStore } from "@/Store/birthdayStore";
import { useEffect } from "react";
import { motion } from "motion/react";

function Footer() {
  const { formattedDate, formattedTime, formattedYear, updateFormattedDate } =
    birthdayStore();

  useEffect(() => {
    updateFormattedDate(); // Update immediately
    const timer = setInterval(updateFormattedDate, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <footer className=" min-h-screen py-32 px-14 ">
      <div className="container mx-auto ">
        <div className=" space-y-10">
          <div>
            <div className="flex space-x-2">
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: 360,
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "linear",
                }}
              >
                <Sparkles className="h-6 w-6 text-primary" />
              </motion.div>
              <h3 className="font-serif text-xl font-medium">
                ¡ES MI CUMPLEAÑOS!
              </h3>
            </div>
            <div className="space-y-2 text-muted-foreground">
              <div className="flex items-center gap-2 font-serif">
                <Clock className="h-4 w-4" />
                <p>{formattedDate}</p>
                <p className="font-serif pl-6">{formattedTime}</p>
              </div>
            </div>
          </div>

          {/* Social Links */}

          <div className="flex flex-col gap-2">
            <h1 className="font-serif text-xl font-medium">FOLLOW ME:</h1>
            <a
              href="https://x.com/Dacron4show?t=-XZuMFlvkKQK5xz1w-NrSA&s=09"
              target="_blank"
              rel="noopener noreferrer"
            >
              <CenterUnderline
                label=" X (Twitter)"
                className="font-serif text-muted-foreground"
              />
            </a>
            <a href="/Github.svg" target="_blank" rel="noopener noreferrer">
              <CenterUnderline
                label="Github"
                className="font-serif text-muted-foreground"
              />
            </a>
          </div>

          {/* Contact Info */}

          <div className="space-y-4">
            <h1 className="font-serif text-xl font-medium">CONTACT ME:</h1>
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <CenterUnderline
                  label="favouradebimpe63@gmail.com"
                  className="font-serif"
                />
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4" />
                <p className="font-serif">Call +2348125813782</p>
              </div>
            </div>
          </div>

          <Separator className="my-8" />

          {/* Copyright */}

          <div className="flex justify-between">
            <h1 className="text-muted-foreground text-sm">
              © {formattedYear} Adebimpe Favour. All Rights Reserved.
            </h1>
            <Sparkles className="h-6 w-6 text-primary" />
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
