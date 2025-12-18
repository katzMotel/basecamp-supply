'use client';
import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronDown, Grid } from "lucide-react";
import { getCollections } from "@/lib/shopify/client";
import { Collection } from "@/types/shopify";

export function CategoriesDropdown(){
    const [collections, setCollections] = useState<Collection[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchCollections = async () => {
            const data = await getCollections();
            setCollections(data);
            setIsLoading(false);
        };
        fetchCollections();
    }, [])
    if(isLoading || collections.length=== 0){
        return null;
    }

    return(
        <div className="relative">
      {/* Categories Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
      >
        <Grid className="w-5 h-5" />
        <span className="font-medium">Categories</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Menu */}
          <div className="absolute left-0 mt-2 w-64 bg-white dark:bg-gray-900 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-50 max-h-96 overflow-y-auto">
            {/* All Products Link */}
            <Link
              href="/"
              className="block px-4 py-3 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors border-b border-gray-200 dark:border-gray-700"
              onClick={() => setIsOpen(false)}
            >
              <div className="font-medium">All Products</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Browse everything</div>
            </Link>

            {/* Category Links */}
            {collections.map((collection) => (
              <Link
                key={collection.id}
                href={`/collections/${collection.handle}`}
                className="block px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <div className="font-medium">{collection.title}</div>
                {collection.description && (
                  <div className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1">
                    {collection.description}
                  </div>
                )}
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
    );
}