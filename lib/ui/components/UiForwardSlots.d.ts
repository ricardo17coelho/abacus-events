import { DefineComponent, Slot } from 'vue';

export interface UiForwardSlotsProps {
  slots: {
    [name: string]: Slot | undefined;
  };
  only?: string | string[];
  except?: string | string[];
}

export const UiForwardSlots: DefineComponent<UiForwardSlotsProps>;
