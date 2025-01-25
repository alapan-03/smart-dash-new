import React from 'react';

const servicesData = [
  {
    title: 'Web Development',
    description: 'We build responsive and engaging websites that meet your business needs.',
    icon: '🌐',
  },
  {
    title: 'Graphic Design',
    description: 'Creative and visually appealing designs to enhance your brand identity.',
    icon: '🎨',
  },
  {
    title: 'Digital Marketing',
    description: 'Strategies and campaigns to boost your online presence and reach your target audience.',
    icon: '📈',
  },
  {
    title: 'SEO Optimization',
    description: 'Improve your website’s search engine ranking to attract more organic traffic.',
    icon: '🔍',
  },
  {
    title: 'Consulting',
    description: 'Expert advice to help you navigate the complexities of your industry and grow your business.',
    icon: '💼',
  },
];

const Services = ({reference}) => {
  return (
    <section ref={reference} className="bg-gray-100 py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg text-center">
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-2xl font-semibold mb-4">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
