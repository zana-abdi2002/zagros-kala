"use client";

import { cacheRtl } from "@/lib/ui/rtlCache";
import theme from "@/lib/ui/theme";
import { CacheProvider } from "@emotion/react";
import { ThemeProvider } from "@mui/material/styles";
import { ReactNode } from "react";
import { ReduxProvider } from "./ReduxProvider";

type Props = { children: ReactNode };

function Providers({ children }: Props) {
  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <ReduxProvider>{children}</ReduxProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default Providers;
