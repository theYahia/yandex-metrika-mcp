import { z } from "zod";
import { apiGet } from "../client.js";

export const getVisitorsSchema = z.object({
  counter_id: z.number().describe("ID счётчика Яндекс.Метрики"),
  date1: z.string().describe("Дата начала в формате YYYY-MM-DD"),
  date2: z.string().describe("Дата окончания в формате YYYY-MM-DD"),
});

export async function handleGetVisitors(params: z.infer<typeof getVisitorsSchema>): Promise<string> {
  const query: Record<string, string> = {
    ids: String(params.counter_id),
    date1: params.date1,
    date2: params.date2,
    metrics: "ym:s:users,ym:s:newUsers,ym:s:visits,ym:s:bounceRate,ym:s:pageDepth,ym:s:avgVisitDurationSeconds",
    dimensions: "ym:s:date",
  };

  const data = await apiGet("/stat/v1/data/bytime", query);
  return JSON.stringify(data, null, 2);
}
