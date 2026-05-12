import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowUpRight } from 'lucide-react';
import PageSEO from '../components/PageSEO';

const Blog: React.FC = () => {
  const posts = [
    {
      title: "E-commerce Product Description Generator: The Ultimate Guide",
      excerpt: "In the competitive world of e-commerce, your product description is your sales pitch. Discover how using an AI generator can transform your conversion rates.",
      category: "SEO Guide",
      date: "Oct 24, 2023",
      author: "Alex Rivera",
      link: "/seo-generator",
      image: "https://images.unsplash.com/photo-1571721795195-a2ca2d3370a9?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "How to Write Amazon Bullet Points that Sell",
      excerpt: "Amazon customers skim. Learn the art of writing punchy, keyword-rich bullet points that stop the scroll and win the Buy Box.",
      category: "Amazon FBA",
      date: "Nov 02, 2023",
      author: "Team ProductDetailer",
      link: "/amazon-aplus",
      image: "https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "5 Psychology Tricks for Pricing",
      excerpt: "A deep dive into how customer psychology differs between platform ecosystems and how to adjust your tone accordingly.",
      category: "Strategy",
      date: "Nov 15, 2023",
      author: "Dr. Sarah Chen",
      link: "/pricing-psychology",
      image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80"
    }
  ];

  return (
    <div className="bg-white dark:bg-slate-950 min-h-screen transition-colors">
      <PageSEO 
        title="E-commerce Growth Blog | ProductDetailer" 
        description="Expert tips, guides, and strategies for e-commerce growth, SEO, and product copywriting." 
      />
       <section className="pt-32 pb-20 bg-slate-50 dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-6">
            E-commerce Growth Hub
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Tips, tricks, and strategies to help you write better copy, rank higher, and sell more.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {posts.map((post, idx) => (
                <div key={idx} className="group flex flex-col h-full bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300">
                   <div className="h-48 relative overflow-hidden">
                      <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute top-4 left-4 bg-white/90 dark:bg-slate-800/90 backdrop-blur px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 shadow-sm">
                         {post.category}
                      </div>
                   </div>
                   <div className="p-8 flex-1 flex flex-col">
                      <div className="flex items-center text-xs text-slate-400 dark:text-slate-500 mb-4 gap-4">
                         <div className="flex items-center"><Calendar className="w-3 h-3 mr-1"/> {post.date}</div>
                         <div className="flex items-center"><User className="w-3 h-3 mr-1"/> {post.author}</div>
                      </div>
                      <Link to={post.link} className="block mb-3">
                         <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                            {post.title}
                         </h3>
                      </Link>
                      <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6 flex-1 line-clamp-3">
                         {post.excerpt}
                      </p>
                      <Link to={post.link} className="inline-flex items-center text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300">
                         Read Article <ArrowUpRight className="w-4 h-4 ml-1"/>
                      </Link>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;