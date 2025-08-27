import React from 'react';
import { Link, useLocation } from 'wouter';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items?: BreadcrumbItem[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  const [location] = useLocation();

  // Auto-generate breadcrumbs if not provided
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const pathSegments = location.split('/').filter(segment => segment);
    const breadcrumbs: BreadcrumbItem[] = [
      { label: 'Home', href: '/' }
    ];

    let currentPath = '';
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const label = segment
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      
      if (index === pathSegments.length - 1) {
        // Current page - no link
        breadcrumbs.push({ label });
      } else {
        breadcrumbs.push({ label, href: currentPath });
      }
    });

    return breadcrumbs;
  };

  const breadcrumbItems = items || generateBreadcrumbs();

  if (breadcrumbItems.length <= 1) return null;

  return (
    <nav aria-label="Breadcrumb" className="bg-gray-50 py-3 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <ol className="flex items-center space-x-2 text-sm">
          {breadcrumbItems.map((item, index) => (
            <li key={index} className="flex items-center">
              {index === 0 && (
                <Home className="h-4 w-4 text-gray-400 mr-1" />
              )}
              
              {item.href ? (
                <Link href={item.href}>
                  <span className="text-blue-600 hover:text-blue-800 cursor-pointer transition-colors">
                    {item.label}
                  </span>
                </Link>
              ) : (
                <span className="text-gray-700 font-medium">
                  {item.label}
                </span>
              )}
              
              {index < breadcrumbItems.length - 1 && (
                <ChevronRight className="h-4 w-4 text-gray-400 mx-2" />
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
};

export default Breadcrumb;