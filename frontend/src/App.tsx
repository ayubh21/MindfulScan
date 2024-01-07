import { ThemeProvider } from "./components/theme-provider";
import "./App.css";
import { ModeToggle } from "./components/mode-toggle";
import TableData from "./app/page";
import { Button } from "@/components/ui/button";
import Navbar from "./components/navbar";
import { QueryClient, QueryClientProvider } from "react-query";

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <div className="header" style={{ display: "flex", justifyContent: "space-between", alignItems: "end" }}>
          <Navbar />
          <ModeToggle/>
        </div>
          <div>
            <Button
              variant="outline"
            >
              Generate Tweet
            </Button>
            <TableData />
          </div>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
