// example interfaces that can be use
// TIP: the types mentioned in the interfaces must be fulfilled in order to solve the problem.
interface TemperatureReading {
  time: Date
  temperature: number
  city: string
}
interface TemperatureSummary {
  first: number
  last: number
  high: number
  low: number
  average: number
}

/**
 * Temperatures is a map that stores cities
 */
interface Temperatures {
  [city: string]: City
}
/**
 * City is an object that describes the city's
 * counterReadings, historical high, low, average
 * and stores Dates
 */
interface City {
  countedReadings: number
  histHigh: number
  histLow: number
  histAvg: number
  dates: Dates
}
/**
 * Dates is a map where the index is a date
 * that stores an array of temperatures and a
 * summary object that describes that date.
 */
interface Dates {
  [date: number]: {
    temperature: number[]
    summary: TemperatureSummary
  }
}

const temperatures: Temperatures = {}

/**
 * processReadings will iterate from the given array and
 * store the city, time and temp inside the global Temperatures
 * map of maps.
 * If the city or time does not exist, it will initialize
 * an empty object with empty values
 * If it does exist, it will push the temperature in the array
 * and update internal statistic values for the city
 */
export function processReadings(readings: TemperatureReading[]): void {
  // add here your code
  readings.forEach((reading) => {
    const city = reading.city
    const date = reading.time.getTime()
    const tmp = reading.temperature

    if (typeof temperatures[city] === 'undefined')
      temperatures[city] = {
        countedReadings: 0,
        histHigh: -Infinity,
        histLow: +Infinity,
        histAvg: 0,
        dates: {} as Dates,
      }
    if (typeof temperatures[city]['dates'][date] === 'undefined')
      temperatures[city]['dates'][date] = {
        temperature: [],
        summary: {} as TemperatureSummary,
      }

    const cityKey = temperatures[city]

    cityKey['dates'][date]['temperature'].push(tmp)
    cityKey['countedReadings']++
    cityKey['histAvg'] += tmp

    cityKey['histHigh'] = tmp > cityKey['histHigh'] ? tmp : cityKey['histHigh']
    cityKey['histLow'] = tmp < cityKey['histLow'] ? tmp : cityKey['histLow']
  })

  //console.log(JSON.stringify(temperatures, null, 4))
}
/**
 * getTemperatureSummary will sumarize the temperature from the given
 * city on the given date. If the city or the date doesn't not exist
 * it will return null.
 * If the city and date exist, it will retrieve the temperatures array
 * if it has been previously calculated, it retuns it. Otherwise it will
 * calculate the values returning them inside an object:
 * first: readings[0] - first position of array
 * last: readings[readings.length -1] - last position of the array
 * high: Math.max(...readings) - highest (maximum) value of the array
 * low: Math.min(...readings) - lowest (minimum) value of the array
 * average: readings.reduce(....) /readings.length - average (sum then division) value of the array
 * Also it will calculate the historical average of the city
 */
export function getTemperatureSummary(
  date: Date,
  city: string,
): TemperatureSummary | null {
  //add here your code
  if (
    typeof temperatures[city] !== 'undefined' &&
    typeof temperatures[city]['dates'][date.getTime()] !== 'undefined'
  ) {
    temperatures[city]['histAvg'] /= temperatures[city]['countedReadings']
    const day = temperatures[city]['dates'][date.getTime()]

    if (Object.keys(day.summary).length === 0) {
      const dayReadings = day.temperature
      day.summary = {
        first: dayReadings[0],
        last: dayReadings[dayReadings.length - 1],
        high: Math.max(...dayReadings),
        low: Math.min(...dayReadings),
        average: dayReadings.reduce((a, b) => a + b, 0) / dayReadings.length,
      }
    }

    console.log(
      `${city} historical lowest temperature is ${temperatures[city]['histLow']}`,
    )
    console.log(
      `${city} historical highest temperature is ${temperatures[city]['histHigh']}`,
    )
    console.log(
      `${city} historical average temperature is ${temperatures[city]['histAvg']}`,
    )

    return day.summary
  } else return null
}
