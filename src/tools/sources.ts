import { z } from "zod";
import { apiGet } from "../client.js";

export const getSourcesSchema = z.object({
  counter_id: z.number().describe("ID счётчика Яндекс.Метрики"),
  date1: z.string().describe("Дата начала в формате YYYY-MM-DD"),
  date2: z.string().describe("Дата окончания в формате YYYY-MM-DD"),
  limit: z.number().optional().describe("Количество строк (по умолчанию 100)"),
});

export async function handleGetSources(params: z.infer<typeof getSourcesSchema>): Promise<string> {
  const query: Record<string, string> = {
    ids: String(params.counter_id),
    date1: params.date1,
    date2: params.date2,
    metrics: "ym:s:visits,ym:s:users,ym:s:bounceRate",
    dimensions: "ym:s:lastTrafficSource",
  };
  if (params.limit) query.limit = String(params.limit);

  const data = await apiGet("/stat/v1/data", query);
  return JSON.stringify(data, null, 2);
}
