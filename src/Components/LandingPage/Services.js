import React from 'react';
import './CSS/Services.css'; // Link to the updated CSS file

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

const Services = ({ reference }) => {
  return (
    <section ref={reference} className="services-section">
      <div className="services-content">
        <h2 className="services-heading">Our Services</h2>
        <div className="services-grid">
          {servicesData.map((service, index) => (
            <div key={index} className="service-card">
              <div className="service-icon">{service.icon}</div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
