var TimelineUtils = require('./TimelineUtils')

var expect = require('chai').expect

describe('TimelineUtils', function () {
  var data = [{
    startedAt: "Sat Jul 04 2015 17:34:00 GMT+0200 (CEST)",
    minutes: 25
  },{
    startedAt: "Sat Jul 04 2015 18:15:00 GMT+0200 (CEST)",
    minutes: 5
  },{
    startedAt: "Sat Jul 04 2015 18:17:00 GMT+0200 (CEST)",
    cancelledAt: "Sat Jul 04 2015 18:20:00 GMT+0200 (CEST)",
    minutes: 15
  }]

  it('returns undefined for an empty list', function () {
    expect( TimelineUtils.getStart([]) ).to.eql( undefined )
  })

  it('calculates the start time', function () {
    expect( TimelineUtils.getStart(data) ).to.eql( data[0].startedAt )
  })

  it('calculates the start time in hour format', function () {
    expect( TimelineUtils.getStartHour(data) ).to.match( /(17\:00|15\:00)/ )
  })
  
  it('calculates the end time', function () {
    expect( TimelineUtils.getEnd(data) ).to.eql( data[data.length-1].startedAt )
  })

  it('calculates the end time in hour format', function () {
    expect( TimelineUtils.getEndHour(data) ).to.match( /(19\:00|17\:00)/ )
  })

  it('can be used to get the start time from a single item', function () {
    expect( TimelineUtils.getStart(data[0]) ).to.eql( data[0].startedAt )
  })

  it('can be used to get the end time from a single item', function () {
    expect( TimelineUtils.getEnd(data[0]) ).to.eql( data[0].startedAt )
  })

  describe('timeline rendering data', function () {
    it('calculates the horizontal position', function () {
      expect( TimelineUtils.getTimelineItemRenderingData(data[0], data).x ).to.eql( '28.1%' )
      expect( TimelineUtils.getTimelineItemRenderingData(data[1], data).x ).to.eql( '61.99%' )
      expect( TimelineUtils.getTimelineItemRenderingData(data[2], data).x ).to.eql( '63.64%' )
    })

    it('calculates the radius', function () {
      expect( TimelineUtils.getTimelineItemRenderingData(data[0], data).r ).to.eql( 30.9 )
      expect( TimelineUtils.getTimelineItemRenderingData(data[1], data).r ).to.eql( 13.81 )
      expect( TimelineUtils.getTimelineItemRenderingData(data[2], data).r ).to.eql( 10.7 )
    })
  })

})
