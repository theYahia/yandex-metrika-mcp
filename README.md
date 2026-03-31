# @theyahia/yandex-metrika-mcp

MCP-сервер для API Яндекс.Метрики — счётчики, отчёты, цели, логи, посетители, источники трафика.

[![npm](https://img.shields.io/npm/v/@theyahia/yandex-metrika-mcp)](https://www.npmjs.com/package/@theyahia/yandex-metrika-mcp)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Часть серии [Russian API MCP](https://github.com/theYahia) by [@theYahia](https://github.com/theYahia).

## Получение токена

1. Перейдите на [oauth.yandex.ru](https://oauth.yandex.ru/)
2. Создайте приложение (или используйте существующее)
3. В разделе **Платформы** выберите «Веб-сервисы»
4. В разделе **Доступы** добавьте: `Яндекс.Метрика` → `Получение статистики, чтение параметров своих и доверенных счётчиков`
5. Получите OAuth-токен по ссылке:
   ```
   https://oauth.yandex.ru/authorize?response_type=token&client_id=ВАШ_CLIENT_ID
   ```
6. Скопируйте токен из URL после редиректа (`access_token=...`)

## Установка

### Claude Desktop

Добавьте в `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "yandex-metrika": {
      "command": "npx",
      "args": ["-y", "@theyahia/yandex-metrika-mcp"],
      "env": {
        "YANDEX_METRIKA_TOKEN": "ваш_токен"
      }
    }
  }
}
```

### Claude Code

```bash
claude mcp add yandex-metrika -e YANDEX_METRIKA_TOKEN=ваш_токен -- npx -y @theyahia/yandex-metrika-mcp
```

### Streamable HTTP (remote / multi-client)

```bash
YANDEX_METRIKA_TOKEN=ваш_токен npx @theyahia/yandex-metrika-mcp --http --port=3000
```

Endpoint: `POST http://localhost:3000/mcp`
Health check: `GET http://localhost:3000/health`

### Smithery

Используйте `smithery.yaml` из репозитория. Требуется `YANDEX_METRIKA_TOKEN`.

## Инструменты (6)

| Инструмент | API Endpoint | Описание |
|------------|-------------|----------|
| `get_counters` | `GET /management/v1/counters` | Список счётчиков с именем, URL и статусом |
| `get_report` | `GET /stat/v1/data` | Произвольный отчёт по метрикам и группировкам |
| `get_goals` | `GET /management/v1/counter/{id}/goals` | Список целей счётчика (ID, имя, тип) |
| `export_logs` | Logs API | Экспорт сырых логов визитов/просмотров |
| `get_visitors_overview` | `GET /stat/v1/data/bytime` | Обзор посетителей по дням |
| `get_sources` | `GET /stat/v1/data` | Источники трафика по каналам |

## Skills (сценарии)

| Skill | Триггер | Что делает |
|-------|---------|-----------|
| `traffic-report` | «Покажи трафик за месяц» | Сводка по визитам, пользователям, отказам, глубине |
| `goals-analysis` | «Анализ целей и конверсий» | Список целей + достижения + конверсия за период |

## Авторизация

Все запросы используют заголовок `Authorization: Bearer {YANDEX_METRIKA_TOKEN}`.

Установите переменную окружения `YANDEX_METRIKA_TOKEN` — OAuth-токен Яндекс.Метрики.

## Примеры запросов

```
Покажи все мои счётчики Метрики
```

```
Сколько визитов было на сайте за последнюю неделю?
```

```
Какие цели настроены на счётчике 12345?
```

```
Экспортируй логи визитов за январь
```

```
Покажи трафик за месяц
```

```
Анализ целей и конверсий
```

## Разработка

```bash
npm install
npm run build
npm test
npm run dev           # stdio mode
npm run start:http    # HTTP mode on port 3000
```

## Лицензия

MIT
