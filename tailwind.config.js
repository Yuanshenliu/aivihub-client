/** @type {import('tailwindcss').Config} */
import { color, text, border, background } from './types/themes.json'

export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: ['class', "[class~='dark']"],
  corePlugins: {
    preflight: false
  },
  theme: {
    colors: ({ colors }) => {
      return {
        ...colors,
        ...{
          ...getColors()
        }
      }
    },
    textColor: ({ theme }) => {
      return {
        ...theme('colors'),
        ...getText()
      }
    },
    borderColor: ({ theme }) => {
      return {
        ...theme('colors'),
        ...getBorder()
      }
    },
    backgroundColor: ({ theme }) => {
      return {
        ...theme('colors'),
        ...getbackground(),
        ...{
          'opacity-primary': 'rgba(var(--tw-primary), 0.5)'
        }
      }
    }
  },
  plugins: []
}

function getColors() {
  const colors = {}

  Object.keys(color.default).forEach((key) => {
    colors[key] = `var(--tw-${key})`
  })
  return colors
}

function getText() {
  const colors = {}

  Object.keys(text.default).forEach((key) => {
    colors[key] = `var(--tw-text-${key})`
  })
  return colors
}

function getBorder() {
  const colors = {}

  Object.keys(border.default).forEach((key) => {
    colors[key] = `var(--tw-border-${key})`
  })
  return colors
}

function getbackground() {
  const colors = {}

  Object.keys(background.default).forEach((key) => {
    colors[key] = `var(--tw-background-${key})`
  })
  return colors
}
