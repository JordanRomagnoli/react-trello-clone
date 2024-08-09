/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                "--bg-color": "#2E2E2E",
                "--groups-color": "#3A3A3A",
                "--tasks-color": "#4F4F4F",
                "--add-group-color": "#757575",
                "--save-button": "#66BB6A",
                "--null-button": "#FF7043",
                "--title-color": "#ECEFF1",
                "--text-color": "#CFD8DC",
            },
        },
    },
    plugins: [],
};
