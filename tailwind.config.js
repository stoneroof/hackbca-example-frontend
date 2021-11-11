module.exports = {
    purge: [
        "./src/**/*.{js,jsx,ts,tsx}",
        "./public/index.html"
    ],
    darkMode: false,
    theme: {
        extend: {
            colors: {
                "hackbca-dark-blue": "#001427",
                "hackbca-blue": "#3274E8",
                "hackbca-orange": "#EC8633",
                "hackbca-orange-dark": "#de6c10"
            },
            width: {
                "192": "48rem"
            }
        }
    },
    variants: {
        extend: {
            
        }
    },
    plugins: []
};