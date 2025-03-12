/*
 *  Credits to https://github.com/jessegall/vue-forward-slots/blob/main/src/components/forward-slots.ts
 *
 * */

import { computed, defineComponent, h, PropType, Slot, VNode } from 'vue';

type SlotOption = string | string[];

type Slots = {
  [name: string]: Slot | undefined;
};

interface ForwardSlotsProps {
  slots: Slots;
  only?: SlotOption;
  except?: SlotOption;
}

// Helper functions
function isValidSlotOption(value: unknown): value is SlotOption {
  return typeof value === 'string' || Array.isArray(value);
}

function wrap(input: unknown): string[] {
  if (!Array.isArray(input)) {
    input = [input];
  }

  return (input as unknown[])
    .filter(Boolean) // Ensure truthy values
    .map((item) => String(item)); // Convert to strings
}

function createSlots(slots: Slots, options: ForwardSlotsProps) {
  const include = wrap(options.only);
  const exclude = wrap(options.except);

  return Object.entries(slots)
    .filter(([slotName]) => shouldIncludeSlot(slotName, include, exclude))
    .reduce((result, [slotName, slotFunction]) => {
      if (slotFunction) {
        result[slotName] = slotFunction;
      }
      return result;
    }, {} as Slots);
}

function shouldIncludeSlot(
  key: string,
  include: string[],
  exclude: string[],
): boolean {
  if (include.length && !include.includes(key)) {
    return false;
  }

  return !exclude.includes(key);
}

export const UiForwardSlots = defineComponent({
  name: 'UiForwardSlots',
  props: {
    slots: {
      type: Object as PropType<Slots>,
      default: () => ({}),
      required: true,
    },
    only: {
      type: [String, Array] as PropType<SlotOption>,
      default: () => [] as SlotOption,
      validator: isValidSlotOption,
    },
    except: {
      type: [String, Array] as PropType<SlotOption>,
      default: () => [] as SlotOption,
      validator: isValidSlotOption,
    },
  },
  setup(props: ForwardSlotsProps, ctx) {
    const children = computed(() => ctx.slots.default?.() || []);

    return () =>
      children.value.map((node: VNode) => {
        if (!node || typeof node.type !== 'object') {
          // If the node is not a component, return it as-is
          return node;
        }

        const slots = Object.assign({}, node.children, props.slots);

        // Pass the component with filtered slots
        return h(
          node.type as string | object, // Ensure node.type is a valid type for h
          node.props || {}, // Provide an empty object as a fallback
          createSlots(slots, props),
        );
      });
  },
});
