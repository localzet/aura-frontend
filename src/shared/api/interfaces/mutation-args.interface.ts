/* eslint-disable perfectionist/sort-interfaces */

import { z } from 'zod'

import { EnhancedMutationParams } from './enhanced-mutations-params.interface'

export interface CreateMutationHookArgs<
    RouteParamsSchema extends z.ZodType,
    RequestQuerySchema extends z.ZodType,
    BodySchema extends z.ZodType,
    ResponseSchema extends z.ZodType
> {
    /** Эндпоинт для POST-запроса */
    endpoint: string

    /** HTTP-метод, используемый для запроса */
    requestMethod: 'delete' | 'get' | 'patch' | 'post' | 'put'

    /** Параметры маршрута для подстановки в URL */
    routeParams?: z.infer<RouteParamsSchema>

    /** Схема для валидации параметров маршрута */
    routeParamsSchema?: RouteParamsSchema

    /** Query-параметры, включаемые в URL запроса */
    queryParams?: z.infer<RequestQuerySchema>

    /** Схема для валидации query-параметров */
    requestQuerySchema?: RequestQuerySchema

    /** Zod-схема для тела запроса */
    bodySchema?: BodySchema

    /** Zod-схема для данных ответа */
    responseSchema: ResponseSchema

    /** Параметры мутации для хука react-query */
    rMutationParams?: EnhancedMutationParams<
        z.infer<ResponseSchema>['response'],
        Error,
        z.infer<BodySchema>,
        z.infer<RouteParamsSchema>
    >

    /** Пользовательская функция обработки ошибок */
    errorHandler?: (error: unknown) => void
}
