import { CheckCircle, Zap, Heart, Settings, Shield, Users } from 'lucide-react';

export default function Services() {
  const services = [
    {
      icon: CheckCircle,
      title: 'AI Implementation Consulting',
      description: 'Partnering with founders building AI solutions - from machine learning platforms to intelligent automation tools. We provide consultation and promote innovative AI products.',
      color: 'bg-primary'
    },
    {
      icon: Zap,
      title: 'Business Intelligence Partnerships',
      description: 'Promoting cutting-edge business intelligence solutions from innovative founders - from analytics platforms to data visualization tools.',
      color: 'bg-accent'
    },
    {
      icon: Heart,
      title: 'Process Automation Solutions',
      description: 'Collaborating with founders creating innovative automation solutions - from workflow optimization tools to robotic process automation platforms.',
      color: 'bg-purple-600'
    },
    {
      icon: Settings,
      title: 'Cloud Solutions Consulting',
      description: 'Supporting innovative cloud technology founders - from infrastructure tools to serverless platforms and cloud management solutions.',
      color: 'bg-orange-500'
    },
    {
      icon: Shield,
      title: 'Cybersecurity Partnerships',
      description: 'Partnering with cybersecurity innovators - from threat detection platforms to security automation tools and compliance solutions.',
      color: 'bg-red-500'
    },
    {
      icon: Users,
      title: 'Founder Collaboration',
      description: 'Connecting with innovative founders, providing consultation, promotional support, and fostering partnerships in our focus technology domains.',
      color: 'bg-indigo-500'
    }
  ];

  return (
    <section id="services" className="py-12 sm:py-16 lg:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Solutions & Partnerships</h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-4xl mx-auto">
            Promoting innovative solutions and fostering collaborations with founders in AI, automation, business intelligence, cloud solutions, and cybersecurity.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div key={index} className="bg-white p-6 sm:p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className={`w-10 h-10 sm:w-12 sm:h-12 ${service.color} rounded-lg flex items-center justify-center mb-4 sm:mb-6`}>
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">{service.title}</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{service.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
