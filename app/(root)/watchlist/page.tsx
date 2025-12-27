// app/(root)/watchlist/page.tsx
import TradingViewWidget from "@/components/TradingViewWidget";
import WatchlistButton from "@/components/WatchlistButton";
import { WatchlistCard } from "@/components/WatchlistCard";

import { verifySession } from "@/lib/actions/auth-utils";
import { getUserWatchlist } from "@/lib/actions/watchlist";
import { MARKET_OVERVIEW_WIDGET_CONFIG } from "@/lib/constants";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function WatchlistPage() {
  const { authenticated, user } = await verifySession();
  
  if (!authenticated || !user) {
    redirect('/sign-in');
  }
  
  const watchlistItems = await getUserWatchlist();
  const scriptUrl = `https://s3.tradingview.com/external-embedding/embed-widget-`;

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Watchlist</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Track and manage your favorite stocks
          {watchlistItems.length > 0 && ` • ${watchlistItems.length} item${watchlistItems.length !== 1 ? 's' : ''}`}
        </p>
      </div>

      {watchlistItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center border-2 border-dashed rounded-lg">
          <div className="mb-4">
            <svg className="w-20 h-20 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.385a.563.563 0 00-.182-.557L3.04 10.385a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345l2.125-5.111z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">Your watchlist is empty</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md">
            Start adding stocks to your watchlist to track them here.
          </p>
          <Link 
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Browse Stocks
          </Link>
        </div>
      ) : (
        <>
          {/* Market Overview for Watchlist */}
          <div className="mb-8">
            <TradingViewWidget 
              title="Watchlist Market Overview"
              scriptUrl={`${scriptUrl}market-overview.js`}
              config={{
                ...MARKET_OVERVIEW_WIDGET_CONFIG,
                showFloatingTooltip: true,
                tabs: [
                  {
                    title: "Watchlist",
                    symbols: watchlistItems.map(item => ({
                      s: item.symbol,
                      d: item.company
                    }))
                  },
                  {
                    title: "Indices",
                    originalTitle: "Indices",
                    symbols: [
                      { s: "FOREXCOM:SPXUSD", d: "S&P 500" },
                      { s: "NASDAQ:NDX", d: "NASDAQ 100" },
                      { s: "DJ:DJI", d: "Dow Jones" },
                      { s: "INDEX:NKY", d: "Nikkei 225" },
                    ]
                  }
                ]
              }}
              className="custom-chart"
              height={400}
            />
          </div>

          {/* Watchlist Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
            {watchlistItems.map((item) => (
              <WatchlistCard 
                key={item._id.toString()} 
                item={item} 
              />
            ))}
          </div>

         
        </>
      )}
    </div>
  );
}