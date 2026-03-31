# @theyahia/yandex-metrika-mcp

MCP-сервер для API Яндекс.Метрики — счётчики, отчёты, посетители, источники трафика. Требуется OAuth-токен.

[![npm](https://img.shields.io/npm/v/@theyahia/yandex-metrika-mcp)](https://www.npmjs.com/package/@theyahia/yandex-metrika-mcp)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Часть серии [Russian API MCP](https://github.com/theYahia) by [@theYahia](https://github.com/theYahia).

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

## Авторизация

Установите переменную окружения `YANDEX_METRIKA_TOKEN` — OAuth-токен Яндекс.Метрики.

## Инструменты (4)

| Инструмент | Описание |
|------------|----------|
| `get_counters` | Список счётчиков с именем, URL и статусом |
| `get_report` | Произвольный отчёт по метрикам и группировкам |
| `get_visitors` | Статистика посетителей по дням |
| `get_sources` | Источники трафика по каналам |

## Примеры запросов

```
Покажи все мои счётчики Метрики
```

```
Сколько визитов было на сайте за последнюю неделю?
```

```
Какие источники трафика приносят больше всего посетителей?
```

## Лицензия

MIT
