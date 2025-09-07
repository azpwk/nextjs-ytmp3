// import "@/styles/globals.css";
// import { ThemeProvider } from "next-themes";

// export default function App({ Component, pageProps }) {
//   return (
//     <ThemeProvider attribute="class" defaultTheme="light">
//       <Component {...pageProps} />
//     </ThemeProvider>
//   );
// }
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
