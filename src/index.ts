#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { getCountersSchema, handleGetCounters } from "./tools/counters.js";
import { getReportSchema, handleGetReport } from "./tools/report.js";
import { getVisitorsSchema, handleGetVisitors } from "./tools/visitors.js";
import { getSourcesSchema, handleGetSources } from "./tools/sources.js";

const server = new McpServer({
  name: "yandex-metrika-mcp",
  version: "1.0.0",
});

server.tool(
  "get_counters",
  "Список счётчиков Яндекс.Метрики. Возвращает ID, имя, URL сайта, статус.",
  getCountersSchema.shape,
  async (params) => ({
    content: [{ type: "text", text: await handleGetCounters(params) }],
  }),
);

server.tool(
  "get_report",
  "Произвольный отчёт Яндекс.Метрики по метрикам и группировкам за период.",
  getReportSchema.shape,
  async (params) => ({
    content: [{ type: "text", text: await handleGetReport(params) }],
  }),
);

server.tool(
  "get_visitors",
  "Статистика посетителей по дням: визиты, пользователи, отказы, глубина.",
  getVisitorsSchema.shape,
  async (params) => ({
    content: [{ type: "text", text: await handleGetVisitors(params) }],
  }),
);

server.tool(
  "get_sources",
  "Источники трафика: визиты и пользователи по каналам (поиск, реклама, прямые и т.д.).",
  getSourcesSchema.shape,
  async (params) => ({
    content: [{ type: "text", text: await handleGetSources(params) }],
  }),
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("[yandex-metrika-mcp] Сервер запущен. 4 инструмента. Требуется YANDEX_METRIKA_TOKEN.");
}

main().catch((error) => {
  console.error("[yandex-metrika-mcp] Ошибка запуска:", error);
  process.exit(1);
});
