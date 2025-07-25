import type { Config } from 'tailwindcss'

const config: Config = {
    darkMode: "class",
    content: [
        "./src/**/*.{js,ts,jsx,tsx}",
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./app/**/*.{ts,tsx}"
    ],
    theme: {
        extend: {
            colors: {
                cornflower: {
                    DEFAULT: "oklch(60.563% 0.21892 292.72)",
                    50: "oklch(100% 0 none)",
                    100: "oklch(97.994% 0.01077 297.63)",
                    200: "oklch(88.29% 0.0616 299.68)",
                    300: "oklch(78.597% 0.11572 297.87)",
                    400: "oklch(69.411% 0.1686 295.89)",
                    500: "oklch(60.563% 0.21892 292.72)",
                    600: "oklch(50.739% 0.2683 285.52)",
                    700: "oklch(43.609% 0.25536 281.18)",
                    800: "oklch(35.559% 0.20538 281.77)",
                    900: "oklch(27.138% 0.15188 283.57)",
                    950: "oklch(22.562% 0.1233 285.51)"
                }
            }
        }
    },
    plugins: []
}
export default config