module.exports = {
    content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
    // darkMode: "class",
    theme: {
       container: {
          center: true,
       },
       screens: {
          md: "840px",
          sm: "640px",
          lg: "1024px",
          xl: "1280px",
          "2xl": "1500px",
       },
       extend: {
          colors: {
             "white-rgba": "0px 5px 10px 0px rgba(0, 0, 0, 0.5)",
          },
 
          // fontFamily: {
          //    raleway: ["Raleway"],
          //   },
       },
    },
    plugins: [],
 };
 