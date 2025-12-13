import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-green-900 dark:bg-green-950 text-gray-100 mt-auto relative z-10">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        {/* Grid with 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div>
            <h3 className="font-heading text-xl text-white mb-4">
              Basecamp Supply
            </h3>
            <p className="text-sm text-gray-400">
              Quality gear tested on real trails
            </p>
          </div>

          {/* Quick Links Section */}
          <div>
            <h3 className="font-heading text-sm uppercase text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link 
                  href="/" 
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  href="/about" 
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal/Info Section */}
          <div>
            <h3 className="font-heading text-sm uppercase text-white mb-4">
              Information
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link 
                  href="#" 
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link 
                  href="#" 
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright Bar - Outside grid, full width */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Basecamp Supply. Built by Dylan Giddens.
          </p>
        </div>
      </div>
    </footer>
  );
}