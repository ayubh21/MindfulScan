import { Tweet } from "@/types/tweet";

const FAKEDATA_ENDPOINT = `${import.meta.env.VITE_BASE_URL}/api/fakedata`;

export async function getFakeData(pageNum: number): Promise<Tweet[]> {
  const response = await fetch(`${FAKEDATA_ENDPOINT}?page=${pageNum}`);
  const respJson = await response.json();
  return respJson as Tweet[];
}
