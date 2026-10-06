import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  CheckCircle,
  Truck,
  CreditCard,
  Banknote,
  Smartphone,
  ArrowRight,
  MessageCircle,
  ShoppingBag,
  Sparkles,
  Coins,
  Gift,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useRewards } from '../context/RewardsContext';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOrderSuccess: (orderId: string) => void;
  onTrackOrder?: (orderId: string) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  onOrderSuccess,
  onTrackOrder,
}) => {
  const {
    cart,
    subtotal,
    discount,
    freeShippingThreshold,
    clearCart,
    isGiftWrapped,
    giftMessage,
    giftWrappingFee,
  } = useCart();
  const {
    selectedPointsToRedeem,
    pointsDiscountRupees,
    earnPointsFromAmount,
    addPoints,
    redeemPoints,
  } = useRewards();

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('Delhi');
  const [pincode, setPincode] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'upi' | 'card'>('cod');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedOrderId, setConfirmedOrderId] = useState<string | null>(null);

  if (!isOpen) return null;

  const shippingFee = subtotal >= freeShippingThreshold ? 0 : 99;
  const pointsEarned = earnPointsFromAmount(subtotal);
  const finalTotal = Math.max(0, subtotal - discount - pointsDiscountRupees) + giftWrappingFee + shippingFee;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || !address || !pincode) {
      alert('Please fill in all required shipping address fields.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const generatedId = `REH-${Math.floor(100000 + Math.random() * 900000)}`;
      
      // Process Radhyaa Rewards points
      if (selectedPointsToRedeem > 0) {
        redeemPoints(selectedPointsToRedeem, generatedId);
      }
      addPoints(pointsEarned, `Points earned on Order #${generatedId}`, generatedId);

      // Save into customer's local order history for Order Status lookup
      try {
        const orderRecord = {
          id: generatedId,
          date: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
          status: 'Processing',
          statusDescription: 'Your order has been registered and our packaging artisans are preparing your parcel.',
          estimatedDelivery: 'In 3-4 Business Days',
          carrier: 'Delhivery Express Air',
          awb: `DL${Math.floor(100000000 + Math.random() * 900000000)}IN`,
          customerName: fullName,
          phone,
          address: `${address}, ${city}, ${state} - ${pincode}`,
          paymentMethod: paymentMethod === 'cod' ? 'Cash on Delivery (COD)' : paymentMethod === 'upi' ? 'Instant UPI (Paid)' : 'Card/NetBanking (Paid)',
          subtotal,
          discount: discount + pointsDiscountRupees,
          giftWrapped: isGiftWrapped,
          giftMessage: isGiftWrapped ? giftMessage : '',
          total: finalTotal,
          items: cart.map((item) => ({
            name: item.product.name,
            image: item.product.image,
            quantity: item.quantity,
            size: item.selectedSize || 'Standard',
            price: item.product.price,
          })),
          timeline: [
            {
              status: 'Order Placed & Verified',
              time: 'Today, Just now',
              location: 'Radhyaa Web Portal',
              done: true,
              current: false,
              note: `Order registered with ${paymentMethod === 'cod' ? 'COD' : 'online payment'}. Inventory reserved.`,
            },
            {
              status: 'Quality Inspected & Packaging',
              time: 'In Progress',
              location: 'Central Fulfillment Studio, New Delhi',
              done: true,
              current: true,
              note: 'Artisans are inspecting quality, adding signature fragrance & gift packaging.',
            },
            {
              status: 'Dispatched to Express Logistics Hub',
              time: 'Scheduled Tomorrow',
              location: 'Delhi Regional Courier Terminal',
              done: false,
              current: false,
              note: 'Handover to Delhivery Express with live GPS tracking.',
            },
            {
              status: 'In Transit to Destination Hub',
              time: 'Day 2–3',
              location: `${city} Regional Cargo Line`,
              done: false,
              current: false,
              note: 'Air cargo linehaul transit.',
            },
            {
              status: 'Out for Doorstep Delivery',
              time: 'Day 3–4',
              location: `${city} (${pincode}) Delivery Center`,
              done: false,
              current: false,
              note: 'Contactless doorstep delivery with SMS/WhatsApp updates.',
            },
          ],
        };

        const existing = localStorage.getItem('radhyaa_orders');
        const ordersList = existing ? JSON.parse(existing) : [];
        ordersList.unshift(orderRecord);
        localStorage.setItem('radhyaa_orders', JSON.stringify(ordersList));
      } catch (err) {
        console.error('Failed saving order to history:', err);
      }

      setConfirmedOrderId(generatedId);
      setIsSubmitting(false);
      clearCart();
      onOrderSuccess(generatedId);
    }, 1200);
  };

  const handleWhatsAppConfirmation = () => {
    if (!confirmedOrderId) return;
    const msg = encodeURIComponent(
      `Hello Radhyaa Everkart Hub! I just placed Order #${confirmedOrderId}.\nName: ${fullName}\nTotal: ₹${finalTotal}\nPayment: ${
        paymentMethod === 'cod' ? 'Cash on Delivery' : paymentMethod === 'upi' ? 'UPI' : 'Card/NetBanking'
      }\nPlease confirm shipment.`
    );
    window.open(`https://wa.me/919876543210?text=${msg}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-[#ECE3D4] overflow-hidden my-6">
        {/* Modal Header */}
        <div className="p-5 bg-[#FAF8F5] border-b border-[#ECE3D4] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#245A3E]" />
            <h3 className="font-serif text-xl font-semibold text-[#112E1F]">
              {confirmedOrderId ? 'Order Confirmed' : 'Express Secure Checkout'}
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-1.5 rounded-full hover:bg-[#ECE3D4] text-stone-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {confirmedOrderId ? (
          /* Confirmation Success Screen */
          <div className="p-8 text-center flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-800 mb-4 animate-in zoom-in duration-300">
              <CheckCircle className="w-9 h-9" />
            </div>

            <span className="text-xs font-semibold uppercase tracking-widest text-[#245A3E] mb-1">
              Thank You for Shopping With Radhyaa Everkart Hub
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#112E1F]">
              Your Order #{confirmedOrderId} Has Been Placed!
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 max-w-md mt-2 leading-relaxed">
              We have received your order. We are carefully packaging your items for dispatch.
              You will receive SMS & WhatsApp tracking updates at <span className="font-semibold text-stone-800">{phone}</span>.
            </p>

            {/* Receipt Summary Card */}
            <div className="w-full max-w-md bg-[#FAF8F5] border border-[#ECE3D4] rounded-xl p-4 my-6 text-left text-xs">
              <div className="flex justify-between py-1.5 border-b border-[#ECE3D4]/80">
                <span className="text-stone-500">Order ID</span>
                <span className="font-mono font-bold text-stone-800">{confirmedOrderId}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#ECE3D4]/80">
                <span className="text-stone-500">Customer Name</span>
                <span className="font-medium text-stone-800">{fullName}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#ECE3D4]/80">
                <span className="text-stone-500">Delivery Address</span>
                <span className="font-medium text-stone-800 text-right max-w-xs truncate">
                  {address}, {city}, {state} - {pincode}
                </span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#ECE3D4]/80">
                <span className="text-stone-500">Payment Mode</span>
                <span className="font-medium text-emerald-800 uppercase">
                  {paymentMethod === 'cod' ? 'Cash on Delivery (COD)' : paymentMethod === 'upi' ? 'Instant UPI' : 'Card'}
                </span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#ECE3D4]/80 text-emerald-800 font-medium">
                <span className="flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-[#DFB76C]" />
                  <span>Radhyaa Rewards Earned</span>
                </span>
                <span className="tabular-nums">+{pointsEarned} points credited</span>
              </div>
              {isGiftWrapped && (
                <div className="flex justify-between py-1.5 border-b border-[#ECE3D4]/80 text-[#112E1F]">
                  <span className="flex items-center gap-1 font-medium">
                    <Gift className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>Signature Festive Gift Wrap</span>
                  </span>
                  <span className="tabular-nums font-semibold">+₹{giftWrappingFee}</span>
                </div>
              )}
              {isGiftWrapped && giftMessage && (
                <div className="py-1.5 border-b border-[#ECE3D4]/80 text-stone-600 text-[11px] italic">
                  <span className="not-italic font-medium text-stone-700 block">Gift Note Card:</span>
                  "{giftMessage}"
                </div>
              )}
              <div className="flex justify-between py-2 text-sm font-bold text-[#112E1F]">
                <span>Total Amount</span>
                <span className="tabular-nums">₹{finalTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-md">
              {onTrackOrder && (
                <button
                  type="button"
                  onClick={() => {
                    const id = confirmedOrderId;
                    onClose();
                    onTrackOrder(id);
                  }}
                  className="w-full py-3 bg-[#112E1F] hover:bg-[#1C4832] text-amber-200 rounded-lg text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-md"
                >
                  <Truck className="w-4 h-4 text-[#DFB76C]" />
                  <span>View Live Tracking</span>
                </button>
              )}

              <button
                type="button"
                onClick={handleWhatsAppConfirmation}
                className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-md"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Confirm on WhatsApp</span>
              </button>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="mt-3 text-xs text-stone-500 hover:text-stone-800 underline font-medium"
            >
              Back to Catalog / Continue Shopping
            </button>
          </div>
        ) : (
          /* Checkout Form & Items Review */
          <form onSubmit={handleSubmitOrder} className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Left Column: Customer & Delivery Info */}
            <div className="md:col-span-7 flex flex-col gap-5">
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#112E1F] mb-3 flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#C5A059]" />
                  <span>1. Contact & Shipping Address</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-medium text-stone-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Radhika Sharma"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-[#ECE3D4] rounded-lg focus:outline-hidden focus:border-[#112E1F] bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-stone-700 mb-1">
                      Phone Number (WhatsApp) *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 9876543210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-[#ECE3D4] rounded-lg focus:outline-hidden focus:border-[#112E1F] bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-stone-700 mb-1">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      placeholder="radhika@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-[#ECE3D4] rounded-lg focus:outline-hidden focus:border-[#112E1F] bg-white"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-medium text-stone-700 mb-1">
                      Flat / House No., Street, Locality *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="House No, Apartment name, Road or Area"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-[#ECE3D4] rounded-lg focus:outline-hidden focus:border-[#112E1F] bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-stone-700 mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. New Delhi"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-[#ECE3D4] rounded-lg focus:outline-hidden focus:border-[#112E1F] bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-stone-700 mb-1">
                      Pincode *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 110001"
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-[#ECE3D4] rounded-lg focus:outline-hidden focus:border-[#112E1F] bg-white"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-medium text-stone-700 mb-1">
                      State *
                    </label>
                    <select
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-[#ECE3D4] rounded-lg focus:outline-hidden focus:border-[#112E1F] bg-white"
                    >
                      <option value="Delhi">Delhi NCR</option>
                      <option value="Maharashtra">Maharashtra</option>
                      <option value="Karnataka">Karnataka</option>
                      <option value="Rajasthan">Rajasthan</option>
                      <option value="Uttar Pradesh">Uttar Pradesh</option>
                      <option value="Haryana">Haryana</option>
                      <option value="Gujarat">Gujarat</option>
                      <option value="Tamil Nadu">Tamil Nadu</option>
                      <option value="West Bengal">West Bengal</option>
                      <option value="Punjab">Punjab</option>
                      <option value="Telangana">Telangana</option>
                      <option value="Other">Other State</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Payment Methods */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#112E1F] mb-3 flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-[#C5A059]" />
                  <span>2. Select Payment Method</span>
                </h4>

                <div className="space-y-2">
                  <label
                    className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all ${
                      paymentMethod === 'cod'
                        ? 'border-[#112E1F] bg-[#FAF8F5]'
                        : 'border-[#ECE3D4] bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === 'cod'}
                        onChange={() => setPaymentMethod('cod')}
                        className="text-[#112E1F] focus:ring-[#112E1F]"
                      />
                      <div className="flex items-center gap-2">
                        <Banknote className="w-4 h-4 text-emerald-700" />
                        <div>
                          <span className="text-xs font-semibold text-[#112E1F]">
                            Cash on Delivery (COD)
                          </span>
                          <span className="block text-[10px] text-stone-500">
                            Pay in cash or UPI to delivery agent upon arrival
                          </span>
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      Zero Surcharge
                    </span>
                  </label>

                  <label
                    className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all ${
                      paymentMethod === 'upi'
                        ? 'border-[#112E1F] bg-[#FAF8F5]'
                        : 'border-[#ECE3D4] bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === 'upi'}
                        onChange={() => setPaymentMethod('upi')}
                        className="text-[#112E1F] focus:ring-[#112E1F]"
                      />
                      <div className="flex items-center gap-2">
                        <Smartphone className="w-4 h-4 text-indigo-600" />
                        <div>
                          <span className="text-xs font-semibold text-[#112E1F]">
                            UPI (Google Pay / PhonePe / Paytm / BHIM)
                          </span>
                          <span className="block text-[10px] text-stone-500">
                            Instant scan and pay confirmation
                          </span>
                        </div>
                      </div>
                    </div>
                  </label>

                  <label
                    className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all ${
                      paymentMethod === 'card'
                        ? 'border-[#112E1F] bg-[#FAF8F5]'
                        : 'border-[#ECE3D4] bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === 'card'}
                        onChange={() => setPaymentMethod('card')}
                        className="text-[#112E1F] focus:ring-[#112E1F]"
                      />
                      <div className="flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-amber-700" />
                        <div>
                          <span className="text-xs font-semibold text-[#112E1F]">
                            Credit / Debit Card or Net Banking
                          </span>
                          <span className="block text-[10px] text-stone-500">
                            Visa, Mastercard, RuPay & all major banks
                          </span>
                        </div>
                      </div>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Right Column: Order Summary */}
            <div className="md:col-span-5 bg-[#FAF8F5] p-5 rounded-xl border border-[#ECE3D4] flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#112E1F] mb-3 flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4 text-[#C5A059]" />
                  <span>Order Summary ({cart.length} items)</span>
                </h4>

                <div className="max-h-48 overflow-y-auto divide-y divide-[#ECE3D4] pr-1">
                  {cart.map((item, idx) => (
                    <div key={idx} className="py-2.5 flex items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-2 min-w-0">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-10 h-10 rounded object-cover border border-[#ECE3D4] shrink-0"
                        />
                        <div className="min-w-0">
                          <p className="font-medium text-stone-800 truncate">{item.product.name}</p>
                          <span className="text-[10px] text-stone-500">
                            Qty: {item.quantity} {item.selectedSize ? `· ${item.selectedSize}` : ''}
                          </span>
                        </div>
                      </div>
                      <span className="font-semibold text-stone-800 tabular-nums shrink-0">
                        ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 pt-4 border-t border-[#ECE3D4] space-y-1.5 text-xs text-stone-600">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-medium text-stone-800 tabular-nums">
                      ₹{subtotal.toLocaleString('en-IN')}
                    </span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-emerald-800 font-medium">
                      <span>Coupon Discount</span>
                      <span className="tabular-nums">- ₹{discount.toLocaleString('en-IN')}</span>
                    </div>
                  )}
                  {pointsDiscountRupees > 0 && (
                    <div className="flex justify-between text-emerald-800 font-medium">
                      <span>Radhyaa Rewards Points</span>
                      <span className="tabular-nums">- ₹{pointsDiscountRupees.toLocaleString('en-IN')}</span>
                    </div>
                  )}
                  {isGiftWrapped && (
                    <div className="flex justify-between text-[#112E1F] font-medium">
                      <span className="flex items-center gap-1.5 text-emerald-800">
                        <Gift className="w-3.5 h-3.5 text-[#C5A059]" />
                        <span>Signature Festive Gift Wrap</span>
                      </span>
                      <span className="tabular-nums font-semibold">+ ₹{giftWrappingFee}</span>
                    </div>
                  )}
                  {isGiftWrapped && giftMessage && (
                    <div className="p-2 bg-white rounded border border-[#ECE3D4] text-[11px] text-stone-600 leading-snug">
                      <span className="font-semibold text-stone-700 block text-[10px] uppercase tracking-wider text-[#245A3E]">
                        Included Gift Note:
                      </span>
                      <p className="italic text-stone-600 mt-0.5">"{giftMessage}"</p>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Pan-India Delivery</span>
                    <span className="tabular-nums font-medium">
                      {shippingFee === 0 ? <span className="text-emerald-700">FREE</span> : `₹${shippingFee}`}
                    </span>
                  </div>
                  <div className="p-2 bg-[#FAF8F5] rounded border border-[#ECE3D4] flex items-center justify-between text-[11px] text-[#245A3E]">
                    <span className="flex items-center gap-1 font-medium">
                      <Sparkles className="w-3 h-3 text-[#DFB76C]" />
                      <span>Points to earn:</span>
                    </span>
                    <strong className="font-semibold tabular-nums">+{pointsEarned} pts</strong>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-[#112E1F] pt-2 border-t border-[#ECE3D4]">
                    <span>Payable Total</span>
                    <span className="tabular-nums">₹{finalTotal.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="mt-6 pt-4 border-t border-[#ECE3D4]">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-[#112E1F] hover:bg-[#1C4832] disabled:opacity-60 text-white rounded-lg text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md"
                >
                  {isSubmitting ? (
                    <span>Placing Your Order...</span>
                  ) : (
                    <>
                      <span>Confirm & Place Order (₹{finalTotal.toLocaleString('en-IN')})</span>
                      <ArrowRight className="w-4 h-4 text-[#DFB76C]" />
                    </>
                  )}
                </button>

                <p className="text-[10px] text-stone-500 text-center mt-2.5">
                  By clicking Place Order, you confirm your shipping address and order details.
                </p>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
