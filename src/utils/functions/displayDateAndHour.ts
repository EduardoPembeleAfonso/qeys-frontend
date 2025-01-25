import { format } from 'date-fns'
import { pt } from 'date-fns/locale'

export function displayDateAndHour(
    dateAndHour: Date | string | undefined,
) {
    const date = dateAndHour
        ? format(dateAndHour, `d',' LLL ' - ' HH'h : ' m'min'`, {
            locale: pt,
        })
        : null
    return date
}