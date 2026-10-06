import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Truck, RotateCcw, Sparkles } from 'lucide-react';

export interface FaqItem {
  id: string;
  category: 'shipping' | 'returns' | 'care' | 'general';
  categoryLabel: string;
  question: string;
  answer: string;
}

export const FAQ_DATA: FaqItem[] = [
  // Shipping FAQs
  {
    id: 'ship-1',
    category: 'shipping',
    categoryLabel: 'Shipping & Delivery',
    question: 'How long does delivery take across India and what are the charges?',
    answer:
      'We dispatch all in-stock orders within 24 hours from our Delhi & Jaipur logistics hubs. Metro cities (Delhi NCR, Mumbai, Bengaluru, Chennai, Kolkata, Hyderabad, Pune) receive orders within 2–3 business days. Tier-2 and Tier-3 cities receive orders within 4–6 business days. Shipping is completely FREE on all orders above ₹999. A flat nominal shipping fee of ₹99 applies on orders below ₹999.',
  },
  {
    id: 'ship-2',
    category: 'shipping',
    categoryLabel: 'Shipping & Delivery',
    question: 'Is Cash on Delivery (COD) available for my pincode?',
    answer:
      'Yes, Cash on Delivery (COD) is supported for over 19,000 pincodes across India. You can enter your 6-digit delivery pincode at checkout or confirm via our WhatsApp concierge before dispatch.',
  },
  {
    id: 'ship-3',
    category: 'shipping',
    categoryLabel: 'Shipping & Delivery',
    question: 'How will I receive order tracking details?',
    answer:
      'Once your parcel is picked up by our courier partners (Bluedart, Delhivery, DTDC), you will receive automated SMS and WhatsApp updates with a live tracking link and estimated delivery date.',
  },

  // Returns & Exchanges FAQs
  {
    id: 'ret-1',
    category: 'returns',
    categoryLabel: 'Returns & Exchanges',
    question: 'What is your exchange and return policy?',
    answer:
      'We offer an easy 7-day doorstep replacement or exchange policy if you receive a damaged, defective, or incorrect product. Simply message us on WhatsApp (+91 98765 43210) with your order ID and a photo of the item, and our team will arrange a reverse pickup at no additional cost.',
  },
  {
    id: 'ret-2',
    category: 'returns',
    categoryLabel: 'Returns & Exchanges',
    question: 'How long does a refund take if an exchange is not possible?',
    answer:
      'If a replacement item is out of stock, refunds are processed within 3 business days back to your original payment method (or directly to your bank account / UPI ID in case of COD orders).',
  },

  // Product Care FAQs
  {
    id: 'care-1',
    category: 'care',
    categoryLabel: 'Product Care & Durability',
    question: 'How should I wash and care for Radhyaa Everkart Hub 100% cotton bedsheets?',
    answer:
      'Our bedsheets are crafted from pure long-staple combed cotton and pre-washed for extra softness. We recommend machine washing on a gentle cycle in cold water with mild detergent. Avoid bleach or harsh chemicals. Tumble dry on low heat or dry in gentle natural shade to maintain vibrant botanical colors for years.',
  },
  {
    id: 'care-2',
    category: 'care',
    categoryLabel: 'Product Care & Durability',
    question: 'How do I maintain the gold foil finish on the Shagun envelopes?',
    answer:
      'Our Shagun envelopes are stamped with imported heat-bonded 24K gold foil and coated with a protective matte barrier. Store them in the provided protective sleeve in a dry place away from direct high humidity. The foil will not peel or flake off during transit or gifting.',
  },
  {
    id: 'care-3',
    category: 'care',
    categoryLabel: 'Product Care & Durability',
    question: 'How should I clean traditional brass diyas and copper carafes?',
    answer:
      'For solid brass diyas: clean with Pitambari powder or a lemon and salt rub to restore their brilliant mirror gold finish. For hammered copper carafes: the interior develops a natural patina over time which is harmless; rinse weekly with lemon juice, salt, and warm water. Never scrub copper with steel wool.',
  },
];

export const FaqAccordion: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'shipping' | 'returns' | 'care'>('all');
  const [openIds, setOpenIds] = useState<string[]>(['ship-1', 'ret-1']);

  const toggleAccordion = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredFaqs =
    activeCategory === 'all'
      ? FAQ_DATA
      : FAQ_DATA.filter((item) => item.category === activeCategory);

  const categories = [
    { key: 'all', label: 'All Questions' },
    { key: 'shipping', label: 'Shipping & Delivery' },
    { key: 'returns', label: 'Returns & Exchanges' },
    { key: 'care', label: 'Product Care' },
  ];

  return (
    <div className="w-full bg-[#FAF8F5] rounded-2xl border border-[#ECE3D4] p-6 sm:p-8 lg:p-10 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-6 border-b border-[#ECE3D4]">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#245A3E] mb-1">
            <HelpCircle className="w-4 h-4 text-[#DFB76C]" />
            <span>Got Questions? We Have Answers</span>
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#112E1F]">
            Frequently Asked Questions
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-xl">
            Quick answers regarding our pan-India delivery, hassle-free exchanges, and product care guidelines.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-1.5 p-1 bg-[#F5EFE6] rounded-lg border border-[#ECE3D4] shrink-0">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key as any)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap ${
                activeCategory === cat.key
                  ? 'bg-[#112E1F] text-white shadow-xs'
                  : 'text-stone-600 hover:text-[#112E1F] hover:bg-white/60'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Accordion List */}
      <div className="space-y-3">
        {filteredFaqs.map((faq) => {
          const isOpen = openIds.includes(faq.id);
          return (
            <div
              key={faq.id}
              className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                isOpen
                  ? 'bg-white border-[#C5A059] shadow-xs'
                  : 'bg-white/80 border-[#ECE3D4] hover:border-stone-400'
              }`}
            >
              <button
                onClick={() => toggleAccordion(faq.id)}
                className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 focus:outline-hidden"
                aria-expanded={isOpen}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs shrink-0 transition-colors ${
                      isOpen
                        ? 'bg-[#112E1F] text-[#DFB76C]'
                        : 'bg-[#F5EFE6] text-[#245A3E]'
                    }`}
                  >
                    {faq.category === 'shipping' ? (
                      <Truck className="w-3.5 h-3.5" />
                    ) : faq.category === 'returns' ? (
                      <RotateCcw className="w-3.5 h-3.5" />
                    ) : (
                      <Sparkles className="w-3.5 h-3.5" />
                    )}
                  </span>
                  <span className="font-serif text-base font-semibold text-[#112E1F]">
                    {faq.question}
                  </span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-stone-500 shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-[#112E1F]' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-[#FAF8F5]">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Need more help footer */}
      <div className="mt-8 pt-6 border-t border-[#ECE3D4] flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#F5EFE6]/60 p-4 rounded-xl">
        <div className="text-center sm:text-left">
          <p className="text-xs font-semibold text-[#112E1F]">
            Still have questions about a specific order or custom size?
          </p>
          <p className="text-[11px] text-stone-500">
            Our customer concierge is available 6 days a week from 10:00 AM to 8:00 PM IST.
          </p>
        </div>
        <a
          href="https://wa.me/919876543210?text=Hello%20Radhyaa%20Everkart%20Hub,%20I%20have%20a%20question%20regarding%20my%20order"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-semibold rounded-lg transition-colors shadow-xs whitespace-nowrap"
        >
          <span>Ask on WhatsApp</span>
        </a>
      </div>
    </div>
  );
};
