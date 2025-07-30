import { CheckCircle, Zap, Heart, Settings, Shield, Users } from 'lucide-react';

export default function Services() {
  const services = [
    {
      icon: CheckCircle,
      title: 'AI Implementation',
      description: 'Custom AI solutions designed to automate processes, improve decision-making, and drive innovation across your organization.',
      color: 'bg-primary'
    },
    {
      icon: Zap,
      title: 'Business Intelligence',
      description: 'Transform raw data into actionable insights with our comprehensive business intelligence and analytics solutions.',
      color: 'bg-accent'
    },
    {
      icon: Heart,
      title: 'Process Automation',
      description: 'Streamline operations and reduce costs with intelligent automation solutions that handle repetitive tasks efficiently.',
      color: 'bg-purple-600'
    },
    {
      icon: Settings,
      title: 'Cloud Solutions',
      description: 'Scalable cloud infrastructure and migration services to enhance security, reduce costs, and improve accessibility.',
      color: 'bg-orange-500'
    },
    {
      icon: Shield,
      title: 'Cybersecurity',
      description: 'Comprehensive security solutions to protect your digital assets and ensure compliance with industry standards.',
      color: 'bg-red-500'
    },
    {
      icon: Users,
      title: 'Consulting',
      description: 'Expert technology consulting to help you make informed decisions and develop effective digital strategies.',
      color: 'bg-indigo-500'
    }
  ];

  return (
    <section id="services" className="py-12 sm:py-16 lg:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive technology solutions tailored to your business needs, from AI implementation to digital transformation.
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
