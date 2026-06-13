import React from "react"
import { MagicCard } from "@/components/ui/magic-card"
import { Button } from "@/components/ui/button"
import { Palette, Bot, BrainCircuit } from "lucide-react"

const services = [
  {
    icon: Palette,
    title: "Advanced Digital Experiences",
    description: "We build prestige brand websites, conversion-focused landing pages, and intelligent E-Commerce solutions. Perfectly aligned with your brand, our platforms are built on a scalable foundation for future growth and tech leadership.",
    features: [
      "Custom-Tailored Brand Sites",
      "High-Conversion Landing Pages", 
      "Intelligent E-Commerce Solutions"
    ],
    buttonText: "Let's Start a Project",
    id: "service_learn_more_websitebuilding"
  },
  {
    icon: Bot,
    title: "Intelligent AI Automations", 
    description: "Transform manual processes into automated workflows with AI solutions that streamline operations, save time, and increase profitability. We can integrate with your existing systems or develop a custom solution from scratch.",
    features: [
      "Ready-to-Implement Automations",
      "Custom-Built AI Solutions",
      "Save Time & Boost Efficiency"
    ],
    buttonText: "Discover Our Solutions",
    id: "service_learn_more_automations"
  },
  {
    icon: BrainCircuit,
    title: "Advanced AI Integrations",
    description: "Enhance your user experience by integrating advanced AI tools directly into your site—from instant customer support chatbots to personalized content and design. Boost engagement and maintain your competitive edge.",
    features: [
      "Smart Customer Service Chatbots",
      "AI-Powered Search & Recommendations", 
      "Interactive & Personalized Content"
    ],
    buttonText: "Upgrade Your Website",
    id: "service_learn_more_aiintegrations"
  }
]

const ServicesSection = () => {
  return (
    <section id="services" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4" data-aos="fade-up">
            Our Services
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-blue-600 mx-auto mb-8" data-aos="fade-up" data-aos-delay="100" />
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto" data-aos="fade-up" data-aos-delay="200">
            Cutting-edge technology solutions designed to accelerate your business growth and digital transformation
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon
            return (
              <MagicCard
                key={index}
                className="h-full min-h-[500px]"
                gradientColor="#3b82f6"
                gradientOpacity={0.2}
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="p-8 h-full flex flex-col">
                  <div className="mb-6">
                    <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-2xl flex items-center justify-center mb-4">
                      <IconComponent className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                  
                  <div className="mb-8 flex-grow">
                    <ul className="space-y-3">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start">
                          <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0" />
                          <span className="text-gray-700 dark:text-gray-300 font-medium">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Button 
                    id={service.id}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    size="lg"
                  >
                    {service.buttonText}
                  </Button>
                </div>
              </MagicCard>
            )
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;