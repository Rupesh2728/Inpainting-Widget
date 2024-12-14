
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Include your file paths
  ],
  theme: {
    extend: {
      screens: {
        'sm': '640px', // Small devices like phones
        'md': '768px', // Medium devices like tablets
        'lg': '1024px', // Large devices like desktops
        'xl': '1280px', // Extra-large devices
      },
    },
  },
  plugins: [],
};
