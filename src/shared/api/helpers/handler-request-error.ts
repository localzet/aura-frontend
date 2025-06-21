import { consola } from 'consola/browser'
import { isAxiosError } from 'axios'
import { ZodError } from 'zod'

/** Обработка ошибок запроса */
export function handleRequestError(error: unknown) {
    if (isAxiosError(error)) {
        const errorData = error.response?.data
        const enhancedError = new Error(errorData?.message || 'Ошибка запроса')
        enhancedError.cause = errorData
        throw enhancedError
    }

    if (error instanceof ZodError) {
        consola.error(error.format())
    }

    consola.log(error)

    throw error
}
