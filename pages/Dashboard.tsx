import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Platform, Tone, Length, ProductFormData } from '../types';
import { generateProductDescription } from '../services/geminiService';
import { Copy, RefreshCw, Wand2, Loader2, Check, PenLine, Sparkles, ChevronRight, AlertCircle, Zap, Lock, Crown } from 'lucide-react';
import PageSEO from '../components/PageSEO';

const Dashboard: React.FC = () => {
  const [formData, setFormData] = useState<ProductFormData>({
    productName: '',
    category: '',
    features: '',
    targetAudience: '',
    platform: Platform.Shopify,
    tone: Tone.Persuasive,
    keywords: '',
    length: Length.Medium
  });

  const [result, setResult] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Credit System State
  const MAX_FREE_CREDITS = 5;
  const [credits, setCredits] = useState(MAX_FREE_CREDITS);

  // Load credits from local storage on mount (simulation)
  useEffect(() => {
    const savedCredits = localStorage.getItem('pd_credits');
    if (savedCredits) {
      setCredits(parseInt(savedCredits));
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleGenerate = async () => {
    if (credits <= 0) {
      setError('You have used all your free credits for today. Please upgrade to Pro for unlimited access.');
      return;
    }

    if (!formData.productName) {
      setError('Product Name is required to generate a description.');
      return;
    }
    setError(null);
    setLoading(true);
    setResult('');

    try {
      const generatedText = await generateProductDescription(formData);
      setResult(generatedText);
      
      // Deduct credit
      const newCredits = credits - 1;
      setCredits(newCredits);
      localStorage.setItem('pd_credits', newCredits.toString());

    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (result) {
      navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100/50 dark:bg-slate-950 pt-24 pb-12 transition-colors">
      <PageSEO 
        title="Dashboard - AI Generator | ProductDetailer" 
        description="Create high-converting product descriptions instantly. Choose your platform, tone, and let our AI do the writing." 
      />
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Layout Container: Fixed height on Desktop, Auto height on Mobile */}
        <div className="flex flex-col lg:flex-row gap-8 lg:h-[calc(100vh-8rem)]">
          
          {/* LEFT PANEL: Inputs */}
          <div className="w-full lg:w-[450px] xl:w-[500px] flex flex-col bg-white dark:bg-slate-900 rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-black/50 border border-slate-200 dark:border-slate-800 overflow-hidden flex-shrink-0 transition-colors h-auto lg:h-full">
            <div className="p-5 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 flex items-center justify-between">
              <h2 className="font-bold text-slate-800 dark:text-white flex items-center gap-2">
                <PenLine className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                Product Details
              </h2>
              <span className="text-xs font-medium text-slate-400 dark:text-slate-500 px-2 py-1 bg-white dark:bg-slate-700 rounded border border-slate-200 dark:border-slate-600">Step 1</span>
            </div>
            
            {/* Scrollable content on Desktop, Natural height on Mobile */}
            <div className="flex-1 lg:overflow-y-auto p-6 space-y-6 custom-scrollbar">
               {/* Product Name */}
               <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Product Name <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="productName"
                  value={formData.productName}
                  onChange={handleChange}
                  placeholder="e.g. Ergonomic Office Chair"
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 dark:focus:ring-primary-400/10 outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600 text-slate-800 dark:text-white bg-white dark:bg-slate-800"
                />
              </div>

              {/* Category & Audience Row */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Category</label>
                  <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    placeholder="e.g. Furniture"
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 dark:focus:ring-primary-400/10 outline-none transition-all text-sm bg-white dark:bg-slate-800 text-slate-800 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Target Audience</label>
                  <input
                    type="text"
                    name="targetAudience"
                    value={formData.targetAudience}
                    onChange={handleChange}
                    placeholder="e.g. Remote workers"
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 dark:focus:ring-primary-400/10 outline-none transition-all text-sm bg-white dark:bg-slate-800 text-slate-800 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600"
                  />
                </div>
              </div>

              {/* Features */}
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Key Features</label>
                <div className="relative">
                  <textarea
                    name="features"
                    value={formData.features}
                    onChange={handleChange}
                    rows={5}
                    placeholder="- Adjustable lumbar support&#10;- Breathable mesh material&#10;- 5-year warranty"
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 dark:focus:ring-primary-400/10 outline-none transition-all text-sm resize-none bg-white dark:bg-slate-800 text-slate-800 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600"
                  />
                  <div className="absolute top-3 right-3 text-slate-300 dark:text-slate-600 pointer-events-none">
                    <ChevronRight className="w-4 h-4 opacity-50" />
                  </div>
                </div>
                <p className="text-xs text-slate-400 dark:text-slate-500">List features as bullet points for best results.</p>
              </div>

              {/* Settings Group */}
              <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl space-y-4 border border-slate-100 dark:border-slate-700">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">SEO Keywords</label>
                  <input
                    type="text"
                    name="keywords"
                    value={formData.keywords}
                    onChange={handleChange}
                    placeholder="office chair, ergonomic design..."
                    className="w-full px-3 py-2 rounded-md border border-slate-200 dark:border-slate-700 focus:border-primary-500 outline-none text-sm bg-white dark:bg-slate-800 text-slate-800 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                   <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Platform</label>
                    <select
                      name="platform"
                      value={formData.platform}
                      onChange={handleChange}
                      className="w-full px-3 py-2 rounded-md border border-slate-200 dark:border-slate-700 focus:border-primary-500 outline-none text-sm bg-white dark:bg-slate-800 text-slate-800 dark:text-white"
                    >
                      {Object.values(Platform).map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Tone</label>
                    <select
                      name="tone"
                      value={formData.tone}
                      onChange={handleChange}
                      className="w-full px-3 py-2 rounded-md border border-slate-200 dark:border-slate-700 focus:border-primary-500 outline-none text-sm bg-white dark:bg-slate-800 text-slate-800 dark:text-white"
                    >
                      {Object.values(Tone).map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              {/* PLAN & CREDITS UPGRADE WIDGET */}
              <div className="mt-4 p-4 rounded-xl bg-gradient-to-br from-indigo-50 to-white dark:from-slate-800 dark:to-slate-800 border border-indigo-100 dark:border-slate-700 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Crown className="w-16 h-16 text-indigo-600 dark:text-indigo-400 rotate-12" />
                  </div>
                  
                  <div className="relative z-10">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-indigo-900 dark:text-indigo-300">Free Plan</span>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${credits > 0 ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300' : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'}`}>
                        {credits}/{MAX_FREE_CREDITS} Credits
                      </span>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="h-2 w-full bg-slate-200 dark:bg-slate-700 rounded-full mb-3 overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-500 ${credits > 1 ? 'bg-indigo-500' : 'bg-red-500'}`} 
                        style={{ width: `${(credits / MAX_FREE_CREDITS) * 100}%` }}
                      ></div>
                    </div>

                    {credits === 0 ? (
                      <div className="text-center">
                         <p className="text-xs text-red-500 mb-2 font-medium">Daily limit reached.</p>
                         <Link to="/pricing" className="flex items-center justify-center w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-lg transition-colors shadow-md shadow-indigo-200 dark:shadow-none">
                            <Zap className="w-3 h-3 mr-1.5" /> Upgrade to Pro
                         </Link>
                      </div>
                    ) : (
                      <Link to="/pricing" className="flex items-center justify-center w-full py-2 bg-white dark:bg-slate-700 hover:bg-indigo-50 dark:hover:bg-slate-600 border border-indigo-200 dark:border-slate-600 text-indigo-700 dark:text-indigo-300 text-xs font-bold rounded-lg transition-colors">
                        <Crown className="w-3 h-3 mr-1.5" /> Unlock Unlimited
                      </Link>
                    )}
                  </div>
              </div>

              {error && (
                <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-lg text-sm flex items-start gap-2 border border-red-100 dark:border-red-900/50">
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  {error}
                </div>
              )}
            </div>

            <div className="p-5 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900">
               <button
                onClick={handleGenerate}
                disabled={loading || credits <= 0}
                className={`w-full flex items-center justify-center py-4 px-6 rounded-xl text-white font-bold text-lg transition-all shadow-lg transform active:scale-95 ${
                  loading || credits <= 0
                  ? 'bg-slate-400 dark:bg-slate-700 cursor-not-allowed opacity-80 shadow-none' 
                  : 'bg-gradient-to-r from-primary-600 to-indigo-600 hover:from-primary-500 hover:to-indigo-500 shadow-primary-500/30'
                }`}
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin mr-2 h-5 w-5" />
                    Generating Magic...
                  </>
                ) : credits <= 0 ? (
                  <>
                    <Lock className="mr-2 h-5 w-5" />
                    Limit Reached
                  </>
                ) : (
                  <>
                    <Wand2 className="mr-2 h-5 w-5" />
                    Generate Description
                  </>
                )}
              </button>
            </div>
          </div>

          {/* RIGHT PANEL: Output */}
          <div className="flex-1 flex flex-col bg-white dark:bg-slate-900 rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-black/50 border border-slate-200 dark:border-slate-800 overflow-hidden relative transition-colors min-h-[500px] lg:min-h-0 lg:h-full">
            <div className="p-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 flex justify-between items-center">
              <div className="flex items-center gap-2">
                 <div className="w-3 h-3 rounded-full bg-red-400"></div>
                 <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                 <div className="w-3 h-3 rounded-full bg-green-400"></div>
                 <span className="ml-2 text-sm text-slate-500 dark:text-slate-400 font-mono">Output Preview</span>
              </div>
              
              <div className="flex items-center gap-2">
                 {result && (
                   <>
                     <button 
                      onClick={handleGenerate}
                      disabled={credits <= 0}
                      className="flex items-center text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 px-3 py-1.5 rounded-lg hover:bg-white dark:hover:bg-slate-800 border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                     >
                       <RefreshCw className="h-3.5 w-3.5 mr-1.5" /> Retry
                     </button>
                     <div className="h-4 w-px bg-slate-300 dark:bg-slate-700"></div>
                     <button 
                      onClick={handleCopy}
                      className={`flex items-center text-xs font-bold px-4 py-2 rounded-lg transition-all shadow-sm ${
                        copied ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border border-green-200 dark:border-green-900' : 'bg-slate-800 text-white hover:bg-slate-900 dark:bg-slate-700 dark:hover:bg-slate-600'
                      }`}
                     >
                       {copied ? <><Check className="h-3.5 w-3.5 mr-1.5" /> Copied</> : <><Copy className="h-3.5 w-3.5 mr-1.5" /> Copy Text</>}
                     </button>
                   </>
                 )}
              </div>
            </div>

            <div className="flex-1 lg:overflow-y-auto p-8 relative bg-white dark:bg-slate-900">
              {loading ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm z-10">
                   <div className="relative">
                     <div className="w-16 h-16 border-4 border-primary-200 dark:border-primary-900 border-t-primary-600 dark:border-t-primary-400 rounded-full animate-spin"></div>
                     <div className="absolute inset-0 flex items-center justify-center">
                       <Sparkles className="w-6 h-6 text-primary-600 dark:text-primary-400 animate-pulse" />
                     </div>
                   </div>
                   <p className="mt-6 text-lg font-medium text-slate-600 dark:text-slate-300 animate-pulse">AI is crafting your copy...</p>
                </div>
              ) : result ? (
                <div className="w-full h-full font-sans">
                  <textarea 
                    readOnly
                    value={result}
                    className="w-full h-full min-h-[400px] resize-none outline-none border-none bg-transparent text-slate-800 dark:text-slate-200 text-lg leading-relaxed whitespace-pre-wrap font-sans"
                  />
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-slate-300 dark:text-slate-600">
                  <div className="w-24 h-24 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mb-6">
                    <PenLine className="h-10 w-10 text-slate-300 dark:text-slate-500" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-400 dark:text-slate-500 mb-2">Ready to Write</h3>
                  <p className="text-slate-400 dark:text-slate-500 max-w-sm text-center">
                    Fill in the product details on the left and hit generate to see the magic happen here.
                  </p>
                </div>
              )}
            </div>
            
            {/* Status Bar */}
            <div className="h-8 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 flex items-center px-4 text-xs text-slate-400 dark:text-slate-500 justify-between font-mono">
               <span>
                  {result ? `${result.split(' ').length} words` : '0 words'}
               </span>
               <span>
                  {formData.platform} Mode
               </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;