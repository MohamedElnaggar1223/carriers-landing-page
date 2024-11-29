import type { Config } from "tailwindcss";
import fluid, { extract } from 'fluid-tailwind'

const config: Config = {
    darkMode: ["class"],
    content: {
		files: [
			"./pages/**/*.{js,ts,jsx,tsx,mdx}",
			"./components/**/*.{js,ts,jsx,tsx,mdx}",
			"./app/**/*.{js,ts,jsx,tsx,mdx}",
		],
		extract
	},
  theme: {
  	extend: {
		screens: {
			'sm': '40rem',    // 640px
			'md': '48rem',    // 768px
			'lg': '64rem',    // 1024px
			'xl': '80rem',    // 1280px
			'2xl': '96rem',   // 1536px
		},
  		colors: {
			"main-red": "#FA3636",
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
		fontFamily: {
			'denk-one': ['var(--font-denk-one)'],
			'dm-sans': ['var(--font-dm-sans)'],
			'mulish': ['var(--font-mulish)'],
			'baloo': ['var(--font-baloo)']
		},
		keyframes: {
			'timer': {
				'0%': { width: '0%' },
				'100%': { width: '100%' }
			},
			"caret-blink": {
				"0%,70%,100%": { opacity: "1" },
				"20%,50%": { opacity: "0" },
			},
		},
		animation: {
			'timer': 'timer 5s linear infinite',
			"caret-blink": "caret-blink 1.25s ease-out infinite",
		}
  	}
  },
  plugins: [require("tailwindcss-animate"), fluid],
};
export default config;
