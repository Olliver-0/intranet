/** Sanitizes header values by stripping control characters and escaping quotes. */
export const sanitizeForHeader = (value: string): string => {
  return value
    .replace(/[\r\n\0]/g, '')
    .replace(/"/g, '\\"')
    .slice(0, 255);
};

/** Removes HTML tags from a text string. */
export const stripHtmlTags = (value: string): string => {
  return value.replace(/<[^>]*>/g, '');
};
