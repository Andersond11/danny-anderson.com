class @DateTime

  @formatTime: (date) ->
    d = new Date date
    hours = d.getHours()
    minutes = d.getMinutes()
    am_or_pm = if hours > 12 then 'pm' else 'am'
    hrs = @convert_military_hours(hours)
    min_prefix = if minutes < 10 then '0' else ''
    mins =  min_prefix + minutes
    hrs + ":" + mins + am_or_pm

  @formatDate: (date) ->
    months = new Array("January", "February", "March",
      "April", "May", "June", "July", "August", "September",
      "October", "November", "December")

    d      = new Date date
    _date  = d.getDate()
    _month = d.getMonth()
    _year  = d.getFullYear()

    _date + " " + months[_month] + " " + _year

  @convert_military_hours: (hours) ->
    if (hours == 0) then 12 else if (hours <= 12) then hours else hours % 12
