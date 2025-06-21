import dayjs from 'dayjs'

export const ConfigValidationFeature = {
    validate: (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        editorRef: any,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        monacoRef: any,
        setResult: (message: string) => void,
        setIsConfigValid: (isValid: boolean) => void
    ) => {
        try {
            if (!editorRef.current) return
            if (!monacoRef.current) return
            if (typeof editorRef.current !== 'object') return
            if (typeof monacoRef.current !== 'object') return
            if (!('getValue' in editorRef.current)) return
            if (typeof editorRef.current.getValue !== 'function') return

            const currentValue = editorRef.current.getValue()
            const validationResult = window.XrayParseConfig(currentValue)

            setResult(
                `${dayjs().format('HH:mm:ss')} | ${validationResult || 'Конфигурация Xray корректна.'}`
            )
            setIsConfigValid(!validationResult)
        } catch (err: unknown) {
            setResult(`${dayjs().format('HH:mm:ss')} | Ошибка проверки: ${(err as Error).message}`)
            setIsConfigValid(false)
        }
    }
}
