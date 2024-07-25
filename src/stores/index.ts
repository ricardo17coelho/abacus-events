// Utilities
import { createPinia, setActivePinia } from 'pinia';
import resetStore from './plugins/reset-store';

const pinia = createPinia();
setActivePinia(pinia);
pinia.use(resetStore);

export default pinia;
