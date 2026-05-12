import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, Search, Globe, PenTool, Layout, Lock, Code2, Layers, Cpu, ArrowRight } from 'lucide-react';
import PageSEO from '../components/PageSEO';

const Features: React.FC = () => {
  const features = [
    {
      icon: <Cpu className="h-6 w-6 text-white" />,
      title: "AI-Powered Writing Engine",
      desc: "Our proprietary AI model is trained on millions of high-converting product pages to ensure every word sells.",
      color: "bg-blue-600"
    },
    {
      icon: <Search className="h-6 w-6 text-white" />,
      title: "SEO Optimization",
      desc: "Automatically integrate high-volume keywords naturally into your copy to rank higher on Google and Amazon.",
      color: "bg-indigo-600"
    },
    {
      icon: <Globe className="h-6 w-6 text-white" />,
      title: "Platform Specific Formats",
      desc: "One click formats your description perfectly for Shopify, Amazon, Etsy, or WooCommerce.",
      color: "bg-purple-600"
    },
    {
      icon: <PenTool className="h-6 w-6 text-white" />,
      title: "Brand Voice Control",
      desc: "Select from 5+ tones including Luxury, Professional, and Friendly to match your brand identity.",
      color: "bg-pink-600"
    },
    {
      icon: <Layout className="h-6 w-6 text-white" />,
      title: "Bulk Generation",
      desc: "Pro users can upload a CSV and generate descriptions for hundreds of products in minutes.",
      color: "bg-orange-600"
    },
    {
      icon: <Lock className="h-6 w-6 text-white" />,
      title: "Plagiarism Free",
      desc: "100% unique content generated every time. Safe for all marketplaces and search engines.",
      color: "bg-emerald-600"
    }
  ];

  return (
    <div className="bg-white dark:bg-slate-950 py-32 transition-colors">
      <PageSEO 
        title="Features - AI Copywriting Tools | ProductDetailer" 
        description="Discover our powerful features: AI writing engine, SEO optimization, platform-specific formatting, and bulk generation." 
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-primary-600 dark:text-primary-400 font-bold tracking-wide uppercase mb-3 text-sm">Product Capabilities</h2>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-6">Everything you need to write killer copy</h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
            ProductDetailer isn't just a text generator. It's a comprehensive copywriting suite designed for modern e-commerce teams.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div key={idx} className="group bg-slate-50 dark:bg-slate-900 rounded-3xl p-8 hover:bg-white dark:hover:bg-slate-800 hover:shadow-xl transition-all duration-300 border border-slate-100 dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700">
              <div className={`w-14 h-14 ${feature.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">{feature.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-24 bg-slate-900 dark:bg-slate-800 rounded-3xl p-12 relative overflow-hidden text-center border border-slate-800 dark:border-slate-700">
            <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary-400 via-slate-900 to-slate-900"></div>
            <div className="relative z-10">
                <h2 className="text-3xl font-bold text-white mb-6">Ready to see it in action?</h2>
                <div className="flex justify-center">
                    <Link to="/dashboard" className="px-8 py-4 bg-white text-slate-900 font-bold rounded-xl hover:bg-slate-100 transition-colors">Try it Free</Link>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Features;