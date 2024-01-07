import { ThemeProvider } from "./components/theme-provider";
import "./App.css";
import { ModeToggle } from "./components/mode-toggle";
import Navbar from "./components/navbar";
import TableData from "./app/page";
import { Button } from "@/components/ui/button"


 function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div>
        <Navbar />
        <ModeToggle />
        <div>
        <Button style={
        {display: "flex", justifyContent: "center"}
        } 
        variant="outline">Generate Tweet</Button>
        <TableData/>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
