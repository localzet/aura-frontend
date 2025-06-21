/* eslint-disable @typescript-eslint/no-explicit-any, no-use-before-define */

import { PlatformConfig } from './types'

interface ValidationResult {
    errors: string[]
    valid: boolean
}

export function isPlatformConfig(obj: any): obj is PlatformConfig {
    const result = validatePlatformConfig(obj)
    return result.valid
}

export function validatePlatformConfig(config: any): ValidationResult {
    const errors: string[] = []

    if (!config || typeof config !== 'object') {
        return { valid: false, errors: ['Конфигурация должна быть объектом'] }
    }

    if (!Array.isArray(config.ios)) {
        errors.push('config.ios: должно быть массивом')
    } else {
        config.ios.forEach((app: any, index: number) => {
            errors.push(...validateAppConfig(app, `config.ios[${index}]`))
        })
    }

    if (!Array.isArray(config.android)) {
        errors.push('config.android: должно быть массивом приложений')
    } else {
        config.android.forEach((app: any, index: number) => {
            errors.push(...validateAppConfig(app, `config.android[${index}]`))
        })
    }

    if (!Array.isArray(config.pc)) {
        errors.push('config.pc: должно быть массивом приложений')
    } else {
        config.pc.forEach((app: any, index: number) => {
            errors.push(...validateAppConfig(app, `config.pc[${index}]`))
        })
    }

    return {
        valid: errors.length === 0,
        errors
    }
}

function validateAppConfig(app: any, path: string): string[] {
    const errors: string[] = []

    if (!app || typeof app !== 'object') {
        return [`${path}: должно быть объектом`]
    }

    if (typeof app.id !== 'string') {
        errors.push(`${path}.id: должно быть строкой в нижнем регистре`)
    } else if (!/^[a-z]/.test(app.id)) {
        errors.push(`${path}.id: должно начинаться с буквы в нижнем регистре`)
    }

    if (typeof app.name !== 'string') errors.push(`${path}.name: должно быть строкой`)
    if (typeof app.isFeatured !== 'boolean') errors.push(`${path}.isFeatured: должно быть булевым значением`)
    if (typeof app.urlScheme !== 'string') errors.push(`${path}.urlScheme: должно быть строкой`)

    if (app.isNeedBase64Encoding !== undefined && typeof app.isNeedBase64Encoding !== 'boolean') {
        errors.push(`${path}.isNeedBase64Encoding: должно быть булевым значением`)
    }

    if (!app.installationStep || typeof app.installationStep !== 'object') {
        errors.push(`${path}.installationStep: должно быть объектом`)
    } else {
        errors.push(
            ...validateLocalizedText(
                app.installationStep.description,
                `${path}.installationStep.description`
            )
        )
        errors.push(
            ...validateButtons(app.installationStep.buttons, `${path}.installationStep.buttons`)
        )
    }

    if (!app.addSubscriptionStep) {
        errors.push(`${path}.addSubscriptionStep: обязательное поле отсутствует`)
    } else {
        errors.push(...validateStep(app.addSubscriptionStep, `${path}.addSubscriptionStep`))
    }

    if (!app.connectAndUseStep) {
        errors.push(`${path}.connectAndUseStep: обязательное поле отсутствует`)
    } else {
        errors.push(...validateStep(app.connectAndUseStep, `${path}.connectAndUseStep`))
    }

    if (app.additionalBeforeAddSubscriptionStep) {
        errors.push(
            ...validateTitleStep(
                app.additionalBeforeAddSubscriptionStep,
                `${path}.additionalBeforeAddSubscriptionStep`
            )
        )
    }

    if (app.additionalAfterAddSubscriptionStep) {
        errors.push(
            ...validateTitleStep(
                app.additionalAfterAddSubscriptionStep,
                `${path}.additionalAfterAddSubscriptionStep`
            )
        )
    }

    return errors
}

function validateButton(button: any, path: string): string[] {
    const errors: string[] = []

    if (!button || typeof button !== 'object') {
        return [`${path}: кнопка должна быть объектом`]
    }

    if (typeof button.buttonLink !== 'string') {
        errors.push(`${path}.buttonLink: должно быть строкой`)
    } else if (button.buttonLink === '') {
        errors.push(`${path}.buttonLink: не может быть пустым`)
    }

    errors.push(...validateLocalizedText(button.buttonText, `${path}.buttonText`))

    return errors
}

function validateButtons(buttons: any, path: string): string[] {
    const errors: string[] = []

    if (!Array.isArray(buttons)) {
        return [`${path}: должно быть массивом кнопок`]
    }

    buttons.forEach((button, index) => {
        errors.push(...validateButton(button, `${path}[${index}]`))
    })

    return errors
}

function validateLocalizedText(text: any, path: string): string[] {
    const errors: string[] = []

    if (!text || typeof text !== 'object') {
        return [`${path}: должно быть объектом с переводами`]
    }

    if (typeof text.en !== 'string') errors.push(`${path}.en: должно быть строкой`)
    if (typeof text.fa !== 'string') errors.push(`${path}.fa: должно быть строкой`)
    if (typeof text.ru !== 'string') errors.push(`${path}.ru: должно быть строкой`)

    if (typeof text.en === 'string' && text.en === '') errors.push(`${path}.en: не может быть пустым`)
    if (typeof text.fa === 'string' && text.fa === '') errors.push(`${path}.fa: не может быть пустым`)
    if (typeof text.ru === 'string' && text.ru === '') errors.push(`${path}.ru: не может быть пустым`)

    return errors
}

function validateStep(step: any, path: string): string[] {
    const errors: string[] = []

    if (!step || typeof step !== 'object') {
        return [`${path}: должно быть объектом`]
    }

    errors.push(...validateLocalizedText(step.description, `${path}.description`))

    return errors
}

function validateTitleStep(step: any, path: string): string[] {
    const errors: string[] = []

    if (!step || typeof step !== 'object') {
        return [`${path}: должно быть объектом`]
    }

    errors.push(...validateLocalizedText(step.title, `${path}.title`))
    errors.push(...validateLocalizedText(step.description, `${path}.description`))
    errors.push(...validateButtons(step.buttons, `${path}.buttons`))

    return errors
}
