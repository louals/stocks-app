// components/WatchlistCard.tsx
"use client";

import { useState } from "react";
import TradingViewWidget from "@/components/TradingViewWidget";
import WatchlistButton from "@/components/WatchlistButton";
import { removeFromWatchlist } from "@/lib/actions/watchlist";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface WatchlistCardProps {
  item: {
    _id: string;
    symbol: string;
    company: string;
    addedAt: string;
  };
}

export function WatchlistCard({ item }: WatchlistCardProps) {
  const [isRemoving, setIsRemoving] = useState(false);
  const router = useRouter();
  const scriptUrl = `https://s3.tradingview.com/external-embedding/embed-widget-`;

  const handleRemove = async () => {
    if (isRemoving) return;
    
    setIsRemoving(true);
    try {
      const result = await removeFromWatchlist(item.symbol);
      if (result.success) {
        router.refresh();
      }
    } catch (error) {
      console.error("Failed to remove from watchlist:", error);
    } finally {
      setIsRemoving(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow flex flex-col h-full">
      {/* Header section */}
      <div className="p-4 border-b dark:border-gray-700">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <Link 
                href={`/stock/${item.symbol.toLowerCase()}`}
                className="text-lg font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 truncate"
              >
                {item.symbol}
              </Link>
              <WatchlistButton 
                symbol={item.symbol} 
                company={item.company}
                isInWatchlist={true}
                type="icon"
                className="flex-shrink-0"
              />
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 truncate">
              {item.company}
            </p>
            <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              Added {new Date(item.addedAt).toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric', 
                year: 'numeric' 
              })}
            </div>
          </div>
        </div>
      </div>
      
      {/* TradingView widget section */}
      <div className="flex-1 p-2 min-h-[150px]">
        <TradingViewWidget
          scriptUrl={`${scriptUrl}symbol-info.js`}
          config={{
            symbol: item.symbol,
            width: "100%",
            locale: "en",
            colorTheme: "light",
            isTransparent: false
          }}
          height={150}
        />
      </div>

      {/* Actions section */}
      <div className="p-4 border-t dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
        <button
          onClick={handleRemove}
          disabled={isRemoving}
          className="flex items-center justify-center gap-2 w-full px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isRemoving ? (
            <>
              <svg className="w-4 h-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Removing...</span>
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              <span>Remove from Watchlist</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}