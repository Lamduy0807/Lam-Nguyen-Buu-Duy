import "./App.css";
import SwapForm from "./components/SwapForm";
import Header from "./components/header";
import ThemeProvider from "./components/themes";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <div style={{ height: "auto" }}>
          <Header />
          <SwapForm />
        </div>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
