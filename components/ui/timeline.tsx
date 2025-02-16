import * as React from "react"
import { cn } from "@/lib/utils"

export interface TimelineItemProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  date: string
}

export const TimelineItem = React.forwardRef<HTMLDivElement, TimelineItemProps>(
  ({ title, date, className, ...props }, ref) => (
    <li className={cn("flex items-start gap-4", className)} ref={ref} {...props}>
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
        <span className="text-sm font-medium text-muted-foreground">•</span>
      </div>
      <div className="flex flex-col">
        <p className="text-sm font-medium text-muted-foreground">{date}</p>
        <p className="text-sm">{title}</p>
      </div>
    </li>
  ),
)

TimelineItem.displayName = "TimelineItem"

export interface TimelineProps extends React.HTMLAttributes<HTMLOlElement> {
  children?: React.ReactNode
}

export const Timeline = React.forwardRef<HTMLOlElement, TimelineProps>(({ children, className, ...props }, ref) => (
  <ol className={cn("list-none", className)} ref={ref} {...props}>
    {children}
  </ol>
))

Timeline.displayName = "Timeline"

