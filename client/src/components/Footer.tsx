import { Link } from 'wouter';

function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">Ruvab IT</h3>
            <p className="text-gray-400 mb-4">
              Transforming businesses with advanced technology solutions and innovative AI-powered tools.
            </p>
            <div className="flex space-x-4 mb-6">
              <a href="https://x.com/RuvabIt" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a href="https://www.linkedin.com/in/ruvab-it" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="https://www.facebook.com/share/1Eyj3mcBQr/" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            </div>
            {/* Product Hunt Badges */}
            <div className="space-y-3 mb-4">
              <div>
                <a href="https://www.producthunt.com/products/langscribe?embed=true&utm_source=badge-featured&utm_medium=badge&utm_source=badge-langscribe" target="_blank" rel="noopener noreferrer">
                  <img 
                    src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1008936&theme=light&t=1756136626337" 
                    alt="LangScribe - AI Powered writing assistant transforming content creation! | Product Hunt" 
                    style={{width: '200px', height: '43px'}} 
                    width="200" 
                    height="43"
                    className="hover:opacity-90 transition-opacity"
                  />
                </a>
              </div>
              <div>
                <a href="https://www.producthunt.com/products/trendsolver?embed=true&utm_source=badge-featured&utm_medium=badge&utm_source=badge-trendsolver" target="_blank" rel="noopener noreferrer">
                  <img 
                    src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1009331&theme=light&t=1756140091143" 
                    alt="TrendSolver - Trend Solver: Your data, your insights, your success. | Product Hunt" 
                    style={{width: '200px', height: '43px'}} 
                    width="200" 
                    height="43"
                    className="hover:opacity-90 transition-opacity"
                  />
                </a>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Products</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/trend-solver"><span className="hover:text-white transition-colors cursor-pointer">Trend Solver</span></Link></li>
              <li><Link href="/langscribe"><span className="hover:text-white transition-colors cursor-pointer">LangScribe</span></Link></li>
              <li><Link href="/fyppal"><span className="hover:text-white transition-colors cursor-pointer">FYPPAL</span></Link></li>
              <li><a href="https://qr-gen.ruvab.it.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">QR Gen Pro</a></li>
              <li><Link href="/ai-analytics"><span className="hover:text-white transition-colors cursor-pointer">AI Analytics</span></Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/ai-implementation"><span className="hover:text-white transition-colors cursor-pointer">AI Implementation</span></Link></li>
              <li><Link href="/business-intelligence"><span className="hover:text-white transition-colors cursor-pointer">Business Intelligence</span></Link></li>
              <li><Link href="/cloud-solutions"><span className="hover:text-white transition-colors cursor-pointer">Cloud Solutions</span></Link></li>
              <li><Link href="/consulting"><span className="hover:text-white transition-colors cursor-pointer">Consulting</span></Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/about"><span className="hover:text-white transition-colors cursor-pointer">About Us</span></Link></li>
              <li><Link href="/blog"><span className="hover:text-white transition-colors cursor-pointer">Blog</span></Link></li>
              <li><Link href="/contact"><span className="hover:text-white transition-colors cursor-pointer">Contact</span></Link></li>
              {/* <li><Link href="/careers"><span className="hover:text-white transition-colors cursor-pointer">Careers</span></Link></li> */}
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/help"><span className="hover:text-white transition-colors cursor-pointer">Help Center</span></Link></li>
              <li><Link href="/documentation"><span className="hover:text-white transition-colors cursor-pointer">Documentation</span></Link></li>
              <li><Link href="/case-studies"><span className="hover:text-white transition-colors cursor-pointer">Case Studies</span></Link></li>
              <li><a href="mailto:support@ruvabit.com" className="hover:text-white transition-colors">Email Support</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm">
              <p>&copy; 2025 Ruvab IT. All rights reserved.</p>
            </div>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy">
                <span className="text-gray-400 hover:text-white text-sm transition-colors cursor-pointer">Privacy Policy</span>
              </Link>
              <Link href="/terms">
                <span className="text-gray-400 hover:text-white text-sm transition-colors cursor-pointer">Terms of Service</span>
              </Link>
              <Link href="/cookie-policy">
                <span className="text-gray-400 hover:text-white text-sm transition-colors cursor-pointer">Cookie Policy</span>
              </Link>
              {/* <Link href="/login">
                <span className="text-gray-500 hover:text-gray-400 text-xs transition-colors cursor-pointer opacity-50">System</span>
              </Link> */}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export { Footer };
export default Footer;
