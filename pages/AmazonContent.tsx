import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Tag, CheckCircle2 } from 'lucide-react';
import PageSEO from '../components/PageSEO';

const AmazonContent: React.FC = () => {
  return (
    <div className="bg-white dark:bg-slate-950 min-h-screen transition-colors pb-24 pt-20">
      <PageSEO 
        title="Amazon A+ Content Guide | ProductDetailer" 
        description="A complete guide to Amazon A+ Content (EBC). Learn how to increase sales with rich media and brand storytelling." 
      />
      {/* Hero Header */}
      <div className="w-full h-[400px] relative">
         <div className="absolute inset-0 bg-slate-900/60 z-10"></div>
         <img 
          src="https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?auto=format&fit=crop&w=1200&q=80" 
          alt="Amazon A+ Content Hero" 
          className="w-full h-full object-cover"
         />
         <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 z-20">
            <div className="max-w-4xl mx-auto">
               <Link to="/blog" className="inline-flex items-center text-slate-200 hover:text-white mb-6 text-sm font-medium transition-colors">
                  <ArrowLeft className="w-4 h-4 mr-2" /> Back to Blog
               </Link>
               <div className="flex items-center gap-3 mb-4">
                  <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">Amazon FBA</span>
               </div>
               <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
                  Amazon A+ Content 101: Everything You Need to Know
               </h1>
               <div className="flex items-center gap-6 text-slate-300 text-sm">
                  <div className="flex items-center gap-2">
                     <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center font-bold text-white">PD</div>
                     <span>Team ProductDetailer</span>
                  </div>
                  <div className="flex items-center gap-2">
                     <Calendar className="w-4 h-4" />
                     <span>Nov 02, 2023</span>
                  </div>
                  <div className="flex items-center gap-2">
                     <Tag className="w-4 h-4" />
                     <span>6 min read</span>
                  </div>
               </div>
            </div>
         </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-30">
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-8 md:p-12 border border-slate-100 dark:border-slate-800">
           <article className="prose prose-lg dark:prose-invert max-w-none">
            <p className="lead text-xl text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
              If you're a Brand Registered seller on Amazon, you're leaving money on the table if you aren't using A+ Content (formerly Enhanced Brand Content). It's the difference between a generic listing and a branded shopping experience.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-6">What is A+ Content?</h2>
            <p>
              A+ Content allows you to add rich media to your product detail page. Instead of a boring text block for your product description, you can add:
            </p>
            <ul className="space-y-2">
               <li className="flex items-center text-slate-700 dark:text-slate-300"><CheckCircle2 className="w-5 h-5 text-orange-500 mr-2" /> High-definition images</li>
               <li className="flex items-center text-slate-700 dark:text-slate-300"><CheckCircle2 className="w-5 h-5 text-orange-500 mr-2" /> Comparison charts</li>
               <li className="flex items-center text-slate-700 dark:text-slate-300"><CheckCircle2 className="w-5 h-5 text-orange-500 mr-2" /> Brand stories</li>
               <li className="flex items-center text-slate-700 dark:text-slate-300"><CheckCircle2 className="w-5 h-5 text-orange-500 mr-2" /> Custom headers and layout modules</li>
            </ul>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-6">Does it actually help sales?</h2>
            <p>
              Amazon claims that A+ Content can increase sales by 3% to 10%. While that might sound small, on a product doing $10,000 a month, that's an extra $12,000 a year in revenue for a one-time setup effort.
            </p>
            <p>
               It helps by answering customer questions visually, reducing negative reviews due to misunderstood features, and cross-selling other products in your catalog via comparison charts.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-6">Best Practices for 2025</h2>
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mt-6 mb-3">1. Mobile Optimization</h3>
            <p>
               More than 60% of Amazon shoppers are on mobile. A+ Content scales much better on mobile devices than the standard text description, which often gets buried. Use large text in your images so it's readable on small screens.
            </p>

            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mt-6 mb-3">2. Use the Comparison Chart</h3>
            <p>
               This is the most powerful module. If a customer is on your page, they are interested in your type of product. Don't let them click away to a competitor. Show them your "Pro" model vs your "Standard" model. Keep the traffic in your ecosystem.
            </p>

            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mt-6 mb-3">3. Focus on Lifestyle</h3>
            <p>
               Don't just show the product on a white background. Show it being used. Show the happy family, the organized desk, or the fit runner. Sell the result, not the product.
            </p>

           </article>

           {/* CTA Box */}
           <div className="bg-orange-50 dark:bg-orange-900/20 p-8 rounded-2xl mt-12 text-center border border-orange-200 dark:border-orange-800">
             <h3 className="text-2xl font-bold mb-4 text-orange-900 dark:text-orange-100">Need content for your A+ Modules?</h3>
             <p className="text-orange-800 dark:text-orange-200 mb-8 max-w-lg mx-auto">ProductDetailer can generate the exact text blocks you need for your Amazon Brand Story and A+ modules.</p>
             <Link to="/dashboard" className="bg-orange-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-orange-700 transition-colors inline-flex items-center shadow-lg">
               Generate Amazon Content
             </Link>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AmazonContent;