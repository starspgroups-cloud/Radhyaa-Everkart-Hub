import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserRewards, RewardTransaction } from '../types';

interface RewardsContextType {
  rewards: UserRewards;
  isAccountDrawerOpen: boolean;
  setIsAccountDrawerOpen: (open: boolean) => void;
  selectedPointsToRedeem: number;
  setSelectedPointsToRedeem: (points: number) => void;
  pointsDiscountRupees: number;
  earnPointsFromAmount: (amount: number) => number;
  addPoints: (amount: number, description: string, orderId?: string) => void;
  redeemPoints: (amount: number, orderId?: string) => boolean;
  pointsToRupees: (points: number) => number;
  currentTier: 'Bronze Member' | 'Silver Patron' | 'Gold Royal Club';
  tierProgress: {
    current: number;
    target: number;
    percentage: number;
    nextTierName: string;
    pointsNeeded: number;
  };
}

const DEFAULT_REWARDS: UserRewards = {
  points: 150, // Welcome bonus of 150 points for every member
  lifetimePoints: 150,
  tier: 'Bronze Member',
  history: [
    {
      id: 'tx-welcome',
      type: 'bonus',
      points: 150,
      description: 'Welcome to Radhyaa Rewards! Joining Bonus credited.',
      date: 'Today',
    },
  ],
};

const RewardsContext = createContext<RewardsContextType | undefined>(undefined);

export const RewardsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [rewards, setRewards] = useState<UserRewards>(() => {
    try {
      const saved = localStorage.getItem('radhyaa_rewards');
      return saved ? JSON.parse(saved) : DEFAULT_REWARDS;
    } catch {
      return DEFAULT_REWARDS;
    }
  });

  const [isAccountDrawerOpen, setIsAccountDrawerOpen] = useState(false);
  const [selectedPointsToRedeem, setSelectedPointsToRedeem] = useState<number>(0);

  useEffect(() => {
    try {
      localStorage.setItem('radhyaa_rewards', JSON.stringify(rewards));
    } catch (e) {
      console.error(e);
    }
  }, [rewards]);

  // Points to Rupee conversion: 1 point = ₹0.50
  const pointsToRupees = (pts: number) => Math.floor(pts * 0.5);

  const pointsDiscountRupees = pointsToRupees(selectedPointsToRedeem);

  // Determine current tier from lifetime points
  const getTier = (lifetime: number): 'Bronze Member' | 'Silver Patron' | 'Gold Royal Club' => {
    if (lifetime >= 500) return 'Gold Royal Club';
    if (lifetime >= 250) return 'Silver Patron';
    return 'Bronze Member';
  };

  const currentTier = getTier(rewards.lifetimePoints);

  // Calculate tier progress
  const getTierProgress = () => {
    const lifetime = rewards.lifetimePoints;
    if (lifetime >= 500) {
      return {
        current: lifetime,
        target: 500,
        percentage: 100,
        nextTierName: 'Maximum Royalty Reached',
        pointsNeeded: 0,
      };
    }
    if (lifetime >= 250) {
      const pointsInSilver = lifetime - 250;
      const progress = Math.min(100, Math.round((pointsInSilver / 250) * 100));
      return {
        current: lifetime,
        target: 500,
        percentage: progress,
        nextTierName: 'Gold Royal Club',
        pointsNeeded: 500 - lifetime,
      };
    }
    const progress = Math.min(100, Math.round((lifetime / 250) * 100));
    return {
      current: lifetime,
      target: 250,
      percentage: progress,
      nextTierName: 'Silver Patron',
      pointsNeeded: 250 - lifetime,
    };
  };

  const tierProgress = getTierProgress();

  // Tier earning multiplier
  const earnPointsFromAmount = (amount: number) => {
    const basePoints = Math.floor(amount / 10); // 1 point per ₹10
    const multiplier = currentTier === 'Gold Royal Club' ? 1.5 : currentTier === 'Silver Patron' ? 1.25 : 1.0;
    return Math.round(basePoints * multiplier);
  };

  const addPoints = (amount: number, description: string, orderId?: string) => {
    if (amount <= 0) return;
    setRewards((prev) => {
      const newPoints = prev.points + amount;
      const newLifetime = prev.lifetimePoints + amount;
      const newTx: RewardTransaction = {
        id: `tx-${Date.now()}`,
        type: 'earned',
        points: amount,
        description,
        date: new Date().toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' }),
        orderId,
      };
      return {
        points: newPoints,
        lifetimePoints: newLifetime,
        tier: getTier(newLifetime),
        history: [newTx, ...prev.history],
      };
    });
  };

  const redeemPoints = (amount: number, orderId?: string) => {
    if (amount <= 0 || amount > rewards.points) return false;
    setRewards((prev) => {
      const newPoints = prev.points - amount;
      const newTx: RewardTransaction = {
        id: `tx-${Date.now()}`,
        type: 'redeemed',
        points: -amount,
        description: `Redeemed for ₹${pointsToRupees(amount)} discount on Order`,
        date: new Date().toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' }),
        orderId,
      };
      return {
        ...prev,
        points: newPoints,
        history: [newTx, ...prev.history],
      };
    });
    setSelectedPointsToRedeem(0);
    return true;
  };

  return (
    <RewardsContext.Provider
      value={{
        rewards,
        isAccountDrawerOpen,
        setIsAccountDrawerOpen,
        selectedPointsToRedeem,
        setSelectedPointsToRedeem,
        pointsDiscountRupees,
        earnPointsFromAmount,
        addPoints,
        redeemPoints,
        pointsToRupees,
        currentTier,
        tierProgress,
      }}
    >
      {children}
    </RewardsContext.Provider>
  );
};

export const useRewards = () => {
  const context = useContext(RewardsContext);
  if (!context) {
    throw new Error('useRewards must be used within a RewardsProvider');
  }
  return context;
};
