import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Tag } from 'lucide-react';
import PageSEO from '../components/PageSEO';

const PricingPsychology: React.FC = () => {
  return (
    <div className="bg-white dark:bg-slate-950 min-h-screen transition-colors pb-24 pt-20">
      <PageSEO 
        title="5 Psychology Tricks for Pricing | ProductDetailer" 
        description="Learn 5 data-backed psychological pricing strategies to increase your average order value and conversion rate." 
      />
      {/* Hero Header */}
      <div className="w-full h-[400px] relative">
         <div className="absolute inset-0 bg-slate-900/60 z-10"></div>
         <img 
          src="https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80" 
          alt="Pricing Psychology Hero" 
          className="w-full h-full object-cover"
         />
         <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 z-20">
            <div className="max-w-4xl mx-auto">
               <Link to="/blog" className="inline-flex items-center text-slate-200 hover:text-white mb-6 text-sm font-medium transition-colors">
                  <ArrowLeft className="w-4 h-4 mr-2" /> Back to Blog
               </Link>
               <div className="flex items-center gap-3 mb-4">
                  <span className="bg-emerald-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">Strategy</span>
               </div>
               <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
                  5 Psychology Tricks for Pricing Your Products
               </h1>
               <div className="flex items-center gap-6 text-slate-300 text-sm">
                  <div className="flex items-center gap-2">
                     <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center font-bold text-white">SC</div>
                     <span>Dr. Sarah Chen</span>
                  </div>
                  <div className="flex items-center gap-2">
                     <Calendar className="w-4 h-4" />
                     <span>Nov 15, 2023</span>
                  </div>
                  <div className="flex items-center gap-2">
                     <Tag className="w-4 h-4" />
                     <span>7 min read</span>
                  </div>
               </div>
            </div>
         </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-30">
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-8 md:p-12 border border-slate-100 dark:border-slate-800">
           <article className="prose prose-lg dark:prose-invert max-w-none">
            <p className="lead text-xl text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
              Price is the most delicate lever in your e-commerce machine. Pull it too hard, and conversion drops. Don't pull it hard enough, and you leave profit on the table. Here are 5 data-backed psychological tricks to optimize your pricing.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-6">1. The Charm Pricing Effect (The Power of 9)</h2>
            <p>
              It's the oldest trick in the book, but it works. Prices ending in 9, 99, or 95 signal a "deal" to the subconscious brain.
            </p>
            <p>
              A study by MIT and the University of Chicago found that a standard women's clothing item sold significantly better at $39 than at $34. The "9" suggests value so strongly that it overpowered a lower price point.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-6">2. Anchoring</h2>
            <p>
              Humans are bad at evaluating value in a vacuum. We need a reference point. This is called an "anchor."
            </p>
            <p>
              Always display your "Compare At" price next to your sale price. If you sell a watch for $100, it feels expensive. But if it's "$100 <span className="line-through text-slate-400">was $250</span>", it feels like a steal. The $250 anchors the customer's perception of value.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-6">3. The Decoy Effect</h2>
            <p>
              If you have two pricing tiers, customers often choose the cheapest. If you add a third "decoy" option that is slightly inferior to the most expensive option, you can push people toward the premium tier.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-slate-700 dark:text-slate-300">
               <li><strong>Small Popcorn:</strong> $3</li>
               <li><strong>Medium Popcorn:</strong> $6.50 (The Decoy)</li>
               <li><strong>Large Popcorn:</strong> $7</li>
            </ul>
            <p>
               Most people see the Large is only $0.50 more than the Medium and buy the Large, which is what you wanted all along.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-6">4. Rule of 100</h2>
            <p>
              When giving a discount, how do you frame it? Percentage or dollar amount?
            </p>
            <p>
               <strong>The Rule of 100 states:</strong>
               <br/>
               - If the price is under $100, use a percentage (e.g., 20% off).
               <br/>
               - If the price is over $100, use a dollar amount (e.g., $50 off).
            </p>
            <p>
               Why? 20% off a $20 shirt sounds bigger than "$4 off." But "$200 off" a $1000 laptop sounds bigger than "20% off."
            </p>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-6">5. Reduce Friction with Fonts</h2>
            <p>
              Researchers at Clark University found that displaying prices in a smaller font size can actually make the price <em>feel</em> smaller. Conversely, discounts should be displayed in large, bold fonts to maximize their impact.
            </p>

           </article>

           {/* CTA Box */}
           <div className="bg-emerald-600 p-8 rounded-2xl mt-12 text-center text-white shadow-xl shadow-emerald-500/20">
             <h3 className="text-2xl font-bold mb-4">Apply these tactics to your store</h3>
             <p className="text-emerald-100 mb-8 max-w-lg mx-auto">Use ProductDetailer to generate persuasive copy that complements your new pricing strategy.</p>
             <Link to="/signup" className="bg-white text-emerald-700 px-8 py-4 rounded-xl font-bold hover:bg-emerald-50 transition-colors inline-flex items-center shadow-lg">
               Start Your Free Trial
             </Link>
           </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPsychology;