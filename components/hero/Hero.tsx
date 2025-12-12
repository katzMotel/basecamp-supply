'use client';

import Image from "next/image";
import Link from "next/link";   
import { Button } from "../ui";

export function Hero() {
  return (
    <section className="px-4 md:px-8 pt-6 pb-12">
      <div className="relative h-[60vh] w-full max-w-7xl mx-auto overflow-hidden rounded-2xl shadow-2xl">
        {/* Layer 1: Background Image - no overlay! */}
        <div className="absolute inset-0">
          <Image
            src="/images/grand-canyon.jpeg"
            alt="Grand Canyon vista"
            fill
            className="object-cover"
            priority
          />
        </div>
        
        {/* Layer 2: Gradient ONLY at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        
        {/* Layer 3: Text at bottom */}
        <div className="relative z-10 h-full flex items-end pb-12">
          <div className="px-8 md:px-16 max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
              Gear Up for Adventure
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-6">
              Quality equipment for the trail ahead
            </p>
            <Link href="#products">
              <Button variant="primary" size="lg">
                Explore Collection
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
