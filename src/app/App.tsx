import { BrowserRouter } from "react-router";
import StoreProvider from "./providers/StoreProvider";
import AppRouter from "./router/AppRouter";

export default function App() {
  return (
    <StoreProvider>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </StoreProvider>
  );
}
