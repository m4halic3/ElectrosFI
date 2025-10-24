import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
    "theme": {
        "themes": {
            "light": {
                "primary": '#3eb772',
                "dark_color": '#ffffff',
                "background-dark": "#ffffff",
                "theme-background": "#ffffff",
                "theme-text-color": "#363636",
                "auth-theme-background": "#1e1e1e",
                "background": "#ffffff"
            },
            "dark": {
                "theme-background": "#1e1e1e",
                "auth-theme-background": "#1e1e1e",
                "theme-text-color": "#ffffff",
                "primary": '#3eb772',
                "background": "#363636",
                "dark_color": '#1e1e1e',
                "background-dark": "#1e1e1e"
            }
        },
        options: { customProperties: true },
    }
});
