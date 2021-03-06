module.exports = {
  calculateStart: calculateStart,
  calculateStartHour: calculateStartHour,
  calculateEnd: calculateEnd,
  calculateEndHour: calculateEndHour,
  calculateTimelineItem: calculateTimelineItem,
  calculateTimelineXAxis: calculateTimelineXAxis,
}

var _ = require('underscore')
var moment = require('moment')
var PomodoroUtils = require('../../../shared/PomodoroUtils')
var NumberUtils = require('../../../shared/NumberUtils')

var hourFormat = 'HH:mm'

function calculateStart(data){
  data = _.isArray(data) ? data : [data]
  return _.min(data, function(value, key, list){
    return new Date(value.startedAt)
  }).startedAt
}

function calculateStartHour(data){
  return moment(calculateStart(data)).startOf('hour').format(hourFormat)
}

function calculateEnd(data){
  data = _.isArray(data) ? data : [data]
  return _.max(data, function(value, key, list){
    return new Date(value.startedAt)
  }).startedAt
}

function calculateEndHour(data){
  return moment(calculateEnd(data)).endOf('hour').add(1,'minute').format(hourFormat)
}

function calculateTimelineItem(pomodoro, data, canvasWidth){
  canvasWidth = canvasWidth || 1000
  var pomodoroStart = moment(calculateStart(pomodoro)).unix()
  var timelineStart = moment(calculateStart(data)).startOf('hour').unix()
  var timelineEnd = moment(calculateEnd(data)).endOf('hour').add(1,'minute').unix()
  var timelineInMinutes = calculateTimelineInMinutes(timelineStart, timelineEnd)

  var pomodoroDurationInMinutes = PomodoroUtils.calculateDurationInMinutes(pomodoro)
  var pomodoroDurationInPercent = NumberUtils.limitDecimals(pomodoroDurationInMinutes * 100 / timelineInMinutes)
  var r = NumberUtils.limitDecimals(pomodoroDurationInPercent / 2)
  var x = NumberUtils.limitDecimals(percentualValue(timelineStart, timelineEnd, pomodoroStart) + r)
  var className = pomodoro.type
  r = NumberUtils.limitDecimals(r / 100 * canvasWidth, 2)
  x = NumberUtils.limitDecimals(x / 100 * canvasWidth, 2)

  return {
    x: x,
    r: r,
    className: className
  }
}

function calculateTimelineXAxis(data, canvasWidth){
  return []
}





function calculateTimelineInMinutes(start,end){
  return parseInt((end - start) / 60 , 10)
}

function percentualValue(min,max,value){
  var normalizedMax = max - min
  var normalizedValue = value - min

  var percent = (normalizedValue/normalizedMax) * 100
  percent = NumberUtils.limitDecimals(percent, 2)
  return percent
}
