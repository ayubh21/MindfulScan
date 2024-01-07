import { FlagResponse } from "@/types/flagResponse";

const PROMPT_ENDPOINT = "http://174.3.108.201:25566/api/prompt";

export async function getContentFlag(prompt: string) {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt: prompt }),
  };

  const response = await fetch(PROMPT_ENDPOINT, options);
  const respJson = await response.json();
  return respJson as FlagResponse;
}
