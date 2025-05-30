import { cn } from '@indieverse/ui/cn'

function H1({ children, className, ...props }: React.ComponentProps<'h1'>) {
  return (
    <h1
      data-slot="h1"
      className={cn(
        'scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance',
        className,
      )}
      {...props}
    >
      {children}
    </h1>
  )
}

export { H1 }
