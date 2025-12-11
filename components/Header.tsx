'use client';

import { ThemeToggle } from './ui';
import { useAppSelector } from '@/lib/redux/hooks';
import { ShoppingCart } from 'lucide-react';  // Import Lucide icon
import { useState, useEffect } from 'react';
import { CartDrawer } from './cart/CartDrawer';
import Image from 'next/image';
import Link from 'next/link';
import { useScrollDirection } from '@/hooks/useScrollDirection';
export function Header() {
  const { items } = useAppSelector((state) => state.cart);
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const scrollDirection = useScrollDirection();

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  },[]);
  return (
    <>
    <header className={`
              sticky top-0 z-50
              flex justify-center items-center relative
              p-4
              bg-white dark:bg-[#0a0a0a]
              ${isScrolled ? 'border-b border-gray-200 dark:border-gray-800' : ''} 
              transition-transform duration-300 ease-in-out
              ${scrollDirection === 'down'? '-translate-y-full' : 'translate-y-0'}
      `}>
  {/* Logo - centered */}
  <Link href="/" className="flex items-center">
    <Image
      src="/store-logo-v2.png"
      alt="Basecamp Supply"
      width={180}
      height={50}
      priority
      className="h-24 w-auto rounded-lg transition-all hover:scale-105 hover:drop-shadow-lg dark:invert"
    />
  </Link>
  
  {/* Cart & Theme - absolute positioned to right */}
  <div className="absolute right-0 flex items-center gap-4">
    {/* Cart Button */}
    <button 
      onClick={() => setIsCartOpen(true)}
      className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
      aria-label="Shopping cart"
    >
      <ShoppingCart className="w-6 h-6" />
      
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
          {itemCount}
        </span>
      )}
    </button>
    
    <ThemeToggle />
  </div>
</header>
    <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)}/>
    </>
  );
}