"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/icons/Logo";
import { SoundWaveAnimation } from "@/components/SoundWaveAnimation";

export default function SplashPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      // In a real app, you might check for an auth token here
      const hasSeenOnboarding =
        typeof window !== "undefined"
          ? localStorage.getItem("hasSeenOnboarding")
          : false;

      if (hasSeenOnboarding) {
        router.replace("/login");
      } else {
        router.replace("/onboarding");
      }
    }, 3000); // 3-second delay

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground animate-fadeIn">
      <div className="flex flex-col items-center gap-8">
        <Logo className="h-24 w-24 text-primary" />
        <SoundWaveAnimation />
      </div>
      <p className="absolute bottom-10 text-lg tracking-wider text-accent">
        Listen. Unlock. Enjoy.
      </p>
    </main>
  );
}
