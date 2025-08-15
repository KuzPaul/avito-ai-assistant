# Avito AI Assistant

**Веб-приложение для управления объявлениями с AI-помощником**

Список объявлений с фильтрами и сортировкой, просмотр и редактирование карточки, подсказки по незаполненным полям. Ollama генерирует описание и ориентир по цене — без облачных API. Портфельный кейс в домене маркетплейса; не аффилирован с Avito.

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=white" alt="React 19" />
  <img src="https://img.shields.io/badge/TypeScript-5.9-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-8-646CFF?style=flat-square&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/TanStack_Query-5-FF4154?style=flat-square" alt="TanStack Query" />
  <img src="https://img.shields.io/badge/Redux_Toolkit-2-764ABC?style=flat-square&logo=redux&logoColor=white" alt="Redux Toolkit" />
  <img src="https://img.shields.io/badge/MUI-7-007FFF?style=flat-square&logo=mui&logoColor=white" alt="MUI" />
  <img src="https://img.shields.io/badge/Ollama-LLM-000000?style=flat-square" alt="Ollama" />
  <img src="https://img.shields.io/badge/Vitest-18_tests-6E9F18?style=flat-square&logo=vitest&logoColor=white" alt="Vitest" />
</p>

---


## Ключевые сценарии

| Сценарий | Реализация |
|----------|------------|
| Массовый обзор объявлений | Сетка / список, пагинация, фильтры по категории и статусу доработки |
| Редактирование без потери данных | Валидация Zod, черновик в `localStorage`, snackbar об успехе/ошибке |
| AI без облачных ключей | Ollama локально: генерация описания и оценка цены по контексту объявления |
| Комфортная работа днём и ночью | Design tokens + светлая/тёмная тема на всех экранах |

---

### Разделение ответственности состояния

| Слой | Инструмент | Зачем |
|------|------------|--------|
| Серверные данные | **TanStack Query** | Кэш списка и карточки, `placeholderData`, инвалидация после `PATCH` |
| UI и фильтры | **Redux Toolkit** | Поиск, категории, сортировка, layout, тема — без смешивания с API |
| Формы | **React Hook Form + Zod** | Декларативная валидация, `useWatch` без лишних ре-рендеров всей формы |

### Производительность

- **Code splitting** — страницы через `React.lazy` + `Suspense`; начальный чанк ~200 KB вместо монолита ~700 KB.
- **AdCard** — `layout` приходит пропом с родителя, а не через `useAppSelector` в каждой из 10+ карточек (нет каскадных ре-рендеров при смене вида).
- **Мемоизация** — `memo` на карточках, `useMemo` для темы MUI и тяжёлой сортировки на клиенте.

### Качество и поддерживаемость

- **TypeScript strict** — модели объявлений, параметры по категориям, схема формы.
- **CSS Modules + design tokens** — изолированные стили компонентов, централизованные цвета в `colors.css`.
- **18 unit-тестов** (Vitest + Testing Library) — утилиты, Redux, UI-критичные компоненты.

### Интеграция с бэкендом
На стороне API доработаны контракты под фронт: `id` в списке, CORS/`OPTIONS`, корректный `PORT` — "нашел баг в контракте → поправил".

---

## Быстрый запуск

**Требования:** Node.js 20+, npm, [Ollama](https://ollama.com/download), работающий REST API объявлений.

```bash
git clone https://github.com/KuzPaul/avito-ai-assistant.git
cd avito-ai-assistant
npm install
```

**Ollama (AI-функции):**

```bash
ollama pull llama3.2:3b
ollama serve
```

**Приложение:**

```bash
npm run dev
```

Откройте **http://localhost:5173/ads**

| Команда | Назначение |
|---------|------------|
| `npm run build` | Production-сборка + `tsc` |
| `npm run preview` | Просмотр сборки |
| `npm run test` | 18 unit-тестов |
| `npm run lint` | ESLint |

---

## Архитектура

```
┌─────────────────────────────────────────────────────────┐
│  Pages (lazy)                                           │
│  AdsListPage → AdDetailsPage → AdEditPage                 │
└────────────┬───────────────────────────────┬────────────┘
             │                               │
     TanStack Query                    Redux (filters, UI)
     items / item / mutate              theme, layout, search
             │                               │
             └───────────┬───────────────────┘
                         ▼
                   REST API + Ollama
```

```
src/
├── api/           items, llm, HTTP-клиент
├── components/    Ads · Layout · UI (переиспользуемые блоки)
├── hooks/         useLLM, useThemeSync
├── pages/         маршруты приложения
├── store/         filters + ui slices
├── styles/        design tokens (light/dark)
├── types/         доменные модели + Zod
└── utils/         бизнес-логика (missing fields, prepare payload)
```

**Маршруты:** `/ads` · `/ads/:id` · `/ads/:id/edit`

---

## Что посмотреть в коде

| Файл / зона | На что обратить внимание |
|-------------|-------------------------|
| `src/App.tsx` | Lazy routes, `useMemo` для MUI theme |
| `src/pages/AdsListPage.tsx` | Query keys, клиентская сортировка по цене, колбэки |
| `src/pages/AdEditPage.tsx` | RHF + Zod, черновик, AI flow |
| `src/components/Ads/AdCard.tsx` | `memo`, layout через props |
| `src/styles/colors.css` | Темизация через CSS variables |
| `src/utils/getMissingFields.ts` | Доменная логика «доработок» |
| `*.test.ts(x)` | Покрытие утилит и UI |

---

## Roadmap
- [ ] Сортировка по цене на API (сейчас fallback на клиенте)
- [ ] E2E (Playwright) для критичных сценариев продавца
- [ ] React Compiler в production pipeline

---

## Контакты
**GitHub:** [@KuzPaul](https://github.com/KuzPaul)
**Репозиторий:** [github.com/KuzPaul/avito-ai-assistant](https://github.com/KuzPaul/avito-ai-assistant)

---
