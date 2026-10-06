import React, { useState } from 'react';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Tag,
  Check,
  Sparkles,
  Gift,
  Coins,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useRewards } from '../context/RewardsContext';

interface CartDrawerProps {
  onProceedToCheckout: () => void;
  onExploreProducts: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  onProceedToCheckout,
  onExploreProducts,
}) => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    subtotal,
    discount,
    couponCode,
    applyCoupon,
    removeCoupon,
    isGiftWrapped,
    setIsGiftWrapped,
    giftMessage,
    setGiftMessage,
    giftWrappingFee,
    showToast,
    freeShippingThreshold,
    freeShippingProgress,
  } = useCart();

  const {
    rewards,
    selectedPointsToRedeem,
    setSelectedPointsToRedeem,
    pointsDiscountRupees,
    earnPointsFromAmount,
    pointsToRupees,
  } = useRewards();

  const [inputCode, setInputCode] = useState('');
  const [couponError, setCouponError] = useState('');

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCode.trim()) return;
    const res = applyCoupon(inputCode);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponError('');
      setInputCode('');
    }
  };

  const pointsToEarn = earnPointsFromAmount(subtotal);
  const maxRedeemablePoints = Math.min(rewards.points, Math.floor((subtotal * 0.5) / 0.5));
  const isPointsRedeemed = selectedPointsToRedeem > 0;

  const toggleRedeemPoints = () => {
    if (isPointsRedeemed) {
      setSelectedPointsToRedeem(0);
    } else {
      setSelectedPointsToRedeem(maxRedeemablePoints);
    }
  };

  const finalTotal = Math.max(0, subtotal - discount - pointsDiscountRupees) + giftWrappingFee;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-900/50 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between border-l border-[#ECE3D4] animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#ECE3D4] flex items-center justify-between bg-[#FAF8F5]">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#112E1F]" />
            <h3 className="font-serif text-lg font-semibold text-[#112E1F]">
              Your Shopping Bag ({cart.length})
            </h3>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            aria-label="Close cart"
            className="p-1.5 rounded-full hover:bg-[#ECE3D4] text-stone-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Meter */}
        <div className="px-5 py-3 bg-[#F5EFE6] border-b border-[#ECE3D4]">
          <div className="flex items-center justify-between text-xs font-medium text-[#112E1F] mb-1.5">
            {remainingForFreeShipping > 0 ? (
              <span>
                Add <span className="font-bold text-[#1C4832]">₹{remainingForFreeShipping}</span> more for Free Shipping!
              </span>
            ) : (
              <span className="text-emerald-800 flex items-center gap-1 font-semibold">
                <Check className="w-3.5 h-3.5" /> Congratulations! You unlocked Free Shipping
              </span>
            )}
            <span className="text-stone-500 tabular-nums">{freeShippingProgress}%</span>
          </div>
          <div className="w-full bg-[#ECE3D4] h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-[#1C4832] h-full rounded-full transition-all duration-300"
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-5 divide-y divide-[#ECE3D4]">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <div className="w-16 h-16 rounded-full bg-[#FAF8F5] border border-[#ECE3D4] flex items-center justify-center text-stone-400 mb-4">
                <ShoppingBag className="w-8 h-8 stroke-1" />
              </div>
              <h4 className="font-serif text-lg font-semibold text-[#112E1F]">
                Your shopping bag is empty
              </h4>
              <p className="text-xs text-stone-500 max-w-xs mt-1 mb-6 leading-relaxed">
                Discover our curated seasonal decor, Shagun envelopes, and premium pure cotton bedsheets.
              </p>
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  onExploreProducts();
                }}
                className="px-5 py-2.5 bg-[#112E1F] hover:bg-[#1C4832] text-white text-xs font-semibold uppercase tracking-wider rounded-md transition-colors"
              >
                Browse Collections
              </button>
            </div>
          ) : (
            cart.map((item, idx) => (
              <div key={`${item.product.id}-${item.selectedSize}-${idx}`} className="py-4 flex gap-4">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  referrerPolicy="no-referrer"
                  className="w-20 h-20 rounded-lg object-cover border border-[#ECE3D4] bg-[#FAF8F5] shrink-0"
                />

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-xs font-semibold text-[#112E1F] line-clamp-2 leading-snug">
                        {item.product.name}
                      </h4>
                      <button
                        onClick={() => removeFromCart(item.product.id, item.selectedSize)}
                        aria-label="Remove item"
                        className="text-stone-400 hover:text-rose-600 transition-colors p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {item.selectedSize && (
                      <span className="text-[11px] text-[#245A3E] font-medium block mt-0.5">
                        Size/Pack: {item.selectedSize}
                      </span>
                    )}

                    <div className="text-xs font-bold text-[#112E1F] mt-1 tabular-nums">
                      ₹{item.product.price.toLocaleString('en-IN')}
                    </div>
                  </div>

                  {/* Quantity Stepper */}
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center border border-[#ECE3D4] rounded bg-white">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.selectedSize)}
                        className="px-2 py-0.5 text-stone-600 hover:bg-[#FAF8F5]"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2.5 py-0.5 text-xs font-medium tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.selectedSize)}
                        className="px-2 py-0.5 text-stone-600 hover:bg-[#FAF8F5]"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <span className="text-[11px] text-stone-500 tabular-nums ml-auto">
                      Total: ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer & Checkout Action */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-[#ECE3D4] bg-[#FAF8F5] flex flex-col gap-3">
            {/* Signature Festive Gift Wrapping Section */}
            <div
              className={`p-3.5 rounded-xl border transition-all ${
                isGiftWrapped
                  ? 'bg-gradient-to-br from-[#FAF8F5] to-[#F5EFE6] border-[#DFB76C] shadow-xs'
                  : 'bg-white border-[#ECE3D4] hover:border-[#DFB76C]/60'
              }`}
            >
              <label className="flex items-start gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={isGiftWrapped}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    setIsGiftWrapped(checked);
                    if (checked) {
                      showToast('Added Signature Gift Wrapping (+₹49) with handwritten note! 🎁');
                    } else {
                      showToast('Gift wrapping removed.', 'info');
                    }
                  }}
                  className="mt-0.5 h-4 w-4 rounded text-[#112E1F] border-[#ECE3D4] focus:ring-[#112E1F] accent-[#112E1F] cursor-pointer shrink-0"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#112E1F] flex items-center gap-1.5">
                      <Gift className="w-3.5 h-3.5 text-[#C5A059]" />
                      <span>Signature Festive Gift Wrapping</span>
                    </span>
                    <span className="text-[11px] font-bold text-[#112E1F] bg-amber-100 px-2 py-0.5 rounded border border-amber-200">
                      +₹49
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-500 mt-0.5 leading-snug">
                    Handcrafted botanical wrap, gold zari ribbon & personalized keepsake card.
                  </p>
                </div>
              </label>

              {/* Collapsible Personalized Gift Note Input */}
              {isGiftWrapped && (
                <div className="mt-3 pt-3 border-t border-[#ECE3D4] space-y-2 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-semibold text-[#112E1F]">
                      Personalized Message on Note Card:
                    </span>
                    <span className="text-[10px] text-stone-400 tabular-nums">
                      {giftMessage.length}/150
                    </span>
                  </div>

                  <textarea
                    rows={2}
                    maxLength={150}
                    value={giftMessage}
                    onChange={(e) => setGiftMessage(e.target.value)}
                    placeholder="Write a warm note for the recipient (e.g. Wishing you a joyous wedding & married life ahead!)..."
                    className="w-full p-2.5 text-xs bg-white border border-[#ECE3D4] rounded-lg focus:outline-hidden focus:border-[#112E1F] text-stone-800 placeholder-stone-400 resize-none leading-relaxed"
                  />

                  {/* Preset Quick Note Ideas */}
                  <div className="flex flex-wrap items-center gap-1 pt-0.5">
                    <span className="text-[10px] text-stone-400">Quick suggestions:</span>
                    <button
                      type="button"
                      onClick={() =>
                        setGiftMessage('Wishing you endless love, happiness, and celebrations on this auspicious occasion!')
                      }
                      className="text-[10px] px-2 py-0.5 rounded bg-white hover:bg-[#FAF8F5] text-stone-600 border border-[#ECE3D4] transition-colors"
                    >
                      💍 Wedding
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setGiftMessage('May this festive season bring joy, health, and abundant prosperity to your family.')
                      }
                      className="text-[10px] px-2 py-0.5 rounded bg-white hover:bg-[#FAF8F5] text-stone-600 border border-[#ECE3D4] transition-colors"
                    >
                      🪔 Festive
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setGiftMessage('With warmest love, heartfelt blessings, and best wishes for your beautiful home!')
                      }
                      className="text-[10px] px-2 py-0.5 rounded bg-white hover:bg-[#FAF8F5] text-stone-600 border border-[#ECE3D4] transition-colors"
                    >
                      🌸 Blessings
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Coupon Code Section */}
            <div>
              {couponCode ? (
                <div className="flex items-center justify-between p-2 bg-emerald-50 border border-emerald-200 rounded-md text-xs text-emerald-800">
                  <div className="flex items-center gap-1.5 font-medium">
                    <Tag className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Coupon "{couponCode}" Applied</span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-stone-500 hover:text-stone-800 text-[11px] underline"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter Coupon (e.g. FESTIVE10)"
                    value={inputCode}
                    onChange={(e) => setInputCode(e.target.value)}
                    className="flex-1 px-3 py-1.5 text-xs border border-[#ECE3D4] rounded-md bg-white focus:outline-hidden focus:border-[#112E1F]"
                  />
                  <button
                    type="submit"
                    className="px-3 py-1.5 bg-[#112E1F] hover:bg-[#1C4832] text-white text-xs font-medium rounded-md transition-colors"
                  >
                    Apply
                  </button>
                </form>
              )}
              {couponError && (
                <p className="text-[11px] text-rose-600 mt-1">{couponError}</p>
              )}
            </div>

            {/* Radhyaa Rewards Points Redemption Box */}
            <div className="p-3 bg-[#FAF8F5] border border-[#ECE3D4] rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#112E1F]">
                  <Coins className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>Radhyaa Rewards</span>
                  <span className="text-[10px] text-stone-500 font-normal">
                    ({rewards.points} pts available)
                  </span>
                </div>

                {rewards.points > 0 && (
                  <button
                    onClick={toggleRedeemPoints}
                    className={`text-[11px] font-semibold px-2.5 py-1 rounded transition-colors ${
                      isPointsRedeemed
                        ? 'bg-rose-100 text-rose-800'
                        : 'bg-[#112E1F] text-amber-200 hover:bg-[#1C4832]'
                    }`}
                  >
                    {isPointsRedeemed ? 'Remove Points' : `Redeem (₹${pointsToRupees(maxRedeemablePoints)} OFF)`}
                  </button>
                )}
              </div>

              {isPointsRedeemed && (
                <p className="text-[11px] text-emerald-800 font-medium mt-1.5 flex items-center gap-1">
                  <Check className="w-3 h-3 text-emerald-600" />
                  Redeeming {selectedPointsToRedeem} points for ₹{pointsDiscountRupees} instant discount!
                </p>
              )}

              {/* Earn Teaser */}
              <div className="mt-2 pt-2 border-t border-[#ECE3D4]/60 flex items-center justify-between text-[11px] text-[#245A3E]">
                <span className="flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-[#DFB76C]" />
                  <span>You will earn with this order:</span>
                </span>
                <strong className="font-semibold tabular-nums">+{pointsToEarn} points</strong>
              </div>
            </div>

            {/* Price Calculations */}
            <div className="flex flex-col gap-1.5 text-xs text-stone-600 pt-1">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-medium text-stone-900 tabular-nums">
                  ₹{subtotal.toLocaleString('en-IN')}
                </span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>Festive Discount</span>
                  <span className="tabular-nums">- ₹{discount.toLocaleString('en-IN')}</span>
                </div>
              )}

              {pointsDiscountRupees > 0 && (
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>Radhyaa Rewards Points</span>
                  <span className="tabular-nums">- ₹{pointsDiscountRupees.toLocaleString('en-IN')}</span>
                </div>
              )}

              {isGiftWrapped && (
                <div className="flex justify-between text-[#112E1F] font-medium">
                  <span className="flex items-center gap-1.5 text-emerald-900">
                    <Gift className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>Signature Gift Wrapping</span>
                  </span>
                  <span className="tabular-nums font-semibold">+ ₹{giftWrappingFee}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Estimated Shipping</span>
                <span className="tabular-nums font-medium text-stone-900">
                  {subtotal >= freeShippingThreshold ? (
                    <span className="text-emerald-700">FREE</span>
                  ) : (
                    '₹99'
                  )}
                </span>
              </div>

              <div className="flex justify-between text-sm font-bold text-[#112E1F] pt-2 border-t border-[#ECE3D4]">
                <span>Total Amount</span>
                <span className="tabular-nums">
                  ₹{(finalTotal + (subtotal >= freeShippingThreshold ? 0 : 99)).toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Checkout Action Button */}
            <button
              onClick={() => {
                setIsCartOpen(false);
                onProceedToCheckout();
              }}
              className="w-full py-3 bg-[#112E1F] hover:bg-[#1C4832] text-white rounded-lg text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-md mt-1"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4 text-[#DFB76C]" />
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[10px] text-stone-500 text-center">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
              <span>Safe & Secure Indian Checkout · UPI & COD Available</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
