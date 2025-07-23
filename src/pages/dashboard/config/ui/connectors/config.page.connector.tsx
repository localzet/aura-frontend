import { useEffect, useState } from 'react'
import { consola } from 'consola/browser'

import { fetchWithProgress } from '@shared/utils/fetch-with-progress'
import { useGetConfig } from '@shared/api/hooks'
import { LoadingScreen } from '@shared/ui'
import { app } from 'src/config'

import { ConfigPageComponent } from '../components/config.page.component'

export function ConfigPageConnector() {
    const [downloadProgress, setDownloadProgress] = useState(0)
    const [isLoading, setIsLoading] = useState(true)

    const {
        data: { config } = { config: undefined },
        isLoading: isConfigLoading,
        refetch
    } = useGetConfig()

    useEffect(() => {
        const initWasm = async () => {
            try {
                const go = new window.Go()
                const wasmInitialized = new Promise<void>((resolve) => {
                    window.onWasmInitialized = () => {
                        consola.info('Модуль WASM инициализирован')
                        resolve()
                    }
                })

                const wasmBytes = await fetchWithProgress(
                    app.configEditor.wasmUrl,
                    setDownloadProgress
                )
                const { instance } = await WebAssembly.instantiate(wasmBytes, go.importObject)
                go.run(instance)
                await wasmInitialized

                if (typeof window.XrayParseConfig === 'function') {
                    setIsLoading(false)
                } else {
                    throw new Error('XrayParseConfig не инициализирована')
                }
            } catch (err: unknown) {
                consola.error('Ошибка инициализации WASM:', err)
                setIsLoading(false)
            }
        }

        refetch()
        initWasm()

        return () => {
            delete window.onWasmInitialized
        }
    }, [])

    if (isLoading || isConfigLoading || !config) {
        return <LoadingScreen text={"Загрузка модуля WASM..."} value={downloadProgress} />
    }

    return <ConfigPageComponent config={config} />
}
