import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
  	container: {
  		center: true,
  		padding: '2rem',
  		screens: {
  			'2xl': '1400px'
  		}
  	},
  	extend: {
  		colors: {
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			primary: {
  				foreground: 'hsl(var(--primary-foreground))',
  				DEFAULT: "#FF0033",
  				hover: '#E6002E',
  				dark: '#CC0029'
  			},
  			secondary: {
  				foreground: 'hsl(var(--secondary-foreground))',
  				DEFAULT: "#1A1A1A",
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				foreground: 'hsl(var(--accent-foreground))',
  				DEFAULT: "#00FFFF",
  				cyan: '#00FFFF',
  				electricBlue: '#0080FF',
  				neonPink: '#FF0080',
  				warningOrange: '#FF6B00',
  				successGreen: '#00FF88'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			deepBlack: '#0A0A0A',
  			cardBlack: '#1A1A1A',
  			borderBlack: '#2A2A2A',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		fontFamily: {
  			orbitron: [
  				'var(--font-orbitron)',
  				'sans-serif'
  			],
  			exo2: [
  				'var(--font-exo2)',
  				'sans-serif'
  			],
  			inter: [
  				'var(--font-inter)',
  				'sans-serif'
  			],
  			jetbrains: [
  				'var(--font-jetbrains-mono)',
  				'monospace'
  			]
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			},
  			glow: {
  				'0%, 100%': {
  					opacity: '0.7',
  					boxShadow: '0 0 5px #FF0033'
  				},
  				'50%': {
  					opacity: '1',
  					boxShadow: '0 0 15px #FF0033, 0 0 25px #FF0033'
  				}
  			},
  			'neon-flicker': {
  				'0%, 19%, 21%, 23%, 25%, 54%, 56%, 100%': {
  					opacity: '0.99',
  					textShadow: '0 0 5px #FF0033, 0 0 10px #FF0033, 0 0 15px #FF0033, 0 0 20px #E6002E, 0 0 30px #E6002E, 0 0 40px #CC0029, 0 0 50px #CC0029'
  				},
  				'20%, 24%, 55%': {
  					opacity: '0.8',
  					textShadow: 'none'
  				}
  			},
  			pulse: {
  				'0%, 100%': {
  					opacity: '1',
  					transform: 'scale(1)'
  				},
  				'50%': {
  					opacity: '0.7',
  					transform: 'scale(1.05)'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
  			glow: 'glow 2s ease-in-out infinite',
  			'neon-flicker': 'neon-flicker 1.5s infinite alternate',
  			pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
  		},
  		boxShadow: {
  			'cyber-red-sm': '0 1px 2px 0 rgba(255, 0, 51, 0.5)',
  			'cyber-red': '0 4px 6px -1px rgba(255, 0, 51, 0.5), 0 2px 4px -1px rgba(255, 0, 51, 0.3)',
  			'cyber-red-lg': '0 10px 15px -3px rgba(255, 0, 51, 0.5), 0 4px 6px -2px rgba(255, 0, 51, 0.3)',
  			'cyber-red-glow-focus': '0 0 0 3px rgba(255, 0, 51, 0.6)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
