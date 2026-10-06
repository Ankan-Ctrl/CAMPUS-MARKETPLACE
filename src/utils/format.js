export function timeAgo(isoString) {
  const then = new Date(isoString).getTime()
  const now = Date.now()
  const diffMs = now - then
  const mins = Math.floor(diffMs / 60000)
  const hours = Math.floor(mins / 60)
  const days = Math.floor(hours / 24)

  if (mins < 1) return 'Just now'
  if (mins < 60) return `${mins}m ago`
  if (hours < 24) return `${hours}h ago`
  if (days === 1) return 'Yesterday'
  if (days < 30) return `${days}d ago`
  return new Date(isoString).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}

export function formatPrice(n) {
  return '\u20B9' + Number(n).toLocaleString('en-IN')
}

export function categoryName(slug, CATEGORIES) {
  return CATEGORIES.find((c) => c.slug === slug)?.name || slug
}
