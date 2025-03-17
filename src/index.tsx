import { StrictMode } from "react";
import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import ThemeProvider from "./components/ThemeSwitcher/ThemeProvider";
import store from "./app/store";
import App from "../src/app/App";
import "./components/LangSwitcher/118n/i18";
import "./styles/index.scss";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter basename={process.env.NODE_ENV === 'production' ? '/city-slider' : '/'}>
      <Provider store={store}>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
