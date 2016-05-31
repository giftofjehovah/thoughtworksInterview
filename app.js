'use strict'

class Hotel {
  constructor (name, rating, regularPrice, rewardsPrice) {
    this.name = name
    this.rating = rating
    this.regular = regularPrice
    this.rewards = rewardsPrice
  }
}

class App {
  constructor (hotels) {
    this.hotels = hotels
  }

  parseInput (input) {
    const data = input.split(':')
    const typeOfCustomer = data[0]
    const datesData = data[1]
    const dates = datesData.split(/[()]+/)
    let days = dates.filter((date, i) => {
      if (i % 2 !== 0) return true
    })
    days = this.checkWeekendOrWeekday(days)
    return {
      typeOfCustomer: typeOfCustomer,
      days: days
    }
  }

  checkWeekendOrWeekday (days) {
    const newDays = days.map((day) => {
      switch (day) {
        case 'sat':
          return 'weekend'
        case 'sun':
          return 'weekend'
        default:
          return 'weekday'
      }
    })
    return newDays
  }

  findHotelRates (input) {
    const inputData = this.parseInput(input)
    let hotelsRates = {}
    this.hotels.forEach((hotel) => {
      hotelsRates[hotel.name] = 0
    })

    this.hotels.forEach((hotel, i) => {
      inputData.days.forEach((day) => {
        if (inputData.typeOfCustomer === 'Regular') {
          if (day === 'weekday') {
            hotelsRates[hotel.name] += hotel.regular.weekday
          } else {
            hotelsRates[hotel.name] += hotel.regular.weekend
          }
        } else {
          if (day === 'weekday') {
            hotelsRates[hotel.name] += hotel.rewards.weekday
          } else {
            hotelsRates[hotel.name] += hotel.rewards.weekend
          }
        }
      })
    })
    return hotelsRates
  }

  findCheapestHotel (input) {
    const hotelsRates = this.findHotelRates(input)
    let hotelsRatesArray = []
    for (let key in hotelsRates) {
      let hotel = {
        name: key,
        rates: hotelsRates[key]
      }
      hotelsRatesArray.push(hotel)
    }

    let sortedArray = hotelsRatesArray.sort((a, b) => {
      return a.rates - b.rates
    })

    const lowestPriceHotels = sortedArray.filter((hotel) => {
      return hotel.rates === sortedArray[0].rates
    })

    let bestHotel = this.hotels[0]
    if (lowestPriceHotels.length > 1) {
      lowestPriceHotels.forEach((hotelData) => {
        this.hotels.forEach((hotel) => {
          if (hotelData.name === hotel.name) {
            if (hotel.rating > bestHotel.rating) bestHotel = hotelData
          }
        })
      })
    } else {
      bestHotel = lowestPriceHotels[0]
    }
    return bestHotel.name
  }
}

const lakewood = new Hotel('Lakewood', 3, {weekday: 110, weekend: 90}, {weekday: 80, weekend: 80})
const bridgewood = new Hotel('Bridgewood', 4, {weekday: 160, weekend: 60}, {weekday: 110, weekend: 50})
const ridgewood = new Hotel('Ridgewood', 5, {weekday: 220, weekend: 150}, {weekday: 100, weekend: 40})
const app = new App([lakewood, bridgewood, ridgewood])
// app.findCheapestHotel('Regular: 16Mar2009(mon), 17Mar2009(tue), 18Mar2009(wed)')
// app.findCheapestHotel('Rewards: 26Mar2009(thur), 27Mar2009(fri), 28Mar2009(sat)')
module.exports = app
