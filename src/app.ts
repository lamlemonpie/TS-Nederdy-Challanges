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
 * Temperatures is a map of maps
 * where the key is the city that stores a map
 * where its key is the date that stores the temperatures
 * readings from that date
 */
interface Temperatures {
  [city: string]: {
    [date: string]: number[]
  }
}

const temperatures: Temperatures = {}

/**
 * processReadings will iterate from the given array and
 * store the city, time and temp inside the global Temperatures
 * map of maps.
 * If the city or time does not exist, it will initialize
 * an empty new array or object.
 * If it does exist, it will push the temperature in the array
 */
export function processReadings(readings: TemperatureReading[]): void {
  // add here your code
  readings.forEach((reading) => {
    const city = reading.city
    const time = reading.time.toDateString()
    const temp = reading.temperature

    if (typeof temperatures[city] === 'undefined') temperatures[city] = {}
    if (typeof temperatures[city][time] === 'undefined')
      temperatures[city][time] = []

    temperatures[city][time].push(temp)
  })
}
/**
 * getTemperatureSummary will sumarize the temperature from the given
 * city on the given date. If the city or the date doesn't not exist
 * it will return null.
 * If the city and date exist, it will retrieve the temperatures array
 * and calculate the values returning them inside an object:
 * first: readings[0] - first position of array
 * last: readings[readings.length -1] - last position of the array
 * high: Math.max(...readings) - highest (maximum) value of the array
 * low: Math.min(...readings) - lowest (minimum) value of the array
 * average: readings.reduce(....) /readings.length - average (sum then division) value of the array
 */
export function getTemperatureSummary(
  date: Date,
  city: string,
): TemperatureSummary | null {
  //add here your code
  if (
    typeof temperatures[city] !== 'undefined' &&
    typeof temperatures[city][date.toDateString()] !== 'undefined'
  ) {
    const readings = temperatures[city][date.toDateString()]

    return {
      first: readings[0],
      last: readings[readings.length - 1],
      high: Math.max(...readings),
      low: Math.min(...readings),
      average: readings.reduce((a, b) => a + b, 0) / readings.length,
    }
  } else return null
}
