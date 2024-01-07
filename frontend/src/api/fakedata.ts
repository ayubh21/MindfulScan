import { Tweet } from "@/types/tweet";
const FAKEDATA_ENDPOINT = "http://localhost:25566/api/fakedata";

export async function getFakeData(pageNum: number): Promise<Tweet[]> {
  const response = await fetch(`${FAKEDATA_ENDPOINT}?page=${pageNum}`);
  const respJson = await response.json();
  return respJson as Tweet[];
}
