interface Props {
    rows?: number
  }
  
  export function SkeletonLoader({ rows = 3 }: Props) {
    return (
      <div className="flex flex-col gap-4 w-full max-w-md mx-auto px-5 py-6">
        <div className="skeleton h-8 w-32 rounded-full" />
        <div className="skeleton h-24 w-24 rounded-full mx-auto" />
        <div className="skeleton h-10 w-48 rounded-xl mx-auto" />
        {Array.from({ length: rows }, (_, i) => (
          <div key={i} className="skeleton h-24 w-full rounded-2xl" />
        ))}
      </div>
    )
  }
  