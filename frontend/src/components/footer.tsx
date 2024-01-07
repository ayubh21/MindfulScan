import logoLight from "../assets/mindful-scan-light.png";
import logoDark from "../assets/mindful-scan-dark.png";
import { themeAtom } from "@/atoms/theme";
import { useAtomValue } from "jotai";
import { Button } from "./ui/button";
export default function Footer() {
  const theme = useAtomValue(themeAtom);
  return (
    <div id="content-wrap">
    <footer id="footer" className="footer items-center p-4 bg-neutral text-neutral-content">
      <aside className="items-center grid-flow-col">
        <div className="logo">
          <img src={theme == "dark" ? logoDark : logoLight} alt="Blog Logo"  style={{width: "200px", marginBottom: "3rem"}}/>
          <p className="copyright-text">
            © 2024 MindfulScan. All rights reserved.
          </p>
        </div>
      </aside>
      <Button
        // style={{marginBottom: "1rem"}}
        variant="destructive"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="back-to-top-btn"
      >
        Back to Top
      </Button>
    </footer>
    </div>
  );
}
