import React from 'react';
import { Users, Target, Award, Zap, CheckCircle } from 'lucide-react';
import { Helmet } from "react-helmet-async";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import AdSenseAd from "@/components/AdSenseAd";
import GoToTopButton from "@/components/GoToTopButton";
import Breadcrumb from "@/components/Breadcrumb";
import vsProfileImage from "@/assets/vs_profile.jpg";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>About Ruvab IT | Technology Solutions Company</title>
        <meta name="description" content="Learn about Ruvab IT's mission, team, and commitment to providing innovative technology solutions that help businesses thrive in the digital age." />
        <meta name="keywords" content="about ruvab it, technology company, AI solutions, business intelligence, team, mission" />
        <link rel="canonical" href="https://ruvab.it.com/about" />
        
        {/* Google Analytics */}
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${import.meta.env.VITE_GA_MEASUREMENT_ID || 'G-487BHE09VJ'}`}></script>
        <script>
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${import.meta.env.VITE_GA_MEASUREMENT_ID || 'G-487BHE09VJ'}');
          `}
        </script>

        {/* Google AdSense */}
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4204204667108655" crossOrigin="anonymous"></script>
        
        {/* In-page Ad Script */}
        <script async src="https://js.mbidadm.com/static/scripts.js" data-admpid="367193"></script>
      </Helmet>

      <Header />
      <Breadcrumb />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">About Ruvab IT</h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto">
              We're a team of technology enthusiasts dedicated to building innovative solutions that help businesses thrive in the digital age.
            </p>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Company Introduction */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">About Ruvab IT</h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Founded with a vision to bridge the gap between cutting-edge technology and practical business solutions, <strong>Ruvab IT</strong> represents the evolution of digital innovation through lean, scalable, and purpose-driven development. What started as a solo founder's mission has grown into a comprehensive technology solutions provider that specializes in transforming ideas into income-generating digital products.
              </p>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Our approach is fundamentally different from traditional tech companies. We don't just build software—we craft <em>Minimum Viable Products (MVPs)</em> that are designed for rapid market validation, quick iteration, and immediate monetization potential. Our expertise spans across <strong>SaaS platforms</strong>, <strong>BFSI solutions</strong>, <strong>EduTech innovations</strong>, and <strong>Wellness Tech applications</strong>, with each project rooted in real-world problem-solving and ROI-focused outcomes.
              </p>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                At Ruvab IT, we've pioneered a unique methodology that combines <strong>agile development</strong>, <strong>process automation</strong>, and <strong>AI implementation</strong> to deliver solutions that not only meet current market demands but anticipate future trends. Our team of expert engineers, data scientists, and consultants work collaboratively under a unified philosophy: <strong>"Build lean. Monetize smart. Scale boldly."</strong>
              </p>
              
              {/* Company Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-t border-b border-gray-200">
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">25+</div>
                  <div className="text-sm text-gray-600 uppercase tracking-wide">MVPs Launched</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-600 mb-2">95%</div>
                  <div className="text-sm text-gray-600 uppercase tracking-wide">Market Validation Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-purple-600 mb-2">6+</div>
                  <div className="text-sm text-gray-600 uppercase tracking-wide">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-orange-600 mb-2">4+</div>
                  <div className="text-sm text-gray-600 uppercase tracking-wide">Industry Domains</div>
                </div>
              </div>
              
              <div className="mt-8">
                <p className="text-lg text-gray-700 leading-relaxed">
                  <strong>Our specialization</strong> lies in AI implementation, data analytics, and process automation—not as abstract concepts, but as practical tools that drive measurable business results. From <em>LangScribe's</em> intelligent transcription capabilities to <em>TrendSolver's</em> real-time trend analysis for content creators, every solution we develop is tested, validated, and optimized for market success.
                </p>
              </div>
            </div>
          </div>
          
          {/* AdSense Ad - After Company Story */}
          <div className="py-8 flex justify-center">
            <div className="text-center max-w-2xl">
              <div className="text-xs text-gray-500 mb-2">Advertisement</div>
              <AdSenseAd 
                adSlot="7834958242" 
                adFormat="horizontal" 
                className="mx-auto"
              />
            </div>
          </div>
          
          {/* Founder Story */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mt-20">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Meet the Founder</h2>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Founder Solopreneur Product Builder Growth Explorer</h3>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                It all started with a simple idea — that digital innovation should be lean, purposeful, and scalable. Over the past 6+ years, I've turned that belief into action. My journey spans SaaS, BFSI, EduTech, ITeS, and Wellness Tech, where I've launched MVPs not just to test the waters but to stir the waves.
              </p>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                As a solo founder, I've worn every hat — strategist, designer, debugger, marketer — building products like <em>LangScribe</em>, a transcribing app, and the <em>TrendSolver</em>, designed for real-world trend analysis for content creators. These weren't just projects, they were experiments in impact: quick to build, easy to adapt, and ready to monetize.
              </p>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                I thrive on the challenge of turning market gaps into solutions that deliver actual ROI. Whether it's automating workflows, integrating APIs, or crafting content strategies for scale, my approach is rooted in agility, curiosity, and a bias for execution.
              </p>
              <p className="text-lg text-gray-600 mb-4 leading-relaxed">
                This journey isn't just about tech — it's about believing that solo builders can spark bold change.
              </p>
              <p className="text-lg text-gray-600 mb-4 leading-relaxed">
                And
              </p>
              <p className="text-lg text-gray-600 leading-relaxed font-medium">
                I'm just getting started to — <strong>"Build lean. Monetize smart. Scale boldly."</strong>
              </p>
            </div>
            <div>
              <img 
                src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800" 
                alt="Our Team" 
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Mission & Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're driven by core values that guide every decision and product we create
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Innovation</h3>
              <p className="text-gray-600">
                We constantly push technological boundaries to create solutions that didn't exist before.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Customer Focus</h3>
              <p className="text-gray-600">
                Every feature we build starts with understanding our customers' real needs and challenges.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Excellence</h3>
              <p className="text-gray-600">
                We maintain the highest standards in everything we do, from code quality to customer service.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Agility</h3>
              <p className="text-gray-600">
                We adapt quickly to changing technology landscapes and evolving customer needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* AdSense Ad - After Mission & Values */}
      <section className="py-8 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center">
            <div className="text-xs text-gray-500 mb-2">Advertisement</div>
            <AdSenseAd 
              adSlot="7834958245" 
              adFormat="rectangle" 
              className="mx-auto"
            />
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Leadership Team
            </h2>
            <p className="text-xl text-gray-600">
              Experienced leaders driving innovation and growth
            </p>
          </div>

          <div className="flex justify-center">
            <div className="relative bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 p-1 rounded-3xl shadow-2xl max-w-5xl w-full transform hover:scale-[1.02] transition-all duration-300">
              {/* Animated border gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 rounded-3xl opacity-75 animate-pulse"></div>
              
              {/* Main card content - Horizontal Layout */}
              <div className="relative bg-white dark:bg-gray-900 rounded-3xl p-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                  
                  {/* Left: Profile section */}
                  <div className="lg:col-span-1 text-center lg:text-left">
                    <div className="relative mb-6 inline-block">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full w-40 h-40 blur-md opacity-30"></div>
                      <img 
                        src={vsProfileImage} 
                        alt="Vaibhav Selukar - Founder" 
                        className="relative w-40 h-40 rounded-full object-cover border-4 border-white shadow-xl"
                      />
                      {/* Status indicator */}
                      <div className="absolute bottom-2 right-2 bg-green-500 w-8 h-8 rounded-full border-4 border-white flex items-center justify-center">
                        <div className="w-3 h-3 bg-white rounded-full animate-ping"></div>
                      </div>
                    </div>
                    
                    {/* Name with gradient text */}
                    <h3 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                      Vaibhav Selukar
                    </h3>
                    
                    {/* Achievement indicators - Horizontal in mobile, vertical in desktop */}
                    <div className="flex lg:flex-col justify-center lg:justify-start space-x-4 lg:space-x-0 lg:space-y-4">
                      <div className="text-center lg:text-left">
                        <div className="text-3xl font-bold text-blue-600">6+</div>
                        <div className="text-sm text-gray-500 uppercase tracking-wide">Years</div>
                      </div>
                      <div className="text-center lg:text-left">
                        <div className="text-3xl font-bold text-purple-600">4+</div>
                        <div className="text-sm text-gray-500 uppercase tracking-wide">Domains</div>
                      </div>
                      <div className="text-center lg:text-left">
                        <div className="text-3xl font-bold text-green-600">∞</div>
                        <div className="text-sm text-gray-500 uppercase tracking-wide">Ideas</div>
                      </div>
                    </div>
                  </div>

                  {/* Right: Content section */}
                  <div className="lg:col-span-2 space-y-6">
                    {/* Role badges */}
                    <div className="flex flex-wrap gap-3">
                      <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">Founder</span>
                      <span className="px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">Solopreneur</span>
                      <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">MVP Builder</span>
                      <span className="px-4 py-2 bg-pink-100 text-pink-800 rounded-full text-sm font-medium">Monetization Maverick</span>
                    </div>

                    {/* Quote-style description */}
                    <div className="relative">
                      <div className="absolute -top-4 -left-4 text-8xl text-blue-200 font-serif leading-none">"</div>
                      <div className="absolute -bottom-8 -right-4 text-8xl text-blue-200 font-serif leading-none">"</div>
                      <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed px-6 py-2 italic font-medium">
                        Turning ideas into income, one MVP at a time. With 6+ years leading digital growth across SaaS, BFSI, EduTech, and Wellness Tech, I craft lean products that solve real problems and scale fast. From LangScribe to the TrendSolver, I build with agility, automate for impact, and launch for ROI. Certified in Scrum and armed with a bias for execution — I thrive where business vision meets tech muscle.
                      </p>
                    </div>

                    {/* Call to action button */}
                    <div className="pt-4">
                      <a 
                        href="https://www.linkedin.com/in/ruvab-it" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-base hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
                      >
                        Connect & Collaborate
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Achievements</h2>
            <p className="text-xl text-blue-100">
              Milestones that define our journey and commitment to excellence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">50K+</div>
              <p className="text-blue-100">Active Users Worldwide</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">99.9%</div>
              <p className="text-blue-100">Uptime Guarantee</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">500+</div>
              <p className="text-blue-100">Enterprise Clients</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">50+</div>
              <p className="text-blue-100">Countries Served</p>
            </div>
          </div>


        </div>
      </section>

      {/* Development Philosophy */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Development Philosophy
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide how we build and deliver technology solutions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">How We Build</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">User-Centric Design</h4>
                    <p className="text-gray-600">Every feature starts with understanding user needs and pain points</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Agile Development</h4>
                    <p className="text-gray-600">Rapid iteration and continuous improvement based on feedback</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Security First</h4>
                    <p className="text-gray-600">Security and privacy considerations built into every layer</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Scalable Architecture</h4>
                    <p className="text-gray-600">Built to grow with your business from startup to enterprise</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <img 
                src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=600" 
                alt="Development Process" 
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Work with Us?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Join thousands of businesses that trust Ruvab IT to drive their digital transformation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => window.location.href = '/contact'}
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-colors"
            >
              Get Started Today
            </button>
            <button 
              onClick={() => window.location.href = '/contact'}
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-600 transition-colors"
            >
              Contact Our Team
            </button>
          </div>
        </div>
      </section>
      <Footer />
      <GoToTopButton />
    </div>
  );
};

export default AboutPage;