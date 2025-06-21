/**
 * Создаёт URL с параметрами запроса и маршрута
 *
 * @param base - Базовый URL с маршрутными параметрами (например, '/api/users/:id')
 * @param queryParams - Необязательные параметры запроса в виде пар ключ-значение. Значения могут быть числами, строками, объектами (будут сериализованы в JSON) или undefined
 * @param routeParams - Необязательные параметры маршрута в виде пар ключ-значение для замены плейсхолдеров в базовом URL
 * @returns URL с подставленными маршрутными параметрами и добавленной строкой запроса (если параметры заданы)
 * @example
 * // Простой пример с маршрутным параметром
 * createUrl('/api/users/:id', undefined, { id: 1 })
 * // => '/api/users/1'
 *
 * @example
 * // С параметрами запроса
 * createUrl('/api/users', { page: 1, limit: 10 })
 * // => '/api/users?page=1&limit=10'
 *
 * @example
 * // С маршрутными и query-параметрами
 * createUrl('/api/users/:id/posts', { sort: 'desc' }, { id: 1 })
 * // => '/api/users/1/posts?sort=desc'
 */
export function createUrl(
    base: string,
    queryParams?: Record<string, number | string | undefined>,
    routeParams?: Record<string, number | string | undefined>
) {
    const url = Object.entries(routeParams ?? {}).reduce(
        (acc, [key, value]) => acc.replaceAll(`:${key}`, String(value)),
        base
    )

    if (!queryParams) return url

    const query = new URLSearchParams()

    Object.entries(queryParams).forEach(([key, value]) => {
        if (value === undefined || value === null || value === '') return

        if (value === 0) {
            query.append(key, '0')
            return
        }

        const processedValue = typeof value === 'object' ? JSON.stringify(value) : String(value)

        query.append(key, processedValue)
    })

    return `${url}?${query.toString()}`
}
