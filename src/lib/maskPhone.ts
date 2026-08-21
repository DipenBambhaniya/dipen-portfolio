/**
 * Masks the middle group of a space-separated phone number for display on
 * public pages, e.g. "+91 96208 26142" -> "+91 ••••• 26142". The country
 * code and final group stay visible; everything in between is hidden.
 */
export function maskPhone(phone: string): string {
  const groups = phone.split(' ');
  if (groups.length < 3) return phone;

  return groups
    .map((group, i) =>
      i === 0 || i === groups.length - 1 ? group : group.replace(/\d/g, '•')
    )
    .join(' ');
}
