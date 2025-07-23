import { QueryKey, useQuery, UseQueryResult } from '@tanstack/react-query'
import { z } from 'zod'

import { createUrl, handleRequestError } from '../helpers'
import { CreateGetQueryHookArgs } from '../interfaces'
import { instance } from '../axios'

type QueryParams<R, Q> = {
    query?: Q
    route?: R
}

/**
 * Создаёт пользовательский хук для выполнения GET-запросов с помощью react-query и валидацией через Zod.
 * Этот хук обрабатывает получение данных, кэширование, валидацию и обработку ошибок с типобезопасностью.
 *
 * @template ResponseSchema - Zod-схема для валидации ответа от API
 * @template RequestQuerySchema - Zod-схема для валидации query-параметров
 * @template RouteParamsSchema - Zod-схема для валидации параметров маршрута
 * @template ErrorHandler - Тип пользовательского обработчика ошибок
 *
 * @param options - Настройки для создания хука запроса
 * @param options.endpoint - URL API-эндпоинта с необязательными маршрутными параметрами (например, '/api/users/:id')
 * @param options.responseSchema - Zod-схема для валидации данных ответа от API
 * @param options.requestQuerySchema - Необязательная Zod-схема для валидации query-параметров
 * @param options.routeParamsSchema - Необязательная Zod-схема для валидации параметров маршрута
 * @param options.rQueryParams - Опции React Query (staleTime, refetchInterval и др.)
 * @param options.queryParams - Необязательные query-параметры по умолчанию для каждого запроса
 * @param options.routeParams - Необязательные маршрутные параметры по умолчанию для каждого запроса
 * @param options.errorHandler - Необязательный пользовательский обработчик ошибок
 * @param options.getQueryKey - Функция генерации уникального ключа кэша React Query
 *
 * @returns Пользовательский React-хук, возвращающий UseQueryResult с корректной типизацией
 *
 * @example
 * ```typescript
 * // Определяем хук
 * const useGetUsers = createGetQueryHook({
 *   endpoint: '/api/users',
 *   responseSchema: z.object({
 *     response: z.array(z.object({
 *       id: z.string(),
 *       name: z.string()
 *     }))
 *   }),
 *   requestQuerySchema: z.object({
 *     page: z.number(),
 *     limit: z.number()
 *   }),
 *   rQueryParams: {
 *     staleTime: 5000,
 *     refetchInterval: 10000
 *   },
 *   getQueryKey: (params) => ['users', params]
 * });
 *
 * // Используем хук в компоненте
 * function UsersList() {
 *   const { data, isLoading, error } = useGetUsers({
 *     query: { page: 1, limit: 10 }
 *   });
 *
 *   if (isLoading) return <div>Загрузка...</div>;
 *   if (error) return <div>Ошибка: {error.message}</div>;
 *
 *   return (
 *     <ul>
 *       {data?.map(user => (
 *         <li key={user.id}>{user.name}</li>
 *       ))}
 *     </ul>
 *   );
 * }
 * ```
 */

export function createGetQueryHook<
    ResponseSchema extends z.ZodType,
    RequestQuerySchema extends z.ZodType,
    RouteParamsSchema extends z.ZodType,
    ErrorHandler extends (error: unknown) => void = (error: unknown) => void
>({
    endpoint,
    responseSchema,
    requestQuerySchema,
    rQueryParams,
    queryParams,
    routeParams,
    errorHandler,
    getQueryKey
}: CreateGetQueryHookArgs<ResponseSchema, RequestQuerySchema, RouteParamsSchema> & {
    getQueryKey: (
        params: QueryParams<z.infer<RouteParamsSchema>, z.infer<RequestQuerySchema>>
    ) => QueryKey
}) {
    const queryFn = async (params?: {
        errorHandler?: ErrorHandler
        query?: z.infer<RequestQuerySchema>
        route?: z.infer<RouteParamsSchema>
    }) => {
        const validatedQuery = requestQuerySchema?.parse({ ...queryParams, ...params?.query })

        const url = createUrl(endpoint, validatedQuery, params?.route ?? routeParams)

        return instance
            .get<z.infer<ResponseSchema>>(url)
            .then(async (response) => {
                const result = await responseSchema.safeParseAsync(response.data)
                if (!result.success) {
                    throw result.error
                }
                return result.data.response
            })
            .catch((error) => errorHandler?.(error) ?? handleRequestError(error))
    }

    return (params?: {
        query?: z.infer<RequestQuerySchema>
        route?: z.infer<RouteParamsSchema>
        rQueryParams?: Partial<typeof rQueryParams>
    }) =>
        useQuery({
            ...rQueryParams,
            ...params?.rQueryParams,
            queryKey: getQueryKey({
                route: params?.route,
                query: params?.query
            }),
            queryFn: () => queryFn(params)
        }) as UseQueryResult<z.infer<ResponseSchema>['response']>
}
