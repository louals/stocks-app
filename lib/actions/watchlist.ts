// app/actions/watchlist.ts
"use server";

import { Watchlist } from '@/database/models/watchlist.model';
import { ConnectToDB } from '@/database/mongoose';
import { revalidatePath } from 'next/cache';
import { getCurrentUser } from './auth-utils';

export interface ToggleWatchlistInput {
  symbol: string;
  company: string;
}

// Toggle function (adds if not exists, removes if exists)
export async function toggleWatchlist(data: ToggleWatchlistInput) {
  try {
    // Get current user
    const user = await getCurrentUser();
    
    if (!user) {
      return { 
        success: false, 
        added: false, 
        message: 'User not authenticated' 
      };
    }
    
    await ConnectToDB();
    
    const { symbol, company } = data;
    
    // Check if already in watchlist
    const existing = await Watchlist.findOne({ 
      userId: user.id, 
      symbol: symbol.toUpperCase() 
    });

    if (existing) {
      // Remove from watchlist
      await Watchlist.deleteOne({ _id: existing._id });
      revalidatePath('/watchlist');
      revalidatePath(`/stock/[symbol]`, 'page');
      return { 
        success: true, 
        added: false, 
        message: 'Removed from watchlist' 
      };
    } else {
      // Add to watchlist
      await Watchlist.create({
        userId: user.id,
        symbol: symbol.toUpperCase(),
        company,
        addedAt: new Date(),
      });
      revalidatePath('/watchlist');
      revalidatePath(`/stock/[symbol]`, 'page');
      return { 
        success: true, 
        added: true, 
        message: 'Added to watchlist' 
      };
    }
  } catch (error: any) {
    console.error('Toggle watchlist error:', error);
    
    // Handle duplicate key error
    if (error.code === 11000) {
      // If duplicate, return as added
      return { 
        success: true, 
        added: true, 
        message: 'Already in watchlist' 
      };
    }
    
    return { 
      success: false, 
      added: false, 
      message: 'Failed to update watchlist' 
    };
  }
}

// Dedicated remove function (only removes, doesn't toggle)
export async function removeFromWatchlist(symbol: string) {
  try {
    const user = await getCurrentUser();
    
    if (!user) {
      return { 
        success: false, 
        message: 'User not authenticated' 
      };
    }
    
    await ConnectToDB();
    
    const result = await Watchlist.deleteOne({ 
      userId: user.id, 
      symbol: symbol.toUpperCase() 
    });
    
    revalidatePath('/watchlist');
    revalidatePath(`/stock/[symbol]`, 'page');
    return { 
      success: result.deletedCount > 0, 
      message: result.deletedCount > 0 ? 'Removed from watchlist' : 'Item not found in watchlist' 
    };
  } catch (error: any) {
    console.error('Remove from watchlist error:', error);
    return { 
      success: false, 
      message: 'Failed to remove from watchlist' 
    };
  }
}

export async function getUserWatchlist() {
  try {
    const user = await getCurrentUser();
    
    if (!user) return [];
    
    await ConnectToDB();
    
    const items = await Watchlist.find({ userId: user.id })
      .sort({ addedAt: -1 })
      .lean();
    
    return items;
  } catch (error) {
    console.error('Get user watchlist error:', error);
    return [];
  }
}

export async function checkIfInWatchlist(symbol: string) {
  try {
    const user = await getCurrentUser();
    
    if (!user) return false;
    
    await ConnectToDB();
    
    const item = await Watchlist.findOne({ 
      userId: user.id, 
      symbol: symbol.toUpperCase() 
    }).lean();
    
    return !!item;
  } catch (error) {
    console.error('Check watchlist error:', error);
    return false;
  }
}

export async function getWatchlistCount() {
  try {
    const user = await getCurrentUser();
    
    if (!user) return 0;
    
    await ConnectToDB();
    
    const count = await Watchlist.countDocuments({ userId: user.id });
    return count;
  } catch (error) {
    console.error('Get watchlist count error:', error);
    return 0;
  }
}