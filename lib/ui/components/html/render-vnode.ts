import { h, type VNode } from 'vue';
import type { Element, Node, Text } from 'domhandler';

import UiLink from '../UiLink.vue';
import AppImageView from '@/components/app/AppImageView.vue';

export function renderVNode(node: Node): VNode | string | null {
  if (node.type === 'text') {
    return (node as Text).data;
  }

  if (node.type === 'tag') {
    const el = node as Element;

    // Custom components
    if (el.name === 'img') {
      return h(AppImageView, {
        images: [el.attribs.src],
      });
    }

    if (el.name === 'a') {
      return h(
        UiLink,
        {
          // conditionally assign "href" or "to"
          ...(el.attribs.href?.startsWith('/')
            ? { to: el.attribs.href }
            : { href: el.attribs.href }),

          // forward target and rel only for external links
          ...(el.attribs.href?.startsWith('/')
            ? {}
            : {
                target: el.attribs.target || '_blank',
                rel: el.attribs.rel || 'noopener noreferrer',
              }),
        },
        {
          default: () => el.children.map(renderVNode),
        },
      );
    }

    // Default HTML element
    return h(el.name, el.attribs || {}, el.children?.map(renderVNode));
  }

  return null;
}
