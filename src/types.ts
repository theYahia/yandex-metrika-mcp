export interface MetrikaCounter {
  id: number;
  name: string;
  site: string;
  status: string;
  create_time: string;
}

export interface MetrikaCountersResponse {
  counters: MetrikaCounter[];
  rows: number;
}

export interface MetrikaReportResponse {
  query: Record<string, unknown>;
  data: unknown[];
  totals: unknown[];
  total_rows: number;
}

export interface MetrikaVisitorsResponse {
  data: unknown[];
  totals: unknown[];
  total_rows: number;
}

export interface MetrikaSourcesResponse {
  data: unknown[];
  totals: unknown[];
  total_rows: number;
}
