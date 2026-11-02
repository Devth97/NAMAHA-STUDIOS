// WhatsApp click-to-chat accepts an international number without punctuation.
export function whatsappHref(number, message = '') {
  const input = String(number || '').trim();
  if (!/^[+\d\s().-]+$/.test(input)) return '';
  const digits = input.replace(/\D/g, '');
  if (!/^[1-9]\d{7,14}$/.test(digits)) return '';
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}
