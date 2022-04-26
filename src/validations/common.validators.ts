export const strLength = (min: number, max: number) => (value: string) => {
    if (value.length < min || value.length > max) {
        return true
    }
    return false
}

export const isEmail = (value: string) => {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (!emailRegex.test(value)) {
        return true
    }
    return false
}