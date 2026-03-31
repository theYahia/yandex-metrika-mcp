import { z } from "zod";
import { apiGet } from "../client.js";

export const getCountersSchema = z.object({
  search_string: z.string().optional().describe("Поиск по имени или URL счётчика"),
});

export async function handleGetCounters(params: z.infer<typeof getCountersSchema>): Promise<string> {
  const query: Record<string, string> = {};
  if (params.search_string) query.search_string = params.search_string;

  const data = await apiGet("/management/v1/counters", query);
  return JSON.stringify(data, null, 2);
}
