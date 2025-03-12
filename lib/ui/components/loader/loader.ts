import { readonly, ref } from 'vue';

const isLoading = ref(false);
const loadingMsg = ref('');

function show(msg?: string) {
  isLoading.value = true;
  if (msg) {
    loadingMsg.value = msg;
  }
}

function hide() {
  isLoading.value = false;
  loadingMsg.value = '';
}

export function useLoader() {
  return {
    isLoading: readonly(isLoading),
    loadingMsg: readonly(loadingMsg),
    show,
    hide,
  };
}
