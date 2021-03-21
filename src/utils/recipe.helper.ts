export enum TimeEnum {
    hours, min, sec
}

export interface CookTime {
    type: TimeEnum,
    time: number
}

export const recipeHelper = {
    convertSeconds(seconds: number): CookTime {
        const hours = Math.floor(seconds / 3600)
        const minutes = Math.floor(seconds / 60) % 60

        return hours >= 1 ? {time: hours, type: TimeEnum.hours} :
            minutes >= 1 ? {time: minutes, type: TimeEnum.min} :
                {time: seconds, type: TimeEnum.sec};
    },
    capitalizeFirstLetter(str: string): string {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
}
