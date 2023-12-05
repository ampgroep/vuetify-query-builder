import './assets/main.css';
import { createApp } from 'vue';
import App from './App.vue';
import { createVuetify } from 'vuetify';
import { aliases } from 'vuetify/iconsets/fa';
import { mdi } from 'vuetify/iconsets/mdi';
const myCustomLightTheme = {
    dark: false,
    colors: {
        background: '#FFFFFF',
        surface: '#FFFFFF',
        primary: '#6200EE',
        'primary-darken-1': '#3700B3',
        secondary: '#03DAC6',
        'secondary-darken-1': '#018786',
        error: '#B00020',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FB8C00'
    }
};
const vuetify = createVuetify({
    icons: {
        defaultSet: 'mdi',
        aliases,
        sets: {
            mdi
        }
    },
    theme: {
        defaultTheme: 'myCustomLightTheme',
        themes: {
            myCustomLightTheme
        }
    }
});
createApp(App).use(vuetify).mount('#app');
