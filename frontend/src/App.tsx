import { ThemeProvider } from "./components/theme-provider";
import "./App.css";
import { ModeToggle } from "./components/mode-toggle";
import TableData from "./app/page";
import Navbar from "./components/Navbar";
import { QueryClient, QueryClientProvider } from "react-query";
import Footer from "./components/footer";

function App() {
  const queryClient = new QueryClient();
  return (
    <div id="page-container">
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <div
            className="header"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "end",
            }}
          >
            <Navbar />
            <ModeToggle />
          </div>
          <div>
            <TableData />
          </div>
        </ThemeProvider>
      </QueryClientProvider>
      <Footer/>
      </div>
    );
  
}

export default App;
