/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [ "dark", "forest", "dracula", "night","bumblebee",
    {
      halloween: {
        ...require("daisyui/src/colors/themes")["[data-theme=halloween]"],
        "base-100":"black"
      },
      light: {
        ...require("daisyui/src/colors/themes")["[data-theme=light]"],
        "primary":"#F28C18"
      },
    }
  ],
  },
}
