export function LoadingSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 animate-pulse"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-slate-200 dark:bg-slate-700 rounded-full" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/3" />
              <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-1/2" />
            </div>
            <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded w-24" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 animate-pulse">
      <div className="space-y-4">
        <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-1/2" />
        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4" />
        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-2/3" />
        <div className="h-10 bg-slate-200 dark:bg-slate-700 rounded mt-4" />
      </div>
    </div>
  );
}
