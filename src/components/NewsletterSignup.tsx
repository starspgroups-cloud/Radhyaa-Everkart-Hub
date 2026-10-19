import React, { useState, useEffect } from 'react';
import {
  Mail,
  Sparkles,
  Check,
  Copy,
  ArrowRight,
  ShieldCheck,
  Tag,
  Calendar,
  Gift,
  Bell,
  CheckCircle2,
  RefreshCw,
} from 'lucide-react';
import { useCart } from '../context/CartContext';

interface InterestTopic {
  id: string;
  label: string;
  icon: string;
}

const INTEREST_TOPICS: InterestTopic[] = [
  { id: 'seasonal', label: 'Festive & Seasonal Launches', icon: '🪔' },
  { id: 'shagun', label: 'Luxury Shagun Envelopes', icon: '💌' },
  { id: 'bedsheets', label: 'Pure Cotton Bedsheets', icon: '🛏️' },
  { id: 'deals', label: 'Exclusive VIP Discount Alerts', icon: '🏷️' },
];

export const NewsletterSignup: React.FC = () => {
  const { applyCoupon, showToast, couponCode } = useCart();
  const [email, setEmail] = useState('');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([
    'seasonal',
    'shagun',
    'bedsheets',
    'deals',
  ]);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [subscriberData, setSubscriberData] = useState<{
    email: string;
    interests: string[];
    subscribedAt: string;
  } | null>(null);
  const [copied, setCopied] = useState(false);
  const [isEditingPreferences, setIsEditingPreferences] = useState(false);

  // Load existing subscriber from local storage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('radhyaa_newsletter_subscriber');
      if (stored) {
        const parsed = JSON.parse(stored);
        setSubscriberData(parsed);
        setEmail(parsed.email || '');
        if (Array.isArray(parsed.interests) && parsed.interests.length > 0) {
          setSelectedInterests(parsed.interests);
        }
        setStatus('success');
      }
    } catch (err) {
      console.error('Failed to read subscriber data', err);
    }
  }, []);

  const toggleInterest = (id: string) => {
    setSelectedInterests((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleCopyCoupon = (code: string) => {
    navigator.clipboard?.writeText(code);
    setCopied(true);
    showToast(`Copied coupon code ${code}! Apply at checkout.`);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleApplyToCart = (code: string) => {
    const res = applyCoupon(code);
    if (res.success) {
      showToast(`Discount applied! 10% off your cart with code ${code}.`);
    } else {
      showToast(res.message, 'info');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    const cleanEmail = email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!cleanEmail) {
      setErrorMessage('Please enter your email address.');
      return;
    }

    if (!emailRegex.test(cleanEmail)) {
      setErrorMessage('Please enter a valid email address (e.g., name@example.com).');
      return;
    }

    if (selectedInterests.length === 0) {
      setErrorMessage('Please select at least one topic of interest.');
      return;
    }

    setStatus('loading');

    try {
      // Optional call to server endpoint
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: cleanEmail,
          interests: selectedInterests,
        }),
      });

      const data = await response.json().catch(() => null);

      if (response.ok && data?.success) {
        const record = {
          email: cleanEmail,
          interests: selectedInterests,
          subscribedAt: new Date().toISOString(),
        };
        localStorage.setItem('radhyaa_newsletter_subscriber', JSON.stringify(record));
        setSubscriberData(record);
        setStatus('success');
        setIsEditingPreferences(false);
        showToast(
          data.isExisting
            ? 'Preferences updated! Use code FESTIVE10 for 10% off.'
            : 'Welcome to Radhyaa Insider Circle! Your 10% discount code is FESTIVE10.'
        );
      } else {
        // Fallback gracefully even if offline
        const fallbackRecord = {
          email: cleanEmail,
          interests: selectedInterests,
          subscribedAt: new Date().toISOString(),
        };
        localStorage.setItem('radhyaa_newsletter_subscriber', JSON.stringify(fallbackRecord));
        setSubscriberData(fallbackRecord);
        setStatus('success');
        setIsEditingPreferences(false);
        showToast('Welcome to Radhyaa Insider Circle! Use code FESTIVE10 for 10% off.');
      }
    } catch {
      // Offline fallback: save locally
      const fallbackRecord = {
        email: cleanEmail,
        interests: selectedInterests,
        subscribedAt: new Date().toISOString(),
      };
      localStorage.setItem('radhyaa_newsletter_subscriber', JSON.stringify(fallbackRecord));
      setSubscriberData(fallbackRecord);
      setStatus('success');
      setIsEditingPreferences(false);
      showToast('Welcome! Subscribed locally. Use code FESTIVE10 for 10% off.');
    }
  };

  const handleReset = () => {
    localStorage.removeItem('radhyaa_newsletter_subscriber');
    setSubscriberData(null);
    setEmail('');
    setStatus('idle');
    setIsEditingPreferences(false);
  };

  return (
    <section
      aria-label="Newsletter Signup and Seasonal VIP Club"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10"
    >
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#112E1F] via-[#0E271B] to-[#0A1F14] border border-[#C5A059]/40 shadow-2xl p-6 sm:p-8 lg:p-10">
        {/* Subtle decorative background pattern accents */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-[#DFB76C]/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 rounded-full bg-[#1C4832]/30 blur-2xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Heading, Value Proposition & Perks */}
          <div className="lg:col-span-6 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#173B28] border border-[#DFB76C]/40 text-[#DFB76C] text-xs font-semibold tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#DFB76C]" />
              <span>Radhyaa Privilege Club</span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-white leading-tight">
              Seasonal Updates & Exclusive <span className="italic text-[#DFB76C]">Discount Alerts</span>
            </h3>

            <p className="text-sm text-stone-300 leading-relaxed">
              Stay ahead of Indian festival schedules, limited-edition Shagun releases, and luxury
              combed cotton restocks. Never miss an auspicious occasion or private flash drop.
            </p>

            {/* Benefit Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-stone-200">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-[#173B28] flex items-center justify-center text-[#DFB76C] shrink-0 border border-[#C5A059]/30">
                  <Gift className="w-3.5 h-3.5" />
                </div>
                <span>
                  <strong className="text-white font-medium">Instant 10% Off</strong> coupon code on signup
                </span>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-[#173B28] flex items-center justify-center text-[#DFB76C] shrink-0 border border-[#C5A059]/30">
                  <Calendar className="w-3.5 h-3.5" />
                </div>
                <span>
                  <strong className="text-white font-medium">Festival Calendar</strong> & dispatch reminders
                </span>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-[#173B28] flex items-center justify-center text-[#DFB76C] shrink-0 border border-[#C5A059]/30">
                  <Bell className="w-3.5 h-3.5" />
                </div>
                <span>
                  <strong className="text-white font-medium">Early Access</strong> to bridal Shagun lifafas
                </span>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-[#173B28] flex items-center justify-center text-[#DFB76C] shrink-0 border border-[#C5A059]/30">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </div>
                <span>
                  <strong className="text-white font-medium">Zero Spam</strong> — strictly 1–2 notes / month
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form or Subscribed State */}
          <div className="lg:col-span-6 bg-[#07170E]/80 backdrop-blur-xs rounded-xl p-5 sm:p-6 border border-[#1C4832] shadow-inner">
            {status === 'success' && subscriberData && !isEditingPreferences ? (
              /* Success / Active Member State */
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-3 pb-3 border-b border-[#1C4832]">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full bg-emerald-900/80 border border-emerald-500/50 flex items-center justify-center text-emerald-300 shrink-0">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white">
                        You are on the Radhyaa VIP List!
                      </h4>
                      <p className="text-xs text-stone-300 font-mono mt-0.5 truncate max-w-[220px] sm:max-w-xs">
                        {subscriberData.email}
                      </p>
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#173B28] text-[#DFB76C] text-[11px] font-medium border border-[#DFB76C]/30 shrink-0">
                    <Tag className="w-3 h-3" />
                    VIP Member
                  </span>
                </div>

                {/* Exclusive Coupon Card */}
                <div className="p-4 rounded-lg bg-gradient-to-r from-[#173B28] to-[#112E1F] border border-[#C5A059]/50 shadow-md">
                  <div className="flex items-center justify-between text-xs text-stone-300 mb-1.5">
                    <span className="font-medium text-[#DFB76C] flex items-center gap-1.5">
                      <Gift className="w-3.5 h-3.5 text-[#DFB76C]" />
                      Subscriber Welcome Reward
                    </span>
                    <span className="text-[11px] text-amber-200">10% Off Entire Order</span>
                  </div>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 pt-1">
                    <div className="flex items-center gap-2 bg-[#0A1F14] px-3 py-1.5 rounded border border-[#DFB76C]/40">
                      <span className="text-sm font-mono font-bold tracking-widest text-[#DFB76C]">
                        FESTIVE10
                      </span>
                      <button
                        type="button"
                        onClick={() => handleCopyCoupon('FESTIVE10')}
                        className="ml-auto text-xs text-stone-300 hover:text-white flex items-center gap-1 px-1.5 py-0.5 rounded hover:bg-[#173B28] transition-colors"
                        title="Copy coupon code"
                      >
                        {copied ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-400 font-semibold text-[11px]">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 text-[#DFB76C]" />
                            <span className="text-[11px]">Copy</span>
                          </>
                        )}
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleApplyToCart('FESTIVE10')}
                      disabled={couponCode === 'FESTIVE10'}
                      className={`px-3.5 py-2 text-xs font-bold rounded uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shrink-0 ${
                        couponCode === 'FESTIVE10'
                          ? 'bg-emerald-800/80 text-emerald-200 border border-emerald-600/50 cursor-default'
                          : 'bg-[#DFB76C] hover:bg-[#EDD49E] text-[#112E1F] shadow-sm hover:scale-[1.02] cursor-pointer'
                      }`}
                    >
                      {couponCode === 'FESTIVE10' ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Code Applied</span>
                        </>
                      ) : (
                        <>
                          <Tag className="w-3.5 h-3.5 text-[#112E1F]" />
                          <span>Apply to Bag</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Subscribed Interests Display */}
                <div>
                  <p className="text-[11px] text-stone-400 mb-2">Active Alert Preferences:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedInterests.map((id) => {
                      const topic = INTEREST_TOPICS.find((t) => t.id === id);
                      return topic ? (
                        <span
                          key={id}
                          className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-[#112E1F] text-stone-200 border border-[#1C4832]"
                        >
                          <span>{topic.icon}</span>
                          <span>{topic.label}</span>
                        </span>
                      ) : null;
                    })}
                  </div>
                </div>

                {/* Action buttons to customize or change email */}
                <div className="flex items-center justify-between pt-2 border-t border-[#1C4832] text-xs">
                  <button
                    type="button"
                    onClick={() => setIsEditingPreferences(true)}
                    className="text-[#DFB76C] hover:text-[#EDD49E] underline underline-offset-2 flex items-center gap-1 transition-colors"
                  >
                    <span>Change alert preferences</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="text-stone-400 hover:text-stone-200 flex items-center gap-1 transition-colors text-[11px]"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Use another email</span>
                  </button>
                </div>
              </div>
            ) : (
              /* Signup Form State */
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="newsletter-email" className="block text-xs font-semibold text-stone-200 mb-1.5">
                    Enter your email to receive seasonal alerts & claim your 10% discount:
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="w-4 h-4 text-stone-400" />
                    </div>
                    <input
                      id="newsletter-email"
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errorMessage) setErrorMessage('');
                      }}
                      placeholder="your.email@example.com"
                      required
                      className="w-full pl-9 pr-4 py-2.5 bg-[#0A1F14] border border-[#1C4832] focus:border-[#DFB76C] text-sm text-white placeholder-stone-500 rounded-lg transition-colors focus:outline-hidden focus:ring-1 focus:ring-[#DFB76C]"
                    />
                  </div>
                  {errorMessage && (
                    <p className="mt-1.5 text-xs text-rose-400 flex items-center gap-1">
                      <span>•</span>
                      <span>{errorMessage}</span>
                    </p>
                  )}
                </div>

                {/* Category Selection Pills */}
                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-2">
                    Choose what updates you wish to receive:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {INTEREST_TOPICS.map((topic) => {
                      const isSelected = selectedInterests.includes(topic.id);
                      return (
                        <button
                          key={topic.id}
                          type="button"
                          onClick={() => toggleInterest(topic.id)}
                          className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs text-left transition-all border ${
                            isSelected
                              ? 'bg-[#173B28] text-white border-[#DFB76C]/60 shadow-xs'
                              : 'bg-[#0A1F14] text-stone-400 border-[#1C4832] hover:text-stone-300 hover:border-stone-600'
                          }`}
                        >
                          <span className="text-sm shrink-0">{topic.icon}</span>
                          <span className="flex-1 font-medium leading-snug">{topic.label}</span>
                          <div
                            className={`w-4 h-4 rounded flex items-center justify-center shrink-0 border ${
                              isSelected
                                ? 'bg-[#DFB76C] border-[#DFB76C] text-[#112E1F]'
                                : 'border-stone-600'
                            }`}
                          >
                            {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Submit CTA Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full py-2.5 px-4 bg-gradient-to-r from-[#DFB76C] via-[#EDD49E] to-[#DFB76C] hover:from-[#EDD49E] hover:to-[#DFB76C] text-[#0A1F14] text-xs font-bold uppercase tracking-widest rounded-lg shadow-md transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed hover:scale-[1.01]"
                  >
                    {status === 'loading' ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin text-[#0A1F14]" />
                        <span>Confirming Subscription...</span>
                      </>
                    ) : (
                      <>
                        <span>Subscribe & Unlock 10% Discount</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>

                {isEditingPreferences && (
                  <button
                    type="button"
                    onClick={() => setIsEditingPreferences(false)}
                    className="w-full text-center text-xs text-stone-400 hover:text-stone-200 mt-1"
                  >
                    Cancel editing
                  </button>
                )}

                {/* Privacy Assurance */}
                <p className="text-[11px] text-stone-400 leading-normal text-center pt-1">
                  We honor your privacy. Unsubscribe anytime with a single click. By joining, you
                  agree to receive seasonal lookbooks and private coupon notices.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
