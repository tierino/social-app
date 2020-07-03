import React from "react";
import Header from "./Header";

import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

export default ({ children }) => {
  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: "dark",
        },
      }),
    []
  );

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Header />
        {children}
      </ThemeProvider>
    </div>
  );
};
