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
        { name: 'XMENRISE', href: '/xmenrise' },
        { name: 'QR Gen Tool', href: 'https://qr-gen.ruvab.it.com', external: true },
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
    { name: 'Tech News', href: '/technology-news' },
    { name: 'Partners', href: '/partners' },
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
        <div className="flex justify-between items-center h-14 sm:h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link href="/">
                <span className="text-xl sm:text-2xl font-bold text-primary cursor-pointer">Ruvab IT</span>
              </Link>
            </div>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navigation.map((item) => (
                item.submenu ? (
                  <DropdownMenu key={item.name}>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="text-gray-600 hover:text-primary px-3 py-2 text-sm font-medium transition-colors">
                        {item.name}
                        <ChevronDown className="ml-1 h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {item.submenu.map((subItem) => (
                        <DropdownMenuItem key={subItem.name} asChild>
                          {subItem.external ? (
                            <a href={subItem.href} target="_blank" rel="noopener noreferrer" className="cursor-pointer">
                              {subItem.name}
                            </a>
                          ) : (
                            <Link href={subItem.href}>
                              <span className="cursor-pointer">{subItem.name}</span>
                            </Link>
                          )}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Link key={item.name} href={item.href}>
                    <span
                      onClick={() => handleNavClick(item.href)}
                      className="text-gray-600 hover:text-primary px-3 py-2 text-sm font-medium transition-colors cursor-pointer"
                    >
                      {item.name}
                    </span>
                  </Link>
                )
              ))}
            </div>
          </div>
          
          <div className="hidden md:block">
            <Button 
              onClick={() => window.location.href = '/contact'}
              className="bg-primary text-white hover:bg-blue-700 transition-colors text-sm"
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
              className="text-gray-600 hover:text-primary p-2"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5 sm:h-6 sm:w-6" /> : <Menu className="h-5 w-5 sm:h-6 sm:w-6" />}
            </Button>
          </div>
        </div>
      </nav>
      
      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-3 pt-2 pb-4 space-y-1 bg-white border-t shadow-lg">
            {navigation.map((item) => (
              item.submenu ? (
                <div key={item.name} className="space-y-1">
                  <div className="px-3 py-2 text-sm font-medium text-gray-900">{item.name}</div>
                  {item.submenu.map((subItem) => (
                    subItem.external ? (
                      <a 
                        key={subItem.name}
                        href={subItem.href} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block px-6 py-2 text-sm text-gray-600 hover:text-primary hover:bg-gray-50 rounded-md cursor-pointer transition-colors"
                      >
                        {subItem.name}
                      </a>
                    ) : (
                      <Link key={subItem.name} href={subItem.href}>
                        <span
                          onClick={() => handleNavClick(subItem.href)}
                          className="block px-6 py-2 text-sm text-gray-600 hover:text-primary hover:bg-gray-50 rounded-md cursor-pointer transition-colors"
                        >
                          {subItem.name}
                        </span>
                      </Link>
                    )
                  ))}
                </div>
              ) : (
                <Link key={item.name} href={item.href}>
                  <span
                    onClick={() => handleNavClick(item.href)}
                    className="block px-3 py-3 text-sm font-medium text-gray-600 hover:text-primary hover:bg-gray-50 rounded-md cursor-pointer transition-colors"
                  >
                    {item.name}
                  </span>
                </Link>
              )
            ))}
            <div className="pt-2 mt-2 border-t border-gray-200">
              <Button 
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  window.location.href = '/contact';
                }}
                className="bg-primary text-white hover:bg-blue-700 transition-colors w-full text-sm"
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export { Header };
export default Header;
