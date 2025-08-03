import { defu } from 'defu';
import DOMPurify, { type Config } from 'dompurify';

export function getSanitizedHtml(content: string, config?: Config) {
  // HOOK to add target="blank" and rel attribute to all links
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  DOMPurify.addHook('afterSanitizeAttributes', function (node: any) {
    // set all elements owning target to target=_blank
    if ('target' in node) {
      node.setAttribute('target', '_blank');
      // prevent https://www.owasp.org/index.php/Reverse_Tabnabbing
      node.setAttribute('rel', 'noopener noreferrer');
    }
    // set non-HTML/MathML links to xlink:show=new
    if (
      !node.hasAttribute('target') &&
      (node.hasAttribute('xlink:href') || node.hasAttribute('href'))
    ) {
      node.setAttribute('xlink:show', 'new');
    }
    return node;
  });

  return DOMPurify.sanitize(
    content,
    defu(config, {
      ALLOWED_TAGS: [
        'a',
        'b',
        'i',
        'em',
        'strong',
        'p',
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'hr',
        'li',
        'ol',
        'ul',
        'blockquote',
        'div',
        'span',
        'br',
        'table',
        'tr',
        'td',
        'tbody',
        'thead',
        'kbd',
      ],
    }),
  );
}
