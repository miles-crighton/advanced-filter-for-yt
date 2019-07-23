export function convertVideoDuration(duration) {
    //Input must be string
    let hoursRegex = /\d+H/
    let hoursString = duration.match(hoursRegex)
    let hours = hoursString === null ? 0 : parseInt(hoursString[0].slice(0, hoursString[0].length - 1))

    let minutesRegex = /\d+M/
    let minutesString = duration.match(minutesRegex)
    let minutes = minutesString === null ? 0 : parseInt(minutesString[0].slice(0, minutesString[0].length - 1))

    let secondsRegex = /\d+S/
    let secondsString = duration.match(secondsRegex)
    let seconds = secondsString === null ? 0 : parseInt(secondsString[0].slice(0, secondsString[0].length - 1))

    let durationFormatted = {
        hours,
        minutes,
        seconds
    }
    return durationFormatted
}