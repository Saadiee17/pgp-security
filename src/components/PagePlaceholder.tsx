interface Props {
  title: string
  subtitle?: string
}

export default function PagePlaceholder({ title, subtitle }: Props) {
  return (
    <section className="pt-[140px] pb-32 min-h-[80vh] flex flex-col items-center justify-center text-center px-6">
      <div className="text-gold text-xs font-mono tracking-[0.2em] uppercase mb-4">
        Coming Soon
      </div>
      <h1 className="text-ice-white text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight mb-4">
        {title}
      </h1>
      {subtitle && (
        <p className="text-slate text-lg max-w-2xl">{subtitle}</p>
      )}
    </section>
  )
}
