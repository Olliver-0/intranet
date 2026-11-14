/** Formats a Brazilian phone string for display. */
export const formatPhoneNumber = (phone: string | null): string => {
  if (!phone) return '-';
  const cleaned = phone.replace(/\D/g, '');
  if (!cleaned) return '-';

  let withoutDDI = cleaned;
  if (
    (cleaned.length === 12 || cleaned.length === 13) &&
    cleaned.startsWith('55')
  ) {
    withoutDDI = cleaned.substring(2);
  }

  const match = withoutDDI.match(/^(\d{2})(\d{4,5})(\d{4})$/);
  if (match) return `(${match[1]}) ${match[2]}-${match[3]}`;

  const localMatch = withoutDDI.match(/^(\d{4,5})(\d{4})$/);
  if (localMatch) return `${localMatch[1]}-${localMatch[2]}`;

  return withoutDDI;
};

/** Normalizes a Brazilian phone number by ensuring the 55 DDI prefix. */
export const formatWhatsAppNumber = (phone: string | null): string => {
  if (!phone) return '';
  const cleaned = phone.replace(/\D/g, '');
  if (!cleaned) return '';

  if (
    (cleaned.length === 12 || cleaned.length === 13) &&
    cleaned.startsWith('55')
  ) {
    return cleaned;
  }

  if (cleaned.length === 10 || cleaned.length === 11) {
    return `55${cleaned}`;
  }

  return cleaned;
};

/** Builds a WhatsApp chat URL from a phone number string. */
export const getWhatsAppUrl = (phone: string | null): string => {
  const formattedNumber = formatWhatsAppNumber(phone);
  return formattedNumber ? `https://wa.me/${formattedNumber}` : '';
};
