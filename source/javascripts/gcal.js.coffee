# GCal uses the google feeds API to pull event data from a calendar and
# display it using a Handlebars template.
class @GCal

  # Constructor
  # calendar - String = name of the calendar to pull events from
  #
  constructor: (calendar) ->
    @calendar = calendar

  # Display events in the 
  #
  # append_to     - String  - CSS selector to append event to
  # template      - String  - Name of the handlebars template to use 
  #                           to display each event
  # limit         - Integer - Max number of events to return - defaults
  #                           to 25
  # future_events - Boolean - only return events in the future?
  # 
  allEvents: (append_to = '#events', template = 'event', limit = 25, future_events = true) ->
    gcal_url = "http://www.google.com/calendar/feeds/" + @calendar + "/public/full?orderby=starttime&sortorder=ascending&futureevents=#{future_events}&max-results=#{limit}&alt=json"
    $.getJSON gcal_url, (data) ->
      displayEntry append_to, template, entry for entry in data.feed.entry

  # Displays a particular event by appending the show.hbs template
  # to the html node matched by the append_to css selector
  #
  # Formats dates and times with the DateTime class
  #
  # append_to - String - CSS selector to append event to
  # entry    - event data to use in the show template
  #
  displayEntry = (append_to, template, entry) ->
    data =
      title: entry.title.$t
      start_time: DateTime.formatTime(entry.gd$when[0].startTime)
      end_time:   DateTime.formatTime(entry.gd$when[0].endTime)
      start_date: DateTime.formatDate(entry.gd$when[0].startTime)
      end_date:   DateTime.formatDate(entry.gd$when[0].endTime)
      where: entry.gd$where[0].valueString

    html = HandlebarsTemplates[template](data)
    $(append_to).append(html)

