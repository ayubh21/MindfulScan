import { useAtomValue } from "jotai";
import logo from "../assets/mindful-scan-light.png";
import { themeAtom } from "@/atoms/theme";

export default function Navbar() {
  const theme = useAtomValue(themeAtom);

  return (
    <div className="logo">
      <img src={logo} alt="Blog Logo" />
    </div>
  );
}
