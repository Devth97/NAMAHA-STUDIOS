export const serviceTypes = ['Film Production', 'Television Content', 'Entertainment Projects', 'Creative Development', 'Commercials & Brand Films', 'Digital Content', 'Creative Collaboration'];
export const budgetRanges = ['Under ₹5 lakh', '₹5 – 20 lakh', '₹20 lakh – ₹1 crore', 'Above ₹1 crore', 'Not sure yet'];
export const timeframes = ['As soon as possible', 'Within 3 months', '3 – 6 months', 'Later this year or beyond'];

const rules = {
  company: value => value && value.length > 150 ? 'Please use 150 characters or fewer.' : '',
  name: value => !value?.trim() ? 'Please enter your name.' : value.length > 100 ? 'Please use 100 characters or fewer.' : '',
  email: value => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value?.trim() || '') ? '' : 'Please enter a valid email address, like name@example.com.',
  phone: value => !value?.trim() || /^[+()\d\s.-]{7,30}$/.test(value.trim()) ? '' : 'Please use digits, spaces and an optional + country code.',
  type: value => serviceTypes.includes(value) ? '' : 'Please select a project type.',
  budget: value => !value || budgetRanges.includes(value) ? '' : 'Please choose a budget range from the list.',
  timeline: value => !value || timeframes.includes(value) ? '' : 'Please choose a timeframe from the list.',
  message: value => !value?.trim() ? 'Tell us a little about your project.' : value.length > 5000 ? 'Please use 5,000 characters or fewer.' : ''
};
export const validatedFields = Object.keys(rules);

// Single-field check used for inline (on blur / on input) feedback.
export const fieldError = (field, value) => rules[field]?.(value) || '';

export function formatEnquiry(data) {
  return [
    'Project enquiry — Namaha Studios', '',
    `Name: ${data.name.trim()}`, `Email: ${data.email.trim()}`,
    `Project: ${data.type}`, `Company: ${data.company?.trim() || 'Not provided'}`,
    `Phone: ${data.phone?.trim() || 'Not provided'}`,
    `Budget: ${data.budget || 'Prefer to discuss'}`, `Timing: ${data.timeline || 'Not decided yet'}`,
    '', data.message.trim()
  ].join('\n');
}

export function enquiryEmailLink(data, inbox) {
  return `mailto:${encodeURIComponent(inbox)}?subject=${encodeURIComponent(`New ${data.type} enquiry — Namaha Studios`)}&body=${encodeURIComponent(formatEnquiry(data))}`;
}

export function validateEnquiry(data) {
  const errors = {};
  for (const field of validatedFields) {
    const message = fieldError(field, data[field]);
    if (message) errors[field] = message;
  }
  return errors;
}

export async function submitEnquiry(data, accessKey, request = fetch) {
  if (Object.keys(validateEnquiry(data)).length) throw new Error('Please check the highlighted fields.');
  if (!accessKey) return { status: 'demo' };
  const response = await request('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      access_key: accessKey,
      subject: `New ${data.type} enquiry — Namaha Studios`,
      from_name: 'Namaha Studios Website',
      name: data.name.trim(),
      email: data.email.trim(),
      replyto: data.email.trim(),
      phone: data.phone?.trim() || '',
      company: data.company?.trim() || '',
      project_type: data.type,
      budget: data.budget || 'Prefer to discuss',
      timeline: data.timeline || 'Not decided yet',
      message: data.message.trim(),
      botcheck: ''
    }),
    signal: AbortSignal.timeout(15000)
  });
  const result = await response.json().catch(() => ({}));
  if (!response.ok || !result.success) throw new Error('Your enquiry could not be sent. Your details are still here — please try again.');
  return { status: 'sent' };
}
