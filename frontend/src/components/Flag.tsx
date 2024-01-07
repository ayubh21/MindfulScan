import { getContentFlag } from "@/api/prompt";
import { FlagResponse } from "@/types/flagResponse";
import { useEffect, useState } from "react";
import { HashLoader } from "react-spinners";

type FlagProps = {
  id: string;
  prompt: string;
};

export default function FlagInfo({ prompt }: FlagProps) {
  const [resp, setResp] = useState<FlagResponse>();
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    getContentFlag(prompt).then((data) => {
      setResp(data);
      setHasLoaded(true);
    });
  }, [prompt]);

  return (
    <div>
      {!hasLoaded && <HashLoader size={16} color="#36d7b7" />}
      <h3>{resp?.response.speech_type}</h3>
    </div>
  );
}
