import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "node_modules/preline/dist/*.js",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        sm: "380px",
        md: "650px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1400px",
      },
    },
    extend: {
      borderWidth: {
        "1": "1px",
        "2": "2px",
        "4": "4px",
        "8": "8px",
      },
      screens: {
        "3xl": "1700px",
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
        },
        violeta: {
          DEFAULT: "hsl(var(--violeta))",
          foreground: "hsl(var(--violeta-foreground))",
        },
        beige: {
          DEFAULT: "hsl(var(--beige))",
          foreground: "hsl(var(--beige-foreground))",
        },
        violetaDos: {
          DEFAULT: "hsl(var(--violeta-dos))",
          foreground: "hsl(var(--violeta-dos-foreground))",
        },
        gris: {
          DEFAULT: "hsl(var(--gris))",
          foreground: "hsl(var(--gris-foreground))",
        },
        textTypograph: "hsl(var(--textTypograph))", // Color de texto de tipografía en carrito
        backgroundCart: "hsl(var(--backgroundCart))", //color de fondo de la card de carrito, la màs oscurita
        line: "hsl(var(--line))", //color de linea que separa los productos del carrito
        backgroundForms: "hsl(var(--backgroundForms))", //color para el fondo de todos los formularios
        labelAdminColor: "hsl(var(--labelAdmin-color))", //rojo de admin
        graySubtittle: "hsl(var(--graySubtittle))", //gris de "seguir comprando" en carrito y "atràs" en detail
        grisCarbon: "hsl(var(--grisCarbon))", //color del botón de cerrar del carrito
        whiteTypograph: "hsl(var(--whiteTypograph))", //blanco de letra que usé en botón de visualizar en reportes
        greenMent: "hsl(var(--greenMent))", // color de alerta -verde menta
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("preline/plugin")],
} satisfies Config;

export default config;
