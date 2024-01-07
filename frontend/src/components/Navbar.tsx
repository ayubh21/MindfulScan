import { useAtomValue } from "jotai";
import logoLight from "../assets/mindful-scan-light.png";
import logoDark from "../assets/mindful-scan-dark.png";
import { themeAtom } from "@/atoms/theme";

export default function Navbar() {
  const theme = useAtomValue(themeAtom);

  return (
    <header>
      <div className="logo">
        <img src={theme == "dark" ? logoDark : logoLight} alt="Blog Logo" />
      </div>
    </header>
  );
}
