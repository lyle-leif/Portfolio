export function SectionLabel({ index, children }: { index: string; children: string }) {
  return (
    <p className="label flex items-center gap-3">
      <span>[ {index} ]</span>
      <span className="h-px w-8 bg-current opacity-40" />
      <span>{children}</span>
    </p>
  )
}
