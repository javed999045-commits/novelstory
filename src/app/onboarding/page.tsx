"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Headphones, Coins, Download, Lock, Music } from "lucide-react";
import { useRouter } from "next/navigation";

const onboardingSlides = [
  {
    icon: (
      <div className="relative flex h-24 w-24 items-center justify-center">
        <Headphones className="h-24 w-24 text-primary" />
        <Music className="absolute -right-2 -top-2 h-8 w-8 text-accent" />
      </div>
    ),
    title: "Unlimited Audio Stories & Podcasts",
    subtitle: "Pay only for what you listen",
  },
  {
    icon: (
      <div className="relative flex h-24 w-24 items-center justify-center">
        <Coins className="h-24 w-24 text-primary" />
        <Headphones className="absolute bottom-0 right-0 h-10 w-10 text-accent opacity-75" />
      </div>
    ),
    title: "Smart Coin System",
    subtitle: "Buy coins, unlock episodes, no monthly fees",
  },
  {
    icon: (
      <div className="relative flex h-24 w-24 items-center justify-center">
        <Download className="h-24 w-24 text-primary" />
        <Lock className="absolute bottom-0 right-0 h-10 w-10 text-accent" />
      </div>
    ),
    title: "Listen Offline Securely",
    subtitle: "Download and listen anywhere - files are protected",
  },
];

export default function OnboardingPage() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const router = useRouter();

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap());

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    api.on("select", onSelect);

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  const handleGetStarted = () => {
    localStorage.setItem("hasSeenOnboarding", "true");
    router.push("/login");
  };

  return (
    <main className="flex flex-col items-center justify-between min-h-screen bg-background text-foreground p-6">
      <div className="w-full max-w-md flex-grow flex flex-col justify-center">
        <Carousel setApi={setApi} className="w-full">
          <CarouselContent>
            {onboardingSlides.map((slide, index) => (
              <CarouselItem key={index}>
                <div className="flex flex-col items-center justify-center text-center p-4 min-h-[40vh]">
                  <div className="mb-12">{slide.icon}</div>
                  <h2 className="text-2xl font-bold font-headline mb-2 text-white">
                    {slide.title}
                  </h2>
                  <p className="text-muted-foreground">{slide.subtitle}</p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      <div className="flex flex-col items-center w-full max-w-md pb-4">
        <div className="flex gap-2 my-8">
          {onboardingSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                current === index ? "w-6 bg-primary" : "w-2 bg-muted"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <div className="h-14 w-full">
          {current === onboardingSlides.length - 1 && (
            <Button
              onClick={handleGetStarted}
              size="lg"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg animate-fadeIn"
            >
              Get Started
            </Button>
          )}
        </div>
      </div>
    </main>
  );
}
