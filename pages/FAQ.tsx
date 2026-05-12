import React from 'react';
import PageSEO from '../components/PageSEO';

const FAQ: React.FC = () => {
  const faqs = [
    {
      q: "What is ProductDetailer?",
      a: "ProductDetailer is an AI-powered copywriting tool designed specifically for e-commerce. It helps you write product descriptions, titles, and ad copy in seconds."
    },
    {
      q: "Is it good for Shopify and Amazon?",
      a: "Yes! We have specific modes for Shopify (storytelling focus) and Amazon (bullet-point and keyword density focus) to ensure maximum compliance and conversion on each platform."
    },
    {
      q: "Are the descriptions SEO-friendly?",
      a: "Absolutely. You can input your specific target keywords, and our AI will weave them naturally into the text to help you rank on Google."
    },
    {
      q: "Can I edit the output?",
      a: "Yes, the output is fully editable text. You can tweak it, add to it, or regenerate it completely until you are happy."
    },
    {
      q: "Do I need copywriting skills?",
      a: "Not at all. The tool is designed for beginners. You just provide the facts (features), and we provide the persuasion."
    }
  ];

  return (
    <div className="bg-white dark:bg-slate-950 py-24 transition-colors min-h-screen">
      <PageSEO 
        title="Frequently Asked Questions | ProductDetailer" 
        description="Find answers to common questions about ProductDetailer, pricing, and features." 
      />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center text-slate-900 dark:text-white mb-16">Frequently Asked Questions</h1>
        
        <div className="space-y-8">
          {faqs.map((item, idx) => (
            <div key={idx} className="border-b border-slate-100 dark:border-slate-800 pb-8">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{item.q}</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;