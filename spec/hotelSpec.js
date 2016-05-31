/*globals describe, it, expect*/
const app = require('../app')
describe('Hotels', function () {
  it('Regular: 16Mar2009(mon), 17Mar2009(tue), 18Mar2009(wed)', function () {
    expect(app.findCheapestHotel('Regular: 16Mar2009(mon), 17Mar2009(tue), 18Mar2009(wed)')).toBe('Lakewood')
  })
  it('Regular: 20Mar2009(fri), 21Mar2009(sat), 22Mar2009(sun)', function () {
    expect(app.findCheapestHotel('Regular: 20Mar2009(fri), 21Mar2009(sat), 22Mar2009(sun)')).toBe('Bridgewood')
  })
  it('Rewards: 26Mar2009(thur), 27Mar2009(fri), 28Mar2009(sat)', function () {
    expect(app.findCheapestHotel('Rewards: 26Mar2009(thur), 27Mar2009(fri), 28Mar2009(sat)')).toBe('Ridgewood')
  })
})
