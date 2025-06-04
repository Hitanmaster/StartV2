import { Skeleton } from "@/components/ui/skeleton"
import { Card } from "@/components/ui/card"
import { ArrowLeft, MoreVertical } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ChatLoading() {
  return (
    <div className="flex flex-col h-screen bg-background text-foreground">
      {/* Header Loading */}
      <header className="flex items-center p-3 border-b border-border sticky top-0 bg-background/90 backdrop-blur-sm z-10">
        <Button variant="ghost" size="icon" className="mr-2 text-muted-foreground" disabled>
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <Skeleton className="h-10 w-10 rounded-full mr-3" />
        <div className="flex-1">
          <Skeleton className="h-5 w-32 mb-1" />
          <Skeleton className="h-3 w-20" />
        </div>
        <Button variant="ghost" size="icon" className="text-muted-foreground" disabled>
          <MoreVertical className="h-6 w-6" />
        </Button>
      </header>

      {/* Messages Loading */}
      <div className="flex-1 p-4 space-y-4 overflow-hidden">
        {/* Message bubbles loading */}
        <div className="flex justify-start">
          <div className="max-w-[70%] p-2.5 rounded-lg bg-card">
            <Skeleton className="h-4 w-48 mb-1" />
            <Skeleton className="h-3 w-16" />
          </div>
        </div>

        <div className="flex justify-end">
          <div className="max-w-[70%] p-2.5 rounded-lg bg-primary/90">
            <Skeleton className="h-4 w-32 mb-1" />
            <Skeleton className="h-3 w-12" />
          </div>
        </div>

        <div className="flex justify-start">
          <div className="max-w-[70%] p-2.5 rounded-lg bg-card">
            <Skeleton className="h-20 w-60 mb-1 rounded" />
            <Skeleton className="h-3 w-16" />
          </div>
        </div>

        <div className="flex justify-end">
          <div className="max-w-[70%] p-2.5 rounded-lg bg-primary/90">
            <Skeleton className="h-4 w-40 mb-1" />
            <Skeleton className="h-3 w-12" />
          </div>
        </div>

        <div className="flex justify-start">
          <Card className="max-w-[70%] p-2.5">
            <div className="flex items-center mb-1">
              <Skeleton className="h-4 w-4 mr-1.5" />
              <Skeleton className="h-4 w-32" />
            </div>
            <Skeleton className="h-3 w-full mb-1.5" />
            <Skeleton className="h-3 w-24 mb-1" />
            <Skeleton className="h-3 w-20" />
          </Card>
        </div>

        <div className="flex justify-end">
          <div className="max-w-[70%] p-2.5 rounded-lg bg-primary/90">
            <Skeleton className="h-4 w-28 mb-1" />
            <Skeleton className="h-3 w-12" />
          </div>
        </div>
      </div>

      {/* Input Loading */}
      <footer className="p-3 border-t border-border bg-background sticky bottom-0">
        <div className="flex items-center gap-2">
          <Skeleton className="h-9 w-9 rounded-full" />
          <Skeleton className="flex-1 h-10 rounded-full" />
          <Skeleton className="h-9 w-9 rounded-full" />
        </div>
      </footer>
    </div>
  )
}
