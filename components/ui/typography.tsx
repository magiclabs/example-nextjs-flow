import { cn } from '@/lib/utils'
import { type ComponentProps } from 'react'

export function TypographyH1({ className, ...rest }: ComponentProps<'h1'>) {
  return (
    <h1
      className={cn(
        'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl',
        className,
      )}
      {...rest}
    />
  )
}

export function TypographyH2({ className, ...rest }: ComponentProps<'h2'>) {
  return (
    <h2
      className={cn(
        'scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0',
        className,
      )}
      {...rest}
    />
  )
}

export function TypographyH3({ className, ...rest }: ComponentProps<'h3'>) {
  return (
    <h3
      className={cn(
        'scroll-m-20 text-2xl font-semibold tracking-tight',
        className,
      )}
      {...rest}
    />
  )
}

export function TypographyH4({ className, ...rest }: ComponentProps<'h4'>) {
  return (
    <h4
      className={cn(
        'scroll-m-20 text-xl font-semibold tracking-tight',
        className,
      )}
      {...rest}
    />
  )
}

export function TypographyP({ className, ...rest }: ComponentProps<'p'>) {
  return (
    <p
      className={cn('leading-7 [&:not(:first-child)]:mt-6', className)}
      {...rest}
    />
  )
}

export function TypographyInlineCode({
  className,
  ...rest
}: ComponentProps<'code'>) {
  return (
    <code
      className={cn(
        'bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold',
        className,
      )}
      {...rest}
    />
  )
}

export function TypographyBlockquote({
  className,
  ...rest
}: ComponentProps<'blockquote'>) {
  return (
    <blockquote
      className={cn('mt-6 border-l-2 pl-6 italic', className)}
      {...rest}
    />
  )
}

export function TypographyLead({ className, ...rest }: ComponentProps<'p'>) {
  return (
    <p className={cn('text-muted-foreground text-xl', className)} {...rest} />
  )
}

export function TypographyLarge({ className, ...rest }: ComponentProps<'div'>) {
  return <div className={cn('text-lg font-semibold', className)} {...rest} />
}

export function TypographySmall({
  className,
  ...rest
}: ComponentProps<'small'>) {
  return (
    <small
      className={cn('text-sm font-medium leading-none', className)}
      {...rest}
    />
  )
}

export function TypographyMuted({ className, ...rest }: ComponentProps<'p'>) {
  return (
    <p className={cn('text-muted-foreground text-sm', className)} {...rest} />
  )
}
