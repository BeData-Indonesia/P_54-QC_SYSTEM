const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
    daisyui: {
        themes: ["light", "dark", "cupcake"],
    },
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.js",
        "./resources/js/**/*.tsx",
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ["Nunito", ...defaultTheme.fontFamily.sans],
            },
        },
    },

    plugins: [require("daisyui")],
};
