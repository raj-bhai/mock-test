import React from "react";
import "../styles/globals.css";
import { ThemeProvider } from "next-themes";
import { Provider } from "react-redux";
import store from "../redux/store";

function MyApp({ Component, pageProps }) {
   return (
      <>
         <ThemeProvider enableSystem={true} attribute="class">
            <div>
               <Provider store={store}>
                  <Component {...pageProps} />
               </Provider>
            </div>
         </ThemeProvider>
      </>
   );
}

export default MyApp;
