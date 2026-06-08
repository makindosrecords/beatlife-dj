export const handleImgError = (e) => {
  e.target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 100 100"><rect width="100" height="100" fill="%230c0c0c" stroke="%23333" stroke-width="1"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%2322d3ee" font-family="sans-serif" font-weight="bold" font-size="6">BEATLIFE EVENT</text></svg>';
};

export const parseDescription = (desc) => {
  const defaultShape = { textParagraphsBefore: [], listTitle: '', listItems: [], textParagraphsAfter: [] };
  if (!desc) return defaultShape;
  
  // If it's already a formatted object from constants.js
  if (typeof desc === 'object') {
    return {
      textParagraphsBefore: Array.isArray(desc.textParagraphsBefore) ? desc.textParagraphsBefore : (desc.textParagraphsBefore ? [desc.textParagraphsBefore] : []),
      listTitle: desc.listTitle || '',
      listItems: Array.isArray(desc.listItems) ? desc.listItems : [],
      textParagraphsAfter: Array.isArray(desc.textParagraphsAfter) ? desc.textParagraphsAfter : (desc.textParagraphsAfter ? [desc.textParagraphsAfter] : [])
    };
  }
  
  // Parse raw string to restore bullet lists and cyan styling
  const lines = String(desc).split('\n').map(l => l.trim()).filter(Boolean);
  const result = { ...defaultShape };
  let phase = 'before';

  lines.forEach(line => {
    // Check for list items
    if (line.startsWith('-') || line.startsWith('•')) {
      phase = 'list';
      result.listItems.push(line.replace(/^[-•]\s*/, '').trim());
    } 
    // Check for list title (ends with colon)
    else if (phase === 'before' && line.endsWith(':')) {
      result.listTitle = line;
      phase = 'list';
    } 
    // Otherwise it's a paragraph
    else {
      if (phase === 'before') {
        result.textParagraphsBefore.push(line);
      } else {
        phase = 'after';
        result.textParagraphsAfter.push(line);
      }
    }
  });

  return result;
};