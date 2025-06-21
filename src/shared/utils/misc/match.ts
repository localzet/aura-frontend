import invariant from 'tiny-invariant'

/**
 * PHP-подобная функция match
 * @param conditions - Массив из [условие, значение]
 * @returns Значение первого выполненного условия
 * @example
 * ```tsx
 * const value = match(
 *  [condition1, value1],
 *  [condition2, value2],
 *  [condition3, value3],
 *  [true, defaultValue]
 * );
 */
export function match<T>(...conditions: Array<[boolean, T]>) {
    const foundedCondition = conditions.find(([condition]) => condition) ?? conditions.at(-1)
    invariant(foundedCondition, 'Ни одно из условий не выполнено')
    return foundedCondition[1]
}
