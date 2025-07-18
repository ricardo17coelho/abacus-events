import { useMediaQuery } from '@vueuse/core';

export function useHover() {
  const canHoverMediaQuery = useMediaQuery('(hover: hover)');

  return {
    canHoverMediaQuery,
  };
}
