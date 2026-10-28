export const serviceTypes = ['Film Production', 'Television Content', 'Entertainment Projects', 'Creative Development', 'Commercials & Brand Films', 'Digital Content', 'Creative Collaboration'];

export function validateEnquiry(data) {
  const errors = {};
  if (!data.name?.trim()) errors.name = 'Please enter your name.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email?.trim() || '')) errors.email = 'Please enter a valid email address.';
  if (!serviceTypes.includes(data.type)) errors.type = 'Please select a project type.';
  if (!data.message?.trim()) errors.message = 'Tell us a little about your project.';
  if ((data.name?.length || 0) > 100) errors.name = 'Please use 100 characters or fewer.';
  if ((data.message?.length || 0) > 5000) errors.message = 'Please use 5,000 characters or fewer.';
  return errors;
}

export async function submitEnquiry(data, accessKey, request = fetch) {
  if (Object.keys(validateEnquiry(data)).length) throw new Error('Please check the highlighted fields.');
  if (!accessKey) return { status: 'demo' };
  const response = await request('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ access_key: accessKey, subject: 'New project enquiry — Namaha Studios', from_name: 'Namaha Studios Website', name: data.name.trim(), email: data.email.trim(), replyto: data.email.trim(), phone: data.phone?.trim() || '', project_type: data.type, message: data.message.trim(), botcheck: '' }),
    signal: AbortSignal.timeout(15000)
  });
  const result = await response.json();
  if (!response.ok || !result.success) throw new Error('Your enquiry could not be sent. Please try again.');
  return { status: 'sent' };
}
