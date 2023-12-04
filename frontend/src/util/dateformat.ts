export function formatDate(dateString: string) {
  return new Date(dateString).toLocaleString('en-Us', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  })
}
