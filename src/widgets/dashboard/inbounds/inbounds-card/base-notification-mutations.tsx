import { notifications } from '@mantine/notifications'
import { TbCheck as IconCheck } from 'react-icons/tb'

export const baseNotificationsMutations = (id: string, refetch: () => void) => {
    return {
        onMutate: () => {
            notifications.show({
                id,
                loading: true,
                title: 'Обработка',
                message: 'Операция может занять некоторое время...',
                autoClose: false,
                withCloseButton: false
            })
        },
        onSettled(error: unknown) {
            if (error) {
                notifications.update({
                    id,
                    color: 'red',
                    title: 'Ошибка',
                    message: error instanceof Error ? error.message : 'Неизвестная ошибка',
                    loading: false,
                    autoClose: 5000
                })
            }
        },
        onSuccess: () => {
            notifications.update({
                icon: <IconCheck size={18} />,
                id,
                color: 'teal',
                title: 'Успех',
                message: 'Операция успешно завершена',
                loading: false,
                autoClose: 3000
            })

            refetch()
        }
    }
}
