#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { getCountersSchema, handleGetCounters } from "./tools/counters.js";
import { getReportSchema, handleGetReport } from "./tools/report.js";
import { getVisitorsSchema, handleGetVisitors } from "./tools/visitors.js";
import { getSourcesSchema, handleGetSources } from "./tools/sources.js";
import { getGoalsSchema, handleGetGoals } from "./tools/goals.js";
import { exportLogsSchema, handleExportLogs } from "./tools/logs.js";
import http from "node:http";

const TOOL_COUNT = 6;

function createServer(): McpServer {
  const server = new McpServer({
    name: "yandex-metrika-mcp",
    version: "1.1.0",
  });

  server.tool(
    "get_counters",
    "Список счётчиков Яндекс.Метрики. Возвращает ID, имя, URL сайта, статус. GET /management/v1/counters",
    getCountersSchema.shape,
    async (params) => ({
      content: [{ type: "text", text: await handleGetCounters(params) }],
    }),
  );

  server.tool(
    "get_report",
    "Произвольный отчёт Яндекс.Метрики по метрикам и группировкам за период. GET /stat/v1/data",
    getReportSchema.shape,
    async (params) => ({
      content: [{ type: "text", text: await handleGetReport(params) }],
    }),
  );

  server.tool(
    "get_goals",
    "Список целей счётчика Яндекс.Метрики. Возвращает ID, имя, тип, условия. GET /management/v1/counter/{id}/goals",
    getGoalsSchema.shape,
    async (params) => ({
      content: [{ type: "text", text: await handleGetGoals(params) }],
    }),
  );

  server.tool(
    "export_logs",
    "Экспорт сырых логов визитов или просмотров через Logs API. Создаёт запрос и оценивает выполнимость.",
    exportLogsSchema.shape,
    async (params) => ({
      content: [{ type: "text", text: await handleExportLogs(params) }],
    }),
  );

  server.tool(
    "get_visitors_overview",
    "Обзор посетителей по дням: визиты, пользователи, новые, отказы, глубина, длительность. GET /stat/v1/data/bytime",
    getVisitorsSchema.shape,
    async (params) => ({
      content: [{ type: "text", text: await handleGetVisitors(params) }],
    }),
  );

  server.tool(
    "get_sources",
    "Источники трафика: визиты и пользователи по каналам (поиск, реклама, прямые и т.д.). GET /stat/v1/data",
    getSourcesSchema.shape,
    async (params) => ({
      content: [{ type: "text", text: await handleGetSources(params) }],
    }),
  );

  return server;
}

async function main() {
  const args = process.argv.slice(2);
  const httpMode = args.includes("--http");
  const port = Number(args.find((a) => a.startsWith("--port="))?.split("=")[1]) || 3000;

  const server = createServer();

  if (httpMode) {
    const transport = new StreamableHTTPServerTransport({ sessionIdGenerator: () => crypto.randomUUID() });
    await server.connect(transport);

    const httpServer = http.createServer(async (req, res) => {
      if (req.url === "/mcp" || req.url?.startsWith("/mcp?")) {
        await transport.handleRequest(req, res);
      } else if (req.url === "/health") {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ status: "ok", tools: TOOL_COUNT }));
      } else {
        res.writeHead(404);
        res.end("Not found");
      }
    });

    httpServer.listen(port, () => {
      console.error(`[yandex-metrika-mcp] HTTP mode on port ${port}. ${TOOL_COUNT} tools. POST /mcp`);
    });
  } else {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error(`[yandex-metrika-mcp] Stdio mode. ${TOOL_COUNT} tools. Requires YANDEX_METRIKA_TOKEN.`);
  }
}

main().catch((error) => {
  console.error("[yandex-metrika-mcp] Ошибка запуска:", error);
  process.exit(1);
});

export { createServer };
