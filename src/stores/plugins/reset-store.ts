import cloneDeep from 'lodash/cloneDeep';
import type { PiniaPluginContext } from 'pinia';

// based on: https://stackoverflow.com/questions/71690883/pinia-reset-alternative-when-using-setup-syntax/71760032#71760032
export default function resetStore({ store }: PiniaPluginContext) {
  const initialState = cloneDeep(store.$state);
  store.$reset = () => {
    store.$patch(($state) => {
      Object.assign($state, initialState);
    });
  };
}
