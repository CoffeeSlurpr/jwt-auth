import { Routes, Route } from "react-router-dom";
import "./index.css";
import Login from "./pages/Login";
import Landing from "./pages/Landing";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Routes>
        <Route
          index
          path="/"
          element={<Landing />}
        />
        <Route
          path="/login"
          element={<Login />}
        />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
