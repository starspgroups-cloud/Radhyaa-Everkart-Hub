import React, { useState } from 'react';
import {
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Compass,
  Banknote,
  HeartHandshake,
  Star,
  CheckCircle,
  Mail,
  Calendar,
  Gift,
  BedDouble,
  ShoppingBag,
} from 'lucide-react';
import { ASSETS } from '../data/assets';
import { PRODUCTS, CATEGORIES, REVIEWS, WHY_CHOOSE_US } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { BrandLogo } from '../components/BrandLogo';
import { Product, PageView } from '../types';
import { useCart } from '../context/CartContext';

interface HomePageProps {
  onNavigate: (page: PageView) => void;
  onSelectProduct: (product: Product) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onSelectProduct }) => {
  const { showToast } = useCart();
  const [emailSub, setEmailSub] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const featuredProducts = PRODUCTS.filter((p) => p.isFeatured).slice(0, 6);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailSub.trim() || !emailSub.includes('@')) {
      showToast('Please enter a valid email address.', 'error');
      return;
    }
    setIsSubscribed(true);
    showToast('Thank you for subscribing to Radhyaa Everkart Hub!');
  };

  return (
    <div className="space-y-20 sm:space-y-28">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#FAF8F5] via-[#F5EFE6]/60 to-[#FAF8F5] pt-10 sm:pt-16 pb-16 sm:pb-24 border-b border-[#ECE3D4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Brand Copy & CTAs */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              {/* Brand Tagline Badge */}
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#112E1F]/5 border border-[#112E1F]/15 text-[#112E1F] text-xs font-semibold tracking-wider uppercase mb-6">
                <span className="w-2 h-2 rounded-full bg-[#C5A059] animate-pulse" />
                <span>Every Season · Every Occasion · Every Need</span>
              </div>

              {/* Main Headline */}
              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-semibold text-[#112E1F] leading-[1.15] tracking-tight">
                Beautiful Essentials for Every Season & Every Occasion
              </h1>

              {/* Supporting Text */}
              <p className="mt-6 text-sm sm:text-base text-stone-600 max-w-xl leading-relaxed">
                Discover thoughtfully selected seasonal items, elegant Shagun envelopes, comfortable bedsheets and more — all in one place. Crafted for modern Indian homes and cherished celebrations.
              </p>

              {/* CTAs */}
              <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => onNavigate('shop')}
                  className="px-7 py-3.5 bg-[#112E1F] hover:bg-[#1C4832] text-white text-xs sm:text-sm font-semibold uppercase tracking-wider rounded-lg transition-all shadow-md hover:shadow-lg flex items-center gap-2"
                >
                  <span>Shop Now</span>
                  <ArrowRight className="w-4 h-4 text-[#DFB76C]" />
                </button>

                <button
                  onClick={() => {
                    const el = document.getElementById('collections-grid');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-6 py-3.5 bg-white hover:bg-[#FAF8F5] text-[#112E1F] border border-[#ECE3D4] text-xs sm:text-sm font-semibold uppercase tracking-wider rounded-lg transition-colors shadow-xs"
                >
                  Explore Collections
                </button>
              </div>

              {/* Micro Trust Row */}
              <div className="mt-10 pt-8 border-t border-[#ECE3D4] grid grid-cols-3 gap-4 w-full max-w-lg text-xs text-stone-600">
                <div className="flex flex-col">
                  <span className="font-bold text-[#112E1F] text-sm tabular-nums">100% Pure</span>
                  <span className="text-[11px] text-stone-500">Long-Staple Cotton</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-[#112E1F] text-sm tabular-nums">Handcrafted</span>
                  <span className="text-[11px] text-stone-500">Festive Shagun Lifafas</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-[#112E1F] text-sm tabular-nums">Pan-India</span>
                  <span className="text-[11px] text-stone-500">Free Express &gt; ₹999</span>
                </div>
              </div>
            </div>

            {/* Right Column: Visual Showcase & Brand Emblem Stamp */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white aspect-4/3 sm:aspect-5/4 lg:aspect-4/5">
                <img
                  src={ASSETS.heroBanner}
                  alt="Radhyaa Everkart Hub Lifestyle Decor and Bedding Collection"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#112E1F]/70 via-transparent to-transparent" />

                {/* Floating Official Emblem Badge */}
                <div className="absolute -bottom-6 -left-6 hidden sm:block p-2 bg-white rounded-full shadow-2xl border-2 border-[#DFB76C]/40">
                  <BrandLogo size="lg" emblemOnly={true} />
                </div>

                <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 text-right text-white">
                  <span className="text-[10px] uppercase tracking-widest text-[#DFB76C] font-semibold block">
                    Curated Collection
                  </span>
                  <span className="font-serif text-base sm:text-lg font-semibold">
                    Indian Festivals & Comfort
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FOUR FEATURED CATEGORIES BAR */}
      <section id="collections-grid" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <span className="text-xs uppercase tracking-widest text-[#245A3E] font-semibold">
            Signature Departments
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#112E1F] mt-2">
            Explore Four Curated Categories
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-2 leading-relaxed">
            Thoughtfully organized to help you find the perfect match for festivals, home comfort, and gifting.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* 1. Seasonal Items */}
          <div
            onClick={() => onNavigate('seasonal')}
            className="group relative bg-white rounded-xl border border-[#ECE3D4] overflow-hidden cursor-pointer shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
          >
            <div className="relative aspect-4/3 overflow-hidden bg-[#FAF8F5]">
              <img
                src={ASSETS.categorySeasonal}
                alt="Seasonal Items & Festive Pooja Essentials"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs p-2 rounded-lg text-[#112E1F] shadow-xs">
                <Calendar className="w-4 h-4 text-[#C5A059]" />
              </div>
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-serif text-lg font-semibold text-[#112E1F] group-hover:text-[#245A3E] transition-colors">
                  Seasonal Items
                </h3>
                <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                  Brass diyas, festive torans, pooja essentials, and celebratory home decorations.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#ECE3D4] flex items-center justify-between text-xs font-semibold text-[#112E1F]">
                <span>Browse Festive Range</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#C5A059] group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>

          {/* 2. Shagun Envelopes */}
          <div
            onClick={() => onNavigate('shagun')}
            className="group relative bg-white rounded-xl border border-[#ECE3D4] overflow-hidden cursor-pointer shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
          >
            <div className="relative aspect-4/3 overflow-hidden bg-[#FAF8F5]">
              <img
                src={ASSETS.categoryShagun}
                alt="Luxury Shagun Envelopes and Gifting Lifafas"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs p-2 rounded-lg text-[#112E1F] shadow-xs">
                <Gift className="w-4 h-4 text-[#C5A059]" />
              </div>
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-serif text-lg font-semibold text-[#112E1F] group-hover:text-[#245A3E] transition-colors">
                  Shagun Envelopes
                </h3>
                <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                  Gota patti, Jaipuri bandhani, gold foil embossing, and velvet touch wedding lifafas.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#ECE3D4] flex items-center justify-between text-xs font-semibold text-[#112E1F]">
                <span>Explore Envelopes</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#C5A059] group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>

          {/* 3. Bedsheets */}
          <div
            onClick={() => onNavigate('bedsheets')}
            className="group relative bg-white rounded-xl border border-[#ECE3D4] overflow-hidden cursor-pointer shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
          >
            <div className="relative aspect-4/3 overflow-hidden bg-[#FAF8F5]">
              <img
                src={ASSETS.categoryBedsheets}
                alt="100% Cotton King and Queen Bedsheets"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs p-2 rounded-lg text-[#112E1F] shadow-xs">
                <BedDouble className="w-4 h-4 text-[#C5A059]" />
              </div>
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-serif text-lg font-semibold text-[#112E1F] group-hover:text-[#245A3E] transition-colors">
                  Bedsheets & Linen
                </h3>
                <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                  300 TC pure combed cotton, botanical leaf motifs, 400 TC luxury sateen, and dohars.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#ECE3D4] flex items-center justify-between text-xs font-semibold text-[#112E1F]">
                <span>Discover Linen</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#C5A059] group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>

          {/* 4. More (Lifestyle & Potli Bags) */}
          <div
            onClick={() => onNavigate('shop')}
            className="group relative bg-white rounded-xl border border-[#ECE3D4] overflow-hidden cursor-pointer shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
          >
            <div className="relative aspect-4/3 overflow-hidden bg-[#FAF8F5]">
              <img
                src={ASSETS.prodPotliBags}
                alt="Potli Bags and Lifestyle Homeware"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs p-2 rounded-lg text-[#112E1F] shadow-xs">
                <ShoppingBag className="w-4 h-4 text-[#C5A059]" />
              </div>
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-serif text-lg font-semibold text-[#112E1F] group-hover:text-[#245A3E] transition-colors">
                  & More (Lifestyle & Gifts)
                </h3>
                <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                  Heritage Potli bags with ring handles, hammered copper carafes, and keepsake boxes.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#ECE3D4] flex items-center justify-between text-xs font-semibold text-[#112E1F]">
                <span>Browse Lifestyle</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#C5A059] group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURED PRODUCTS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-6 border-b border-[#ECE3D4]">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#245A3E] font-semibold">
              Handpicked Essentials
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#112E1F] mt-1">
              Featured Products
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              Popular customer favorites across all seasons and celebrations.
            </p>
          </div>

          <button
            onClick={() => onNavigate('shop')}
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#112E1F] hover:text-[#245A3E] transition-colors group"
          >
            <span>View All Products</span>
            <ArrowRight className="w-4 h-4 text-[#C5A059] group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {featuredProducts.map((prod) => (
            <ProductCard
              key={prod.id}
              product={prod}
              onSelectProduct={onSelectProduct}
            />
          ))}
        </div>
      </section>

      {/* 4. PROMOTIONAL BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-[#0F2D1E] via-[#173B28] to-[#1C4832] text-white p-8 sm:p-12 lg:p-16 shadow-xl border border-[#DFB76C]/30">
          <div className="relative z-10 max-w-2xl">
            <span className="text-xs uppercase tracking-widest text-[#DFB76C] font-semibold">
              Curated With Warmth & Joy
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-semibold leading-tight mt-2 mb-4">
              “Something Special for Every Season, Celebration & Home”
            </h2>
            <p className="text-xs sm:text-sm text-stone-200 leading-relaxed mb-8 max-w-xl">
              From auspicious wedding Shagun lifafas and handcrafted brass pooja diyas to breathable 100% pure cotton bedsheets — Radhyaa Everkart Hub brings thoughtfulness to every Indian tradition.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => onNavigate('offers')}
                className="px-6 py-3 bg-[#DFB76C] hover:bg-[#EAD098] text-[#112E1F] font-semibold text-xs uppercase tracking-wider rounded-lg transition-colors shadow-md"
              >
                View Festive Offers
              </button>
              <button
                onClick={() => onNavigate('about')}
                className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white border border-white/30 font-semibold text-xs uppercase tracking-wider rounded-lg transition-colors"
              >
                Learn Our Story
              </button>
            </div>
          </div>

          {/* Decorative Background Botanical Graphic */}
          <div className="absolute right-0 bottom-0 top-0 w-1/3 opacity-15 pointer-events-none hidden md:flex items-center justify-center">
            <BrandLogo size="xl" emblemOnly={true} className="w-80 h-80" />
          </div>
        </div>
      </section>

      {/* 5. WHY CHOOSE RADHYAA EVERKART HUB? */}
      <section className="bg-[#F5EFE6]/70 py-16 sm:py-20 border-y border-[#ECE3D4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <span className="text-xs uppercase tracking-widest text-[#245A3E] font-semibold">
              The Radhyaa Promise
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#112E1F] mt-2">
              Why Choose Radhyaa Everkart Hub?
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-2 leading-relaxed">
              We stand apart through genuine Indian craftsmanship, uncompromised materials, and dedicated personal service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {WHY_CHOOSE_US.map((item, idx) => {
              const icons = [ShieldCheck, Sparkles, Compass, Banknote, HeartHandshake];
              const IconComp = icons[idx % icons.length];
              return (
                <div
                  key={item.title}
                  className="bg-white rounded-xl p-6 border border-[#ECE3D4] shadow-xs flex flex-col justify-between hover:border-[#C5A059] transition-colors"
                >
                  <div>
                    <div className="w-10 h-10 rounded-lg bg-[#FAF8F5] border border-[#ECE3D4] flex items-center justify-center text-[#245A3E] mb-4">
                      <IconComp className="w-5 h-5 text-[#C5A059]" />
                    </div>
                    <h3 className="font-serif text-base font-semibold text-[#112E1F] mb-2">
                      {item.title}
                    </h3>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. CUSTOMER TESTIMONIALS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest text-[#245A3E] font-semibold">
            Real Experiences
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#112E1F] mt-2">
            Loved By Families Across India
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-2">
            Read authentic reviews from patrons who celebrated special moments with our products.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-xl p-6 border border-[#ECE3D4] shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-stone-700 leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#ECE3D4]">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-semibold text-[#112E1F]">{rev.name}</h4>
                    <span className="text-[11px] text-stone-400">{rev.city} · {rev.date}</span>
                  </div>
                  {rev.verifiedPurchase && (
                    <span className="text-[10px] text-emerald-700 font-medium flex items-center gap-0.5">
                      <CheckCircle className="w-3 h-3" />
                      Verified
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. NEWSLETTER SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="bg-[#FAF8F5] rounded-2xl border border-[#ECE3D4] p-8 sm:p-12 text-center max-w-3xl mx-auto">
          <div className="w-12 h-12 rounded-full bg-[#112E1F] text-amber-200 flex items-center justify-center mx-auto mb-4">
            <Mail className="w-6 h-6" />
          </div>
          <span className="text-xs uppercase tracking-widest text-[#245A3E] font-semibold">
            Be the First to Know
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#112E1F] mt-1 mb-2">
            Stay Updated With Our Latest Collections
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto mb-6 leading-relaxed">
            Subscribe to receive festive preview alerts, newly launched Shagun envelopes, and exclusive member discounts.
          </p>

          {isSubscribed ? (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg text-xs font-medium text-emerald-800 max-w-md mx-auto flex items-center justify-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>You're subscribed! Check your inbox for our 10% welcome coupon.</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input
                type="email"
                required
                placeholder="Enter your email address"
                value={emailSub}
                onChange={(e) => setEmailSub(e.target.value)}
                className="flex-1 px-4 py-2.5 text-xs border border-[#ECE3D4] rounded-lg bg-white focus:outline-hidden focus:border-[#112E1F]"
              />
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#112E1F] hover:bg-[#1C4832] text-white text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors whitespace-nowrap shadow-xs"
              >
                Subscribe
              </button>
            </form>
          )}

          <p className="text-[10px] text-stone-400 mt-3">
            We value your privacy. No spam, ever. Unsubscribe anytime.
          </p>
        </div>
      </section>
    </div>
  );
};
