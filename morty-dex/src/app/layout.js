import "./globals.css";
import { ThemeProvider } from "@mui/material";
import theme from "../theme";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";

export const metadata = {
  title: "MortyDex",
  description: "A Pokedex for Rick and Morty characters",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="">
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </AppRouterCacheProvider>
        <div className="main"></div>
      </body>
    </html>
  );
}
