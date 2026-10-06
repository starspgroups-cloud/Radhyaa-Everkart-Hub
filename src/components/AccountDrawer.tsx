import React from 'react';
import {
  X,
  Crown,
  Sparkles,
  Award,
  Gift,
  ArrowRight,
  TrendingUp,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Coins,
} from 'lucide-react';
import { useRewards } from '../context/RewardsContext';
import { useCart } from '../context/CartContext';
import { BrandLogo } from './BrandLogo';

interface AccountDrawerProps {
  onBrowseShop: () => void;
}

export const AccountDrawer: React.FC<AccountDrawerProps> = ({ onBrowseShop }) => {
  const {
    rewards,
    isAccountDrawerOpen,
    setIsAccountDrawerOpen,
    currentTier,
    tierProgress,
    pointsToRupees,
  } = useRewards();

  const { setIsCartOpen } = useCart();

  if (!isAccountDrawerOpen) return null;

  const worthInRupees = pointsToRupees(rewards.points);

  const tierColors = {
    'Bronze Member': {
      bg: 'bg-amber-800/10',
      border: 'border-amber-700/30',
      text: 'text-amber-800',
      badge: 'Bronze',
    },
    'Silver Patron': {
      bg: 'bg-slate-100',
      border: 'border-slate-300',
      text: 'text-slate-800',
      badge: 'Silver',
    },
    'Gold Royal Club': {
      bg: 'bg-amber-100/80',
      border: 'border-amber-400',
      text: 'text-amber-900',
      badge: 'Gold Royal',
    },
  }[currentTier];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-900/50 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between border-l border-[#ECE3D4] animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#ECE3D4] flex items-center justify-between bg-[#FAF8F5]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full overflow-hidden border border-[#112E1F]/20">
              <BrandLogo size="sm" emblemOnly={true} />
            </div>
            <div>
              <h3 className="font-serif text-lg font-semibold text-[#112E1F] leading-tight">
                My Radhyaa Account
              </h3>
              <span className="text-[10px] text-stone-500">
                Customer ID: #REH-9842 · Member since 2026
              </span>
            </div>
          </div>
          <button
            onClick={() => setIsAccountDrawerOpen(false)}
            aria-label="Close account drawer"
            className="p-1.5 rounded-full hover:bg-[#ECE3D4] text-stone-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6 bg-[#FAF8F5]/50">
          {/* Member Card */}
          <div className="bg-gradient-to-br from-[#0F2D1E] via-[#173B28] to-[#1C4832] text-white p-5 rounded-2xl border border-[#DFB76C]/40 shadow-xl relative overflow-hidden">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-widest text-[#DFB76C]">
                  Radhyaa Rewards Card
                </span>
                <h4 className="font-serif text-xl font-semibold mt-0.5">Radhika Sharma</h4>
                <span className="text-xs text-stone-300">Patron Member</span>
              </div>
              <div
                className={`px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider border shadow-xs flex items-center gap-1 ${
                  currentTier === 'Gold Royal Club'
                    ? 'bg-amber-400 text-stone-900 border-amber-300'
                    : currentTier === 'Silver Patron'
                    ? 'bg-slate-200 text-stone-900 border-white'
                    : 'bg-amber-900/60 text-amber-200 border-amber-500/40'
                }`}
              >
                <Crown className="w-3 h-3" />
                <span>{tierColors.badge} Tier</span>
              </div>
            </div>

            {/* Points Balance */}
            <div className="mt-5 pt-4 border-t border-white/15 flex items-baseline justify-between">
              <div>
                <span className="text-[11px] text-stone-300 block">Available Points Balance</span>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="font-serif text-3xl sm:text-4xl font-bold text-white tabular-nums">
                    {rewards.points}
                  </span>
                  <span className="text-xs text-amber-200 font-medium">Points</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-stone-300 block">Cash Redemption Value</span>
                <span className="text-base font-bold text-[#DFB76C] tabular-nums">
                  ₹{worthInRupees} OFF
                </span>
              </div>
            </div>

            {/* Background Decorative Emblem */}
            <div className="absolute -right-6 -bottom-6 opacity-10 pointer-events-none">
              <Coins className="w-36 h-36" />
            </div>
          </div>

          {/* Tier Progress Bar Card */}
          <div className="bg-white p-5 rounded-xl border border-[#ECE3D4] shadow-xs space-y-3">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 font-semibold text-[#112E1F]">
                <TrendingUp className="w-4 h-4 text-[#245A3E]" />
                <span>Tier Status & Progress</span>
              </div>
              <span className="text-[11px] font-bold text-[#245A3E]">{currentTier}</span>
            </div>

            {/* The Progress Bar */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-[11px] text-stone-500">
                <span>{rewards.lifetimePoints} lifetime pts</span>
                {tierProgress.pointsNeeded > 0 ? (
                  <span>
                    <strong>{tierProgress.pointsNeeded} pts</strong> to {tierProgress.nextTierName}
                  </span>
                ) : (
                  <span className="text-emerald-700 font-semibold flex items-center gap-0.5">
                    <CheckCircle2 className="w-3 h-3" /> Highest Tier
                  </span>
                )}
              </div>

              <div className="w-full bg-[#FAF8F5] h-2.5 rounded-full overflow-hidden border border-[#ECE3D4]">
                <div
                  className="bg-gradient-to-r from-[#173B28] via-[#245A3E] to-[#DFB76C] h-full rounded-full transition-all duration-500"
                  style={{ width: `${tierProgress.percentage}%` }}
                />
              </div>

              <div className="flex justify-between text-[10px] text-stone-400 pt-0.5">
                <span>Bronze (0)</span>
                <span>Silver (250)</span>
                <span>Gold (500+)</span>
              </div>
            </div>

            {/* Tier Benefits */}
            <div className="mt-3 pt-3 border-t border-[#ECE3D4] text-[11px] text-stone-600 space-y-1.5">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>
                  <strong>Bronze:</strong> Earn 1 point per ₹10 spent (1x points)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>
                  <strong>Silver (250 pts):</strong> 1.25x points multiplier + Free gift Shagun lifafa
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>
                  <strong>Gold (500 pts):</strong> 1.5x points multiplier + VIP early festive previews
                </span>
              </div>
            </div>
          </div>

          {/* How to Earn & Redeem */}
          <div className="bg-[#FAF8F5] p-4 rounded-xl border border-[#ECE3D4] space-y-2.5 text-xs">
            <h4 className="font-serif text-sm font-semibold text-[#112E1F] flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#DFB76C]" />
              <span>How Radhyaa Rewards Work</span>
            </h4>
            <div className="grid grid-cols-2 gap-2 pt-1 text-[11px] text-stone-600">
              <div className="p-2.5 bg-white rounded-lg border border-[#ECE3D4]">
                <strong className="block text-[#112E1F]">Earn on Every Order</strong>
                <span>Get points credited automatically upon delivery.</span>
              </div>
              <div className="p-2.5 bg-white rounded-lg border border-[#ECE3D4]">
                <strong className="block text-[#112E1F]">Instant Redemption</strong>
                <span>Redeem 100 points = ₹50 off at checkout anytime.</span>
              </div>
            </div>
          </div>

          {/* Points Activity History */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#112E1F] flex items-center justify-between">
              <span>Points Activity</span>
              <span className="text-[10px] text-stone-400 font-normal">Recent transactions</span>
            </h4>

            <div className="bg-white rounded-xl border border-[#ECE3D4] divide-y divide-[#ECE3D4] overflow-hidden text-xs">
              {rewards.history.length === 0 ? (
                <div className="p-4 text-center text-stone-400">No activity yet</div>
              ) : (
                rewards.history.map((tx) => (
                  <div key={tx.id} className="p-3 flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <p className="font-medium text-stone-800 truncate">{tx.description}</p>
                      <span className="text-[10px] text-stone-400 block">{tx.date}</span>
                    </div>
                    <span
                      className={`font-semibold tabular-nums shrink-0 ${
                        tx.points > 0 ? 'text-emerald-700' : 'text-rose-600'
                      }`}
                    >
                      {tx.points > 0 ? `+${tx.points}` : tx.points} pts
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Footer Quick Actions */}
        <div className="p-4 sm:p-5 border-t border-[#ECE3D4] bg-[#FAF8F5] flex flex-col gap-2.5">
          <button
            onClick={() => {
              setIsAccountDrawerOpen(false);
              setIsCartOpen(true);
            }}
            className="w-full py-2.5 bg-[#112E1F] hover:bg-[#1C4832] text-white rounded-lg text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-xs"
          >
            <Gift className="w-4 h-4 text-[#DFB76C]" />
            <span>Redeem Points in Shopping Bag</span>
          </button>

          <button
            onClick={() => {
              setIsAccountDrawerOpen(false);
              onBrowseShop();
            }}
            className="w-full py-2.5 bg-white hover:bg-[#ECE3D4] text-[#112E1F] border border-[#ECE3D4] rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors"
          >
            Browse Collections to Earn More
          </button>
        </div>
      </div>
    </div>
  );
};
