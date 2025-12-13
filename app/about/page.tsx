import Image from 'next/image';
import Link from 'next/link';
import { Button, Card } from '@/components/ui';
import { Mountain, Shield, Users } from 'lucide-react';

export default function AboutPage() {
  return (
    <main className="min-h-screen relative z-10">
      {/* Hero Section */}
      <section className="h-[40vh] bg-gradient-to-br from-green-900 to-green-700 flex items-center justify-center">
        <div className="text-center text-white px-4">
          <h1 className="font-heading text-5xl md:text-6xl font-bold mb-4">About Basecamp Supply</h1>
          <p className="text-xl md:text-2xl">Born on the Trail, Built for Adventurers</p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <h2 className="font-heading text-4xl font-bold text-gray-900 dark:text-white mb-8">Our Story</h2>
          
          <div className="space-y-6 text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            <p>
              Basecamp Supply started with a simple realization during a multi-day trek through the Grand Canyon. 
              Six miles into the descent, my gear began to fail – a broken strap here, a torn seam there. 
              By the time I reached the Colorado River, I'd jury-rigged half my equipment with paracord and duct tape.
            </p>
            
            <p>
              That trip changed everything. I spent the climb back out thinking about the gear we trust with our safety, 
              our comfort, our entire outdoor experience. Why settle for equipment that barely makes it through one adventure?
            </p>
            
            <p>
              Basecamp Supply was born from that frustration. We're not here to sell you the cheapest gear or the flashiest trends. 
              We're here to outfit you with equipment that earns your trust – tested on real trails, chosen by people who actually use it, 
              and backed by our commitment that if it's not good enough for our own adventures, we won't sell it to you.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h2 className="font-heading text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">
            What We Stand For
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Value 1 */}
            <Card className="p-8 text-center">
              <Mountain className="w-12 h-12 mx-auto mb-4 text-green-700 dark:text-green-500" />
              <h3 className="font-heading text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Trail-Tested Quality
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Every product we carry has been put through real-world conditions. 
                No marketing fluff – just gear that performs when it matters most.
              </p>
            </Card>

            {/* Value 2 */}
            <Card className="p-8 text-center">
              <Shield className="w-12 h-12 mx-auto mb-4 text-green-700 dark:text-green-500" />
              <h3 className="font-heading text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Honest Expertise
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                We're outdoor enthusiasts first, retailers second. 
                Our recommendations come from experience, not sales targets.
              </p>
            </Card>

            {/* Value 3 */}
            <Card className="p-8 text-center">
              <Users className="w-12 h-12 mx-auto mb-4 text-green-700 dark:text-green-500" />
              <h3 className="font-heading text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Community Driven
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Your feedback shapes our selection. We listen to fellow adventurers 
                because the best gear recommendations come from those who've been there.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-heading text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Ready to Gear Up?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            Explore our curated collection of equipment you can actually trust. 
            Every item backed by real experience and a commitment to your next adventure.
          </p>
          <Link href="/">
            <Button variant="primary" size="lg">
              Explore Our Collection
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}