import React, { useRef, useState } from "react";
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, ShoppingBag, TrendingUp, Sparkles, Globe, Zap, Star, Users, ArrowUpRight, Check } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import PageSEO from '../components/PageSEO';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const Home: React.FC = () => {
  const [results, setResults] = useState<any[]>([]);
const [loading, setLoading] = useState(false);
const fileInputRef = useRef<HTMLInputElement | null>(null);
const [generatedText, setGeneratedText] = useState("");

const handleFileChange = async (
  event: React.ChangeEvent<HTMLInputElement>
) => {

  const file = event.target.files?.[0];

  if (!file) return;

  const formData = new FormData();

  formData.append("file", file);

  try {

    setLoading(true);

    const response = await fetch(
      `${API_BASE_URL}/generate`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();

    console.log("SERVER RESPONSE =", data);

    if (response.ok && data.success) {

      setResults(data.results);

    } else {

      alert(data.message || "Generation failed");

    }

  } catch (error) {

    console.log(error);

    alert("Something went wrong");

  } finally {

    setLoading(false);

  }

};
  const { user } = useAuth();
const downloadExcel = async () => {

  try {

    const response = await fetch(`${API_BASE_URL}/download`);

    if (!response.ok) {
      const payload = await response.json().catch(() => null);
      throw new Error(payload?.message || "Download failed");
    }

    const blob = await response.blob();

    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;

    a.download = "generated.xlsx";

    document.body.appendChild(a);

    a.click();

    a.remove();

  } catch (error: any) {

    console.log(error);

    alert(error.message || "Download failed");

  }

};
  return (
    <div className="flex flex-col">
      <PageSEO 
        title="ProductDetailer - AI Product Description Generator" 
        description="Turn traffic into buyers with ProductDetailer. Generate persuasive, SEO-optimized product copy for Shopify, Amazon, and Etsy in seconds." 
      />
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-32">
        {/* Background Gradients */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
           <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-200/30 dark:bg-indigo-900/20 rounded-full blur-[100px] animate-pulse"></div>
           <div className="absolute top-[20%] right-[-10%] w-[30%] h-[50%] bg-primary-200/30 dark:bg-primary-900/20 rounded-full blur-[100px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-white dark:bg-slate-800 border border-indigo-100 dark:border-indigo-900/50 shadow-sm text-indigo-700 dark:text-indigo-300 text-sm font-semibold mb-8 hover:bg-indigo-50 dark:hover:bg-slate-700 transition-colors cursor-default">
            <Sparkles className="h-3.5 w-3.5 mr-2 text-indigo-500 dark:text-indigo-400" />
            <span>New: AI Model v2.5 with Amazon A+ Support</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.1] mb-8">
            Turn Traffic Into Buyers with <br className="hidden md:block"/>
            <span className="gradient-text">AI Descriptions</span>
          </h1>
          
          <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-600 dark:text-slate-400 mb-12 leading-relaxed">
            Stop staring at a blank cursor. ProductDetailer generates persuasive, SEO-optimized product copy for Shopify, Amazon, and Etsy in seconds.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
  onClick={() => fileInputRef.current?.click()}
  className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-slate-900/20 transition-all duration-300 hover:-translate-y-1 hover:bg-slate-800"
>
  {loading ? "Generating..." : "Generate Free Description"}
</button>
            <Link to="/features" className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold rounded-2xl text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 hover:border-slate-300 transition-all duration-300">
              View Examples
            </Link>
          </div>
          
          <div className="mt-10 flex items-center justify-center gap-6 text-sm text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                 <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=64&h=64&q=80" alt="User" className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-900 object-cover" />
                 <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=64&h=64&q=80" alt="User" className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-900 object-cover" />
                 <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=64&h=64&q=80" alt="User" className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-900 object-cover" />
                 <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=64&h=64&q=80" alt="User" className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-900 object-cover" />
              </div>
              <span>Trusted by 5,000+ sellers</span>
            </div>
            <span className="w-1 h-1 bg-slate-300 dark:bg-slate-600 rounded-full"></span>
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
              <span className="font-medium text-slate-700 dark:text-slate-300">4.9/5 Rating</span>
            </div>
          </div>
        </div>
      </section>
      {results.length > 0 && (

  <div className="max-w-5xl mx-auto mt-16 px-4">

    <div className="flex items-center justify-between mb-8">

      <h2 className="text-3xl font-bold">
        Generated Descriptions
      </h2>

      <button
        onClick={downloadExcel}
        className="bg-black text-white px-6 py-3 rounded-xl"
      >
        Download Excel
      </button>

    </div>

    <div className="space-y-6">

      {results.map((item, index) => (

        <div
          key={index}
          className="border rounded-2xl p-6 shadow-sm"
        >

          <h3 className="text-xl font-bold mb-3">
            {item.Product}
          </h3>

          <p className="text-slate-700 leading-7 whitespace-pre-line">
            {item.Description}
          </p>

        </div>

      ))}

    </div>

  </div>

)}

      {/* Social Proof */}
      <section className="py-12 border-y border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-8">Seamless integration logic for</p>
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8 grayscale opacity-50 dark:invert">
             <h3 className="text-2xl font-bold font-sans text-slate-800">Shopify</h3>
             <h3 className="text-2xl font-bold font-serif text-slate-800">amazon</h3>
             <h3 className="text-2xl font-bold text-slate-800">WooCommerce</h3>
             <h3 className="text-2xl font-bold font-serif italic text-slate-800">Etsy</h3>
             <h3 className="text-2xl font-bold text-slate-800 tracking-tighter">BigCommerce</h3>
          </div>
        </div>
      </section>

      {/* Before vs After Section */}
      <section className="py-24 bg-white dark:bg-slate-950 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">Don't Let Bad Copy Kill Your Sales</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Most sellers just copy-paste manufacturer specs. Our AI turns features into benefits that drive conversions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Bad Example */}
            <div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm opacity-80 scale-95 origin-right">
               <div className="flex items-center justify-between mb-6">
                 <div className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 text-xs font-bold uppercase rounded-full tracking-wide">The Old Way</div>
                 <span className="text-red-500 dark:text-red-400 text-sm font-medium flex items-center"><span className="mr-1">⚠️</span> Low Conversion</span>
               </div>
               
               <div className="space-y-4 font-mono text-sm text-slate-500 dark:text-slate-400">
                 <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4"></div>
                 <p>
                   Blue running shoes. Size 10. Good for running and walking. Made of mesh material. Rubber sole. Lace up. Available in blue and black. Please buy.
                 </p>
                 <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/2"></div>
               </div>
            </div>

            {/* Good Example */}
            <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-indigo-100 dark:border-indigo-900/50 shadow-2xl shadow-indigo-500/10 dark:shadow-indigo-500/5 relative overflow-hidden transform md:-translate-x-4">
              <div className="absolute top-0 right-0 p-6 opacity-10">
                <Zap className="w-24 h-24 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div className="flex items-center justify-between mb-6 relative z-10">
                 <div className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-bold uppercase rounded-full tracking-wide">ProductDetailer AI</div>
                 <span className="text-green-600 dark:text-green-400 text-sm font-bold flex items-center"><CheckCircle2 className="w-4 h-4 mr-1"/> SEO Optimized</span>
               </div>
               
               <h3 className="font-bold text-xl mb-4 text-slate-900 dark:text-white">Experience Ultimate Comfort with CloudStride Runners</h3>
               <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                 Crush your personal best with the <span className="text-slate-900 dark:text-white font-semibold">CloudStride Blue Running Shoes</span>. Engineered with breathable <span className="bg-yellow-100 dark:bg-yellow-900/30 px-1 rounded text-yellow-900 dark:text-yellow-200 font-medium">AirMesh technology</span>, these lightweight trainers keep your feet cool during intense marathons or casual morning jogs.
               </p>
               <ul className="space-y-2 mb-4">
                 <li className="flex items-center text-sm text-slate-700 dark:text-slate-300"><CheckCircle2 className="w-4 h-4 text-indigo-500 dark:text-indigo-400 mr-2"/> Shock-absorbing rubber sole protects joints</li>
                 <li className="flex items-center text-sm text-slate-700 dark:text-slate-300"><CheckCircle2 className="w-4 h-4 text-indigo-500 dark:text-indigo-400 mr-2"/> Secure lace-up fit for any terrain</li>
               </ul>
               <p className="font-medium text-indigo-700 dark:text-indigo-400 italic">Step into comfort. Run with confidence.</p>
            </div>
          </div>
        </div>
      </section>

      {/* About/Mission Snippet */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 text-sm font-medium mb-6">
                About Us
              </div>
              <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-6">Built for Sellers, By Sellers</h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                We know the pain of uploading 50 products a day. The spreadsheet fatigue, the writer's block, and the fear of duplicate content penalties.
              </p>
              <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                That's why we built ProductDetailer. To give small teams the power of a professional copywriting agency at a fraction of the cost.
              </p>
              <Link to="/about" className="text-indigo-600 dark:text-indigo-400 font-bold hover:text-indigo-800 dark:hover:text-indigo-300 inline-flex items-center group">
                Read our story <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform"/>
              </Link>
            </div>
            <div className="relative">
               <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-3xl transform rotate-3 scale-105 opacity-20"></div>
               <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-xl relative z-10">
                 <div className="flex items-center gap-4 mb-8">
                    <div className="bg-slate-100 dark:bg-slate-700 p-3 rounded-full"><Users className="w-6 h-6 text-slate-600 dark:text-slate-300"/></div>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white text-xl">10M+ Words Generated</h4>
                      <p className="text-slate-500 dark:text-slate-400">Helping 5,000+ brands grow</p>
                    </div>
                 </div>
                 <div className="space-y-4">
                    <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded w-full"></div>
                    <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded w-5/6"></div>
                    <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded w-4/6"></div>
                 </div>
                 <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-700 flex justify-between items-center">
                    <div className="flex -space-x-3">
                       <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=64&h=64&q=80" alt="User" className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-800 object-cover" />
                       <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=64&h=64&q=80" alt="User" className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-800 object-cover" />
                       <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=64&h=64&q=80" alt="User" className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-800 object-cover" />
                       <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=64&h=64&q=80" alt="User" className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-800 object-cover" />
                    </div>
                    <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">Join the community</span>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews / Testimonials */}
      <section className="py-24 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Loved by E-commerce Pros</h2>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">See what successful store owners are saying.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
             {[
               {
                 text: "I used to spend 2 hours a day on descriptions. Now it takes 10 minutes. My conversion rate is up 20% since switching.",
                 name: "Sarah Jenkins",
                 role: "Etsy Shop Owner",
                 bg: "bg-blue-50 dark:bg-blue-900/20",
                 image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80"
               },
               {
                 text: "The Amazon keyword integration is a game changer. It naturally weaves in terms I used to struggle to fit in. Ranking higher already.",
                 name: "Marcus Chen",
                 role: "Amazon FBA Seller",
                 bg: "bg-indigo-50 dark:bg-indigo-900/20",
                 image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80"
               },
               {
                 text: "Best ROI tool in my tech stack. It pays for itself with one sale. The luxury tone is perfect for my jewelry brand.",
                 name: "Elena Rodriguez",
                 role: "Shopify Founder",
                 bg: "bg-purple-50 dark:bg-purple-900/20",
                 image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80"
               }
             ].map((review, i) => (
               <div key={i} className={`p-8 rounded-3xl ${review.bg} hover:scale-105 transition-transform duration-300`}>
                  <div className="flex gap-1 mb-4 text-yellow-400">
                    {[1,2,3,4,5].map(s => <Star key={s} className="w-4 h-4 fill-current"/>)}
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 font-medium mb-6 leading-relaxed">"{review.text}"</p>
                  <div className="flex items-center gap-3">
                    <img 
                      src={review.image} 
                      alt={review.name} 
                      className="w-10 h-10 rounded-full shadow-sm object-cover"
                    />
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white text-sm">{review.name}</h4>
                      <p className="text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wide">{review.role}</p>
                    </div>
                  </div>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* How It Works Grid Snippet - IMPROVED UI */}
      <section className="py-24 bg-slate-950 border-t border-slate-900 text-white">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">How It Works</h2>
              <p className="text-lg text-slate-400 max-w-2xl mx-auto">Three simple steps to perfect product descriptions.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
               {/* Card 1 */}
               <div className="group relative bg-[#151e32] p-10 rounded-3xl border border-slate-800 hover:border-blue-500/30 transition-all duration-300 hover:bg-[#1a253c] hover:shadow-2xl hover:shadow-blue-500/10">
                   <div className="w-14 h-14 rounded-2xl bg-blue-500 flex items-center justify-center mb-8 shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform duration-300">
                     <ShoppingBag className="w-7 h-7 text-white" strokeWidth={2} />
                   </div>
                   <h3 className="text-2xl font-bold mb-4 text-white">Enter Details</h3>
                   <p className="text-slate-400 text-lg leading-relaxed">Input basic product info and features.</p>
               </div>

               {/* Card 2 */}
               <div className="group relative bg-[#151e32] p-10 rounded-3xl border border-slate-800 hover:border-indigo-500/30 transition-all duration-300 hover:bg-[#1a253c] hover:shadow-2xl hover:shadow-indigo-500/10">
                   <div className="w-14 h-14 rounded-2xl bg-indigo-500 flex items-center justify-center mb-8 shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform duration-300">
                     <Globe className="w-7 h-7 text-white" strokeWidth={2} />
                   </div>
                   <h3 className="text-2xl font-bold mb-4 text-white">Select Tone</h3>
                   <p className="text-slate-400 text-lg leading-relaxed">Choose from Luxury, Professional, or Friendly.</p>
               </div>

               {/* Card 3 */}
               <div className="group relative bg-[#151e32] p-10 rounded-3xl border border-slate-800 hover:border-fuchsia-500/30 transition-all duration-300 hover:bg-[#1a253c] hover:shadow-2xl hover:shadow-fuchsia-500/10">
                   <div className="w-14 h-14 rounded-2xl bg-fuchsia-500 flex items-center justify-center mb-8 shadow-lg shadow-fuchsia-500/20 group-hover:scale-110 transition-transform duration-300">
                     <TrendingUp className="w-7 h-7 text-white" strokeWidth={2} />
                   </div>
                   <h3 className="text-2xl font-bold mb-4 text-white">Publish & Sell</h3>
                   <p className="text-slate-400 text-lg leading-relaxed">Copy the formatted text to your store instantly.</p>
               </div>
            </div>
            
            <div className="mt-16 text-center">
               <Link to="/features" className="group inline-flex items-center text-white font-semibold hover:text-indigo-400 transition-colors">
                 View all features <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform"/>
               </Link>
            </div>
         </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Simple, Transparent Pricing</h2>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">Start for free, upgrade as you grow.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
             {/* Free */}
             <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-700 flex flex-col hover:shadow-lg transition-shadow duration-300">
               <h3 className="font-bold text-xl text-slate-900 dark:text-white">Free</h3>
               <div className="my-4"><span className="text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">$0</span></div>
               <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 min-h-[40px]">Perfect for testing the waters.</p>
               <ul className="space-y-3 mb-8 flex-1">
                 <li className="flex items-center text-slate-700 dark:text-slate-300 text-sm"><Check className="w-4 h-4 text-slate-400 mr-2"/> 5 Descriptions per day</li>
                 <li className="flex items-center text-slate-700 dark:text-slate-300 text-sm"><Check className="w-4 h-4 text-slate-400 mr-2"/> Basic AI Model</li>
               </ul>
               <Link to={user ? "/dashboard" : "/signup"} className="block w-full py-4 px-4 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white font-bold rounded-xl text-center hover:bg-slate-100 dark:hover:bg-slate-600 border border-slate-200 dark:border-slate-600 transition-colors">Get Started</Link>
             </div>
             
             {/* Starter */}
             <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-xl ring-2 ring-indigo-600 relative transform md:scale-105 z-10 flex flex-col">
               <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-indigo-600 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wide shadow-lg">Most Popular</div>
               <h3 className="font-bold text-xl text-indigo-600 dark:text-indigo-400">Starter</h3>
               <div className="my-4"><span className="text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">$29</span><span className="text-slate-500 dark:text-slate-400 font-medium">/mo</span></div>
               <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 min-h-[40px]">For growing stores & dropshippers.</p>
               <ul className="space-y-3 mb-8 flex-1">
                 <li className="flex items-center text-slate-700 dark:text-slate-300 text-sm"><Check className="w-4 h-4 text-indigo-500 dark:text-indigo-400 mr-2"/> Unlimited Descriptions</li>
                 <li className="flex items-center text-slate-700 dark:text-slate-300 text-sm"><Check className="w-4 h-4 text-indigo-500 dark:text-indigo-400 mr-2"/> Advanced SEO Mode</li>
                 <li className="flex items-center text-slate-700 dark:text-slate-300 text-sm"><Check className="w-4 h-4 text-indigo-500 dark:text-indigo-400 mr-2"/> All Platforms Supported</li>
               </ul>
               <Link to="/signup" className="block w-full py-4 px-4 bg-indigo-600 text-white font-bold rounded-xl text-center hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200 dark:shadow-none">Start Free Trial</Link>
             </div>
             
             {/* Pro */}
             <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-700 flex flex-col hover:shadow-lg transition-shadow duration-300">
               <h3 className="font-bold text-xl text-slate-900 dark:text-white">Pro</h3>
               <div className="my-4"><span className="text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">$99</span><span className="text-slate-500 dark:text-slate-400 font-medium">/mo</span></div>
               <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 min-h-[40px]">For agencies & high volume.</p>
               <ul className="space-y-3 mb-8 flex-1">
                 <li className="flex items-center text-slate-700 dark:text-slate-300 text-sm"><Check className="w-4 h-4 text-slate-400 mr-2"/> Bulk CSV Processing</li>
                 <li className="flex items-center text-slate-700 dark:text-slate-300 text-sm"><Check className="w-4 h-4 text-slate-400 mr-2"/> API Access</li>
               </ul>
               <Link to="/pricing" className="block w-full py-4 px-4 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white font-bold rounded-xl text-center hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">View All Features</Link>
             </div>
          </div>
        </div>
      </section>

      {/* Blog Preview */}
      <section className="py-24 bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-end mb-12">
               <div>
                  <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Latest Resources</h2>
                  <p className="text-slate-600 dark:text-slate-400">Tips to grow your e-commerce business.</p>
               </div>
               <Link to="/blog" className="hidden md:inline-flex text-indigo-600 dark:text-indigo-400 font-bold hover:text-indigo-800 dark:hover:text-indigo-300 items-center">
                  View all articles <ArrowRight className="ml-2 w-5 h-5"/>
               </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
               {/* Blog Post 1 */}
               <Link to="/seo-generator" className="group cursor-pointer">
                  <div className="aspect-video rounded-2xl mb-4 overflow-hidden relative">
                     <img 
                      src="https://images.unsplash.com/photo-1571721795195-a2ca2d3370a9?auto=format&fit=crop&w=800&q=80" 
                      alt="SEO Guide" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                     />
                     <div className="absolute bottom-4 left-4 bg-white dark:bg-slate-800 px-3 py-1 rounded-lg text-xs font-bold text-indigo-600 dark:text-indigo-400 shadow-md">SEO Guide</div>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">The Ultimate Guide to Product Descriptions</h3>
                  <p className="text-slate-500 dark:text-slate-400 line-clamp-2">Learn how to write descriptions that rank on Google and convert visitors into buyers.</p>
                  <div className="mt-4 flex items-center text-sm font-medium text-indigo-600 dark:text-indigo-400">Read Article <ArrowUpRight className="w-4 h-4 ml-1"/></div>
               </Link>
               
               {/* Blog Post 2 */}
               <Link to="/pricing-psychology" className="group cursor-pointer">
                  <div className="aspect-video rounded-2xl mb-4 overflow-hidden relative">
                     <img 
                      src="https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80" 
                      alt="Pricing Psychology" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                     />
                     <div className="absolute bottom-4 left-4 bg-white dark:bg-slate-800 px-3 py-1 rounded-lg text-xs font-bold text-emerald-600 dark:text-emerald-400 shadow-md">Strategy</div>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">5 Psychology Tricks for Pricing</h3>
                  <p className="text-slate-500 dark:text-slate-400 line-clamp-2">How to structure your pricing page to maximize Average Order Value and psychological appeal.</p>
                  <div className="mt-4 flex items-center text-sm font-medium text-indigo-600 dark:text-indigo-400">Read Article <ArrowUpRight className="w-4 h-4 ml-1"/></div>
               </Link>

                {/* Blog Post 3 */}
                <Link to="/amazon-aplus" className="group cursor-pointer">
                  <div className="aspect-video rounded-2xl mb-4 overflow-hidden relative">
                     <img 
                      src="https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?auto=format&fit=crop&w=800&q=80" 
                      alt="Amazon A+ Content" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                     />
                     <div className="absolute bottom-4 left-4 bg-white dark:bg-slate-800 px-3 py-1 rounded-lg text-xs font-bold text-orange-600 dark:text-orange-400 shadow-md">Amazon FBA</div>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">Amazon A+ Content 101</h3>
                  <p className="text-slate-500 dark:text-slate-400 line-clamp-2">Everything you need to know about premium Amazon content in 2025.</p>
                   <div className="mt-4 flex items-center text-sm font-medium text-indigo-600 dark:text-indigo-400">Read Article <ArrowUpRight className="w-4 h-4 ml-1"/></div>
               </Link>
            </div>
         </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-slate-900 dark:bg-slate-950 z-0"></div>
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] z-0"></div>
        <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            Ready to scale your e-commerce business?
          </h2>
          <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
            Join thousands of smart sellers using ProductDetailer to save time and boost conversion rates today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
             <Link to={user ? "/dashboard" : "/signup"} className="w-full sm:w-auto px-8 py-4 bg-indigo-600 text-white font-bold text-lg rounded-xl hover:bg-indigo-500 transition-colors shadow-glow">
              Start Writing for Free
             </Link>
             <Link to="/pricing" className="w-full sm:w-auto px-8 py-4 bg-transparent border border-slate-700 text-white font-bold text-lg rounded-xl hover:bg-white/10 transition-colors">
              View Pricing
             </Link>
          </div>
          <p className="mt-6 text-sm text-slate-500">No credit card required · Cancel anytime</p>
        </div>
      </section>

<input
  type="file"
  accept=".xlsx,.csv"
  ref={fileInputRef}
  style={{ display: "none" }}
  onChange={handleFileChange}
/>
{generatedText && (
  <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg border">
    <h2 className="text-2xl font-bold mb-4">
      Generated Description
    </h2>

    <textarea
      value={generatedText}
      readOnly
      className="w-full h-80 p-4 border rounded-xl"
    />

    <button
      onClick={() => {
        const blob = new Blob([generatedText], {
          type: "text/plain",
        });

        const url = window.URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "generated-description.txt";
        a.click();
      }}
      className="mt-4 px-6 py-3 bg-slate-900 text-white rounded-xl"
    >
      Download Description
    </button>
  </div>
)}
</div>
);
};

export default Home;
