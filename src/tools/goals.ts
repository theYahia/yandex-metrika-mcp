import { z } from "zod";
import { apiGet } from "../client.js";

export const getGoalsSchema = z.object({
  counter_id: z.number().describe("ID счётчика Яндекс.Метрики"),
});

export async function handleGetGoals(params: z.infer<typeof getGoalsSchema>): Promise<string> {
  const data = await apiGet(`/management/v1/counter/${params.counter_id}/goals`);
  return JSON.stringify(data, null, 2);
}
