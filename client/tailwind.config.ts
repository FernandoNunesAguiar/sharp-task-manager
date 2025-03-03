import type { Config } from "tailwindcss";
export default {
    content: [
        './src/**/*.{js,jsx,ts,tsx}',
    ],
    theme:{
        extend:{
            colors:{
                primary:"#002147",
                secondary:"#1560BD",
                third: "#001730",
            }
        }
    }
} satisfies Config;