import { z } from "zod";
import { apiGet } from "../client.js";

export const getReportSchema = z.object({
  counter_id: z.number().describe("ID счётчика Яндекс.Метрики"),
  date1: z.string().describe("Дата начала в формате YYYY-MM-DD"),
  date2: z.string().describe("Дата окончания в формате YYYY-MM-DD"),
  metrics: z.string().describe("Метрики через запятую (например ym:s:visits,ym:s:pageviews)"),
  dimensions: z.string().optional().describe("Группировки через запятую (например ym:s:browser)"),
  limit: z.number().optional().describe("Количество строк (по умолчанию 100)"),
});

export async function handleGetReport(params: z.infer<typeof getReportSchema>): Promise<string> {
  const query: Record<string, string> = {
    ids: String(params.counter_id),
    date1: params.date1,
    date2: params.date2,
    metrics: params.metrics,
  };
  if (params.dimensions) query.dimensions = params.dimensions;
  if (params.limit) query.limit = String(params.limit);

  const data = await apiGet("/stat/v1/data", query);
  return JSON.stringify(data, null, 2);
}
