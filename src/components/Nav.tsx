"use client";

import Image from "next/image";
import React from "react";

export default function Nav() {
  return (
    <div>
      <nav className="flex justify-between  p-11">
        <h2>Adebimpe Favour</h2>

        <div className="flex items-center space-x-6">
          {[
            {
              source: "/Github.svg",
              alt: "Github-icon",
              path: "https://github.com/Proton-number",
            },
            {
              source: "/Twitter.svg",
              alt: "Twitter-icon",
              path: "https://x.com/Dacron4show?t=-XZuMFlvkKQK5xz1w-NrSA&s=09",
            },
            {
              source: "/Instagram.svg",
              alt: "Instagram-icon",
              path: "https://www.instagram.com/dacron4show/",
            },
          ].map((image, index) => (
            <div key={index}>
              <a href={image.path} target="_blank" rel="noopener noreferrer">
                <Image
                  src={image.source}
                  alt={image.alt}
                  width={20}
                  height={20}
                />
              </a>
            </div>
          ))}
        </div>
      </nav>
    </div>
  );
}
