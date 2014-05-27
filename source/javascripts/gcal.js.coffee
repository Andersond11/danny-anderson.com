class @GCal
  constructor: (calendar) ->
    @calendar = calendar

  allEvents: () ->
    gcal_url = "http://www.google.com/calendar/feeds/" + @calendar + "/public/full?orderby=starttime&sortorder=ascending&alt=json"
    $.getJSON gcal_url, (data) ->
      displayEntry entry for entry in data.feed.entry

  displayEntry = (entry) ->
    data =
      title: entry.title.$t
      start_time: DateTime.formatTime(entry.gd$when[0].startTime)
      end_time:   DateTime.formatTime(entry.gd$when[0].endTime)
      start_date: DateTime.formatDate(entry.gd$when[0].startTime)
      end_date:   DateTime.formatDate(entry.gd$when[0].endTime)
      where: entry.gd$where[0].valueString

    html = HandlebarsTemplates['show'](data)
    $("#shows").append(html)

