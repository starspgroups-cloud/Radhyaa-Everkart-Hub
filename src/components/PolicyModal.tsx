import React from 'react';
import { X, ShieldCheck, FileText, Truck, RotateCcw } from 'lucide-react';

interface PolicyModalProps {
  policy: 'privacy' | 'terms' | 'shipping' | 'refund' | null;
  onClose: () => void;
}

export const PolicyModal: React.FC<PolicyModalProps> = ({ policy, onClose }) => {
  if (!policy) return null;

  const contentMap = {
    privacy: {
      title: 'Privacy Policy',
      icon: ShieldCheck,
      body: (
        <div className="space-y-4 text-xs sm:text-sm text-stone-700 leading-relaxed">
          <p>
            At <strong>Radhyaa Everkart Hub</strong>, we deeply respect the privacy of our esteemed
            patrons and are committed to protecting your personal information.
          </p>
          <h4 className="font-serif text-base font-semibold text-[#112E1F]">1. Information We Collect</h4>
          <p>
            When you place an order or contact us via WhatsApp, we collect basic details such as your
            name, phone number, shipping address, email address, and order history. We never store credit card numbers or UPI MPINs.
          </p>
          <h4 className="font-serif text-base font-semibold text-[#112E1F]">2. How We Use Your Data</h4>
          <p>
            Your information is used solely to process shipments, provide SMS/WhatsApp delivery updates,
            and assist with customer service enquiries. We do not sell, rent, or distribute your data to third-party telemarketers.
          </p>
          <h4 className="font-serif text-base font-semibold text-[#112E1F]">3. Data Security</h4>
          <p>
            All checkout information is transmitted over 256-bit SSL encrypted channels, complying with
            standard Indian e-commerce data safety regulations.
          </p>
        </div>
      ),
    },
    terms: {
      title: 'Terms & Conditions',
      icon: FileText,
      body: (
        <div className="space-y-4 text-xs sm:text-sm text-stone-700 leading-relaxed">
          <p>
            Welcome to <strong>Radhyaa Everkart Hub</strong>. By using our website or placing an order,
            you agree to adhere to these terms.
          </p>
          <h4 className="font-serif text-base font-semibold text-[#112E1F]">1. Product Descriptions & Craftsmanship</h4>
          <p>
            Many of our products—including handblock printed bedsheets, hand-cast brass diyas, and handcrafted
            Shagun lifafas—feature artisanal craftsmanship. Minor variations in print or texture are natural
            marks of handcrafted authenticity.
          </p>
          <h4 className="font-serif text-base font-semibold text-[#112E1F]">2. Pricing & Currency</h4>
          <p>
            All prices are listed in Indian Rupees (INR ₹) and are inclusive of Goods & Services Tax (GST).
            We reserve the right to modify prices and seasonal promotions without prior notice.
          </p>
          <h4 className="font-serif text-base font-semibold text-[#112E1F]">3. Governing Law</h4>
          <p>
            These terms are governed by and construed in accordance with the laws of India, subject to the
            exclusive jurisdiction of courts in New Delhi.
          </p>
        </div>
      ),
    },
    shipping: {
      title: 'Shipping & Delivery Policy',
      icon: Truck,
      body: (
        <div className="space-y-4 text-xs sm:text-sm text-stone-700 leading-relaxed">
          <p>
            We take extreme care in packaging your products so they reach you in pristine, celebratory condition.
          </p>
          <h4 className="font-serif text-base font-semibold text-[#112E1F]">1. Free Delivery Threshold</h4>
          <p>
            All prepaid and COD orders above <strong>₹999</strong> qualify for Free Standard Delivery across India.
            For orders below ₹999, a nominal flat shipping fee of <strong>₹99</strong> is charged at checkout.
          </p>
          <h4 className="font-serif text-base font-semibold text-[#112E1F]">2. Dispatch Timelines</h4>
          <p>
            Orders are dispatched within 24 business hours from our fulfilment facilities. Metro deliveries arrive in 2–3 business days. Non-metro and regional addresses take 4–6 business days.
          </p>
          <h4 className="font-serif text-base font-semibold text-[#112E1F]">3. Order Tracking</h4>
          <p>
            Tracking numbers and carrier links are immediately dispatched to your registered WhatsApp number and SMS upon courier handover.
          </p>
        </div>
      ),
    },
    refund: {
      title: 'Return & Exchange Policy',
      icon: RotateCcw,
      body: (
        <div className="space-y-4 text-xs sm:text-sm text-stone-700 leading-relaxed">
          <p>
            Your satisfaction is our utmost priority at Radhyaa Everkart Hub.
          </p>
          <h4 className="font-serif text-base font-semibold text-[#112E1F]">1. 7-Day Exchange Window</h4>
          <p>
            If your item arrives damaged, defective, or in an incorrect size/colour, notify us within 7 days of delivery with an unboxing photo via WhatsApp (+91 98765 43210).
          </p>
          <h4 className="font-serif text-base font-semibold text-[#112E1F]">2. Reverse Pickup</h4>
          <p>
            We arrange complimentary reverse pickup from your doorstep across all serviceable pincodes.
          </p>
          <h4 className="font-serif text-base font-semibold text-[#112E1F]">3. Refund Method</h4>
          <p>
            If a replacement product is out of stock, full refunds are issued within 3 business days back to your original payment method or bank account.
          </p>
        </div>
      ),
    },
  };

  const selected = contentMap[policy];
  const Icon = selected.icon;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-[#ECE3D4] overflow-hidden my-6">
        <div className="p-5 bg-[#FAF8F5] border-b border-[#ECE3D4] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Icon className="w-5 h-5 text-[#245A3E]" />
            <h3 className="font-serif text-xl font-semibold text-[#112E1F]">
              {selected.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[#ECE3D4] text-stone-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto">
          {selected.body}
        </div>

        <div className="p-4 bg-[#FAF8F5] border-t border-[#ECE3D4] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#112E1F] hover:bg-[#1C4832] text-white text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
