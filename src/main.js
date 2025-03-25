import './assets/main.css'

import { createApp } from 'vue'
import { createI18n } from 'vue-i18n';
import App from './App.vue'
import router from './router'
import AOS from 'aos';
import 'aos/dist/aos.css';

import en from './locales/en.json';
import id from './locales/id.json';

const i18n = createI18n({
    legacy: false,
    locale: 'id', 
    fallbackLocale: 'en',
    messages: { en, id }
  });
  
  const app = createApp(App);
  
  app.use(router);
  app.use(i18n);
  AOS.init();
  app.mount('#app');
