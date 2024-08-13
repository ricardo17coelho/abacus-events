import App from './App.vue';
import './styles/main.scss';

// Plugins
import { registerPlugins } from './plugins';

const app = createApp(App);

registerPlugins(app);

app.mount('#app');
