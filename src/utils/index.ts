export const IMAGE_PLACEHOLDER =
  'https://lh3.googleusercontent.com/a/ACg8ocLWkbPCYwaCyK8cFahK3N7thY8xFP-AAlto9yp1OzqKeOnMNRJQZg=s96-c';

export function formatPrice(val) {
  if (val === null || val === undefined) return '';
  const n = Number(val);
  if (isNaN(n)) return String(val);
  if (n === 0) return 'Price on request';
  return n.toLocaleString('en-IN', {maximumFractionDigits: 2});
}
