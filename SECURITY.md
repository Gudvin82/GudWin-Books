# Security Review - GudWin BookS

## Что уже учтено в MVP
- Прямой пользовательский ввод экранируется перед вставкой в DOM (`escapeHtml`).
- Нет `eval`, нет inline JS строк от пользователя.
- Нет сторонних SDK с секретами на клиенте.
- Базовая валидация форм и ограничение длины ввода.

## Критично для production
1. Проверка Telegram Login подписи на backend (hash verify).
2. HttpOnly session cookie + CSRF защита.
3. Telegram Stars webhook verification и ledger по операциям.
4. RBAC/ownership проверки на доступ к сказкам/комиксам.
5. Rate limit на генерации, auth, billing endpoints.
6. Prompt/content moderation и age-safe фильтры.
7. Signed URLs для медиа, ограниченный TTL.
8. Централизованный аудит: auth/payment/generation/error logs.
9. Шифрование PII at-rest и ротация секретов.
10. SAST/DAST и dependency audit в CI.
