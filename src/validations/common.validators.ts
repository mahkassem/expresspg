export const strLength = (min: number, max: number) => (value: string) => {
    if (value.length < min || value.length > max) {
        return true
    }
    return false
}

export const isEmail = (value: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
    if (emailRegex.test(value)) {
        return true
    }
    return false
}