$ ->
  allShows()

allShows = () ->
  user = "and.danny@gmail.com"
  gcal_url = "http://www.google.com/calendar/feeds/" + user + "/public/full?orderby=starttime&sortorder=ascending&alt=json"
  $.getJSON gcal_url, (data) ->
    displayShow entry for entry in data.feed.entry

displayShow = (entry) ->
  data =
    title: entry.title.$t
    start_time: formatTime(entry.gd$when[0].startTime)
    end_time:   formatTime(entry.gd$when[0].endTime)
    start_date: formatDate(entry.gd$when[0].startTime)
    end_date:   formatDate(entry.gd$when[0].endTime)
    where: entry.gd$where[0].valueString
  
  html = HandlebarsTemplates['show'](data)
  $("#shows").append(html)

formatTime = (date) ->
  d = new Date date
  hours = d.getHours()
  minutes = d.getMinutes()
  am_or_pm = if hours > 12 then 'pm' else 'am'
  hrs = hours % 12
  min_prefix = if minutes < 10 then '0' else ''
  mins =  min_prefix + minutes
  hrs + ":" + mins + am_or_pm

formatDate = (date) ->
  months = new Array("January", "February", "March",
    "April", "May", "June", "July", "August", "September",
    "October", "November", "December")

  d      = new Date date
  _date  = d.getDate()
  _month = d.getMonth()
  _year  = d.getFullYear()

  _date + " " + months[_month] + " " + _year
