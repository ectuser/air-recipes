export enum TimeEnum {
    hours, minutes, seconds
}

export interface CookTime {
    type: TimeEnum,
    time: number
}

export const cardHelper = {
    convertSeconds(seconds: number): CookTime {
        const hours = Math.floor(seconds / 3600)
        const minutes = Math.floor(seconds / 60) % 60

        return hours >= 1 ? {time: hours, type: TimeEnum.hours} :
            minutes >= 1 ? {time: minutes, type: TimeEnum.minutes} :
                {time: seconds, type: TimeEnum.seconds};
    }
}
