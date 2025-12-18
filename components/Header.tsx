'use client';
import { useSession, signOut } from 'next-auth/react';
import { ThemeToggle } from './ui';
import { useAppSelector } from '@/lib/redux/hooks';
import { ShoppingCart, User, LogOut, Heart, Package, Menu } from 'lucide-react';
import { useState, useEffect } from 'react';
import { CartDrawer } from './cart/CartDrawer';
import Image from 'next/image';
import Link from 'next/link';
import { useScrollDirection } from '@/hooks/useScrollDirection';
import { CategoriesDropdown } from './navigation/CategoriesDropdown';

export function Header() {
  const { items } = useAppSelector((state) => state.cart);
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isMobileMenuMounted, setIsMobileMenuMounted] = useState(false);
  const scrollDirection = useScrollDirection();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  useEffect(() => {
    if(showMobileMenu){
      setIsMobileMenuMounted(true);
    } else{
      const timer = setTimeout(() => setIsMobileMenuMounted(false), 300);
      return () => clearTimeout(timer);
    }
  },[showMobileMenu])
  return (
    <>
      <header className={`
        sticky top-0 z-30
        relative
        p-4
        bg-white/80 dark:bg-black/70 backdrop-blur-md 
        ${isScrolled ? 'border-b border-gray-200 dark:border-gray-800' : ''} 
        transition-transform duration-300 ease-in-out
        ${scrollDirection === 'down' ? '-translate-y-full' : 'translate-y-0'}
      `}>
        {/* Mobile Layout */}
        <div className="flex md:hidden items-center justify-between">
          {/* Left: Menu + Logo */}
          <div className="flex items-center gap-2">
            {/* Hamburger Menu Button */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              aria-label="Menu"
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Image
                src="/store-logo-v2.png"
                alt="Basecamp Supply"
                width={120}
                height={40}
                priority
                className="h-12 w-auto rounded-lg transition-all hover:scale-105 hover:drop-shadow-lg dark:invert"
              />
            </Link>
          </div>

          {/* Right icons */}
          <div className="flex items-center gap-2">
            <Link
              href="/wishlist"
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
            </Link>

            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              aria-label="Shopping cart"
            >
              <ShoppingCart className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>

            <UserMenu />
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
{isMobileMenuMounted && (
  <div 
    className={`
      md:hidden fixed left-0 right-0 top-[72px]
      bg-white dark:bg-gray-900 
      border-b border-gray-200 dark:border-gray-800
      shadow-lg z-40
      transition-all duration-300 ease-out
      ${showMobileMenu ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}
    `}
  >
    <nav className="p-4 space-y-1 max-h-[calc(100vh-72px)] overflow-y-auto">
      <Link
        href="/"
        className="block px-4 py-3 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg font-medium transition-colors"
        onClick={() => setShowMobileMenu(false)}
      >
        Home
      </Link>
      
      <Link
        href="/about"
        className="block px-4 py-3 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg font-medium transition-colors"
        onClick={() => setShowMobileMenu(false)}
      >
        About Us
      </Link>

      {/* Divider */}
      <div className="border-t border-gray-200 dark:border-gray-700 my-2" />

      {/* Categories */}
      <div className="px-4 py-2">
        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wider">
          Shop by Category
        </p>
      </div>
      
      <div className="px-4">
        <CategoriesDropdown />
      </div>
    </nav>

    {/* Backdrop to close menu when clicking outside */}
    <div 
      className="fixed inset-0 -z-10"
      onClick={() => setShowMobileMenu(false)}
    />
  </div>
)}

        {/* Desktop Layout - UNCHANGED */}
        <div className="hidden md:flex justify-center items-center relative">
          {/* Left Side: About + Categories */}
          <div className="absolute left-0 flex items-center gap-4">
            <Link 
              href='/about' 
              className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors font-medium"
            >
              About Us
            </Link>

            <div className="hidden lg:block">
              <CategoriesDropdown />
            </div>
          </div>

          {/* Center: Logo */}
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

          {/* Right Side: Wishlist, Cart, User, Theme */}
          <div className="absolute right-0 flex items-center gap-4">
            <Link
              href="/wishlist"
              className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              aria-label="Wishlist"
            >
              <Heart className="w-6 h-6" />
            </Link>

            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              aria-label="Shopping cart"
            >
              <ShoppingCart className="w-6 h-6" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>

            <UserMenu />
            <ThemeToggle />
          </div>
        </div>
      </header>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}

function UserMenu() {
  const { data: session, status } = useSession();
  const [showMenu, setShowMenu] = useState(false);

  if (status === 'loading') {
    return (
      <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse" />
    );
  }

  if (!session) {
    return (
      <Link
        href="/auth/signin"
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
      >
        <User className="w-5 h-5" />
        Sign In
      </Link>
    );
  }

  return (
    <div className="relative">
      {/* User Button */}
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      >
        <div className="w-8 h-8 rounded-full bg-green-700 dark:bg-green-600 flex items-center justify-center text-white font-medium">
          {session.user?.name?.[0]?.toUpperCase() || session.user?.email?.[0]?.toUpperCase()}
        </div>
        <span className="hidden md:block text-sm font-medium">
          {session.user?.name || session.user?.email}
        </span>
      </button>

      {/* Dropdown Menu */}
      {showMenu && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setShowMenu(false)}
          />
          
          {/* Menu */}
          <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-900 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-50">
            <div className="p-3 border-b border-gray-200 dark:border-gray-700">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {session.user?.name}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                {session.user?.email}
              </p>
            </div>

            <Link
              href="/orders"
              className="block px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              onClick={() => setShowMenu(false)}
            >
              <div className="flex items-center gap-2">
                <Package className="w-4 h-4" />
                Your Orders
              </div>
            </Link>

            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </>
      )}
    </div>
  );
}