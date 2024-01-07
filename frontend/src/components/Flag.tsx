import { getContentFlag } from "@/api/prompt";
import { FlagResponse } from "@/types/flagResponse";
import { useEffect, useState } from "react";
import { HashLoader } from "react-spinners";
import { MoreVertical } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

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
      {hasLoaded && (
        <AlertDialog>
          <AlertDialogTrigger>
            <MoreVertical size={16} style={{ cursor: "pointer" }} />
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Flag Reason: {resp?.response.speech_type}
              </AlertDialogTitle>
              <AlertDialogDescription>
                Original Tweet
                <br />
                {prompt}
              </AlertDialogDescription>
              <AlertDialogDescription>
                Explanation
                <br />
                {resp?.response.explanation}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Allow</AlertDialogCancel>
              <AlertDialogAction>Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
}
