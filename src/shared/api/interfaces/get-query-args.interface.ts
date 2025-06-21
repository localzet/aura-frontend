import { UndefinedInitialDataOptions } from '@tanstack/react-query'
import { z } from 'zod'

/**
 * Аргументы для создания GET-хука с валидацией через Zod
 * @template ResponseSchema - Zod-схема для валидации данных ответа
 * @template RequestQuerySchema - Zod-схема для валидации query-параметров
 * @template RouteParamsSchema - Zod-схема для валидации параметров маршрута
 */
export interface CreateGetQueryHookArgs<
    ResponseSchema extends z.ZodType,
    RequestQuerySchema extends z.ZodType,
    RouteParamsSchema extends z.ZodType
> {
    /** URL API-эндпоинта, может содержать параметры маршрута (например, /api/users/:id) */
    endpoint: string

    /** Пользовательская функция обработки ошибок */
    errorHandler?: (error: unknown) => void

    /** Query-параметры, включаемые в URL запроса */
    queryParams?: z.infer<RequestQuerySchema>

    /** Схема для валидации query-параметров */
    requestQuerySchema?: RequestQuerySchema

    /** Схема для валидации и парсинга ответа от API */
    responseSchema: ResponseSchema

    /** Параметры маршрута для подстановки в URL */
    routeParams?: z.infer<RouteParamsSchema>

    /** Схема для валидации параметров маршрута */
    routeParamsSchema?: RouteParamsSchema

    /**
     * Конфигурация опций React Query
     * @param queryKey - Уникальный ключ для идентификации запроса
     * @param staleTime - Время в мс, после которого данные считаются устаревшими
     * @param refetchInterval - Интервал в мс между автоматическими фоновыми обновлениями
     * @param enabled - Нужно ли автоматически запускать этот запрос
     * И другие опции React Query, кроме queryFn и queryKey
     */
    rQueryParams: Omit<UndefinedInitialDataOptions, 'queryFn' | 'queryKey'>
}
