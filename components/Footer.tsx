import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, Twitter, Linkedin, Facebook } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
               <div className="bg-primary-600 p-1.5 rounded-lg">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-xl text-white">ProductDetailer</span>
            </div>
            <p className="text-sm leading-relaxed mb-6 text-slate-400">
              The #1 AI-powered product description generator for e-commerce brands, dropshippers, and Amazon sellers. Scale your copy instantly.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-400 hover:text-white"><Twitter size={20} /></a>
              <a href="#" className="text-slate-400 hover:text-white"><Linkedin size={20} /></a>
              <a href="#" className="text-slate-400 hover:text-white"><Facebook size={20} /></a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Product</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/features" className="hover:text-primary-400">Features</Link></li>
              <li><Link to="/pricing" className="hover:text-primary-400">Pricing</Link></li>
              <li><Link to="/dashboard" className="hover:text-primary-400">Description Generator</Link></li>
              <li><Link to="/seo-generator" className="hover:text-primary-400">SEO Tools</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="hover:text-primary-400">About Us</Link></li>
              <li><Link to="#" className="hover:text-primary-400">Careers</Link></li>
              <li><Link to="/blog" className="hover:text-primary-400">Blog</Link></li>
              <li><Link to="/contact" className="hover:text-primary-400">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/privacy" className="hover:text-primary-400">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-primary-400">Terms of Service</Link></li>
              <li><Link to="/cookies" className="hover:text-primary-400">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} ProductDetailer. All rights reserved.</p>
          <div className="mt-4 md:mt-0">
            Made for e-commerce growth 🚀
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;