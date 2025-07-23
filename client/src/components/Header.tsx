import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  const navigation = [
    { name: 'Home', href: '/' },
    { 
      name: 'Products', 
      href: '/#products',
      submenu: [
        { name: 'Trend Solver', href: '/trend-solver' },
        { name: 'LangScribe', href: '/langscribe' },
      ]
    },
    { 
      name: 'Services', 
      href: '/services',
      submenu: [
        { name: 'AI Analytics', href: '/ai-analytics' },
        { name: 'Process Automation', href: '/process-automation' },
        { name: 'AI Implementation', href: '/ai-implementation' },
        { name: 'Business Intelligence', href: '/business-intelligence' },
        { name: 'Cloud Solutions', href: '/cloud-solutions' },
        { name: 'Cybersecurity', href: '/cybersecurity' },
        { name: 'Consulting', href: '/consulting' },
      ]
    },
    { name: 'About', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ];

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    
    if (href.startsWith('/#')) {
      // Handle anchor links
      const element = document.querySelector(href.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link href="/">
                <span className="text-2xl font-bold text-primary cursor-pointer">Ruvab IT</span>
              </Link>
            </div>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navigation.map((item) => (
                <Link key={item.name} href={item.href}>
                  <span
                    onClick={() => handleNavClick(item.href)}
                    className="text-gray-600 hover:text-primary px-3 py-2 text-sm font-medium transition-colors cursor-pointer"
                  >
                    {item.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>
          
          <div className="hidden md:block">
            <Button 
              onClick={() => window.location.href = '/contact'}
              className="bg-primary text-white hover:bg-blue-700 transition-colors"
            >
              Get Started
            </Button>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-600 hover:text-primary"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </nav>
      
      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
            {navigation.map((item) => (
              <Link key={item.name} href={item.href}>
                <span
                  onClick={() => handleNavClick(item.href)}
                  className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-primary cursor-pointer"
                >
                  {item.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

export { Header };
export default Header;
