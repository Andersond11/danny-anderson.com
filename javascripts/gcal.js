(function() {
  this.GCal = (function() {
    var displayEntry;

    function GCal(calendar) {
      this.calendar = calendar;
    }

    GCal.prototype.allEvents = function(append_to, template, limit, future_events) {
      var gcal_url;
      if (append_to == null) {
        append_to = '#events';
      }
      if (template == null) {
        template = 'event';
      }
      if (limit == null) {
        limit = 25;
      }
      if (future_events == null) {
        future_events = true;
      }
      gcal_url = "http://www.google.com/calendar/feeds/" + this.calendar + ("/public/full?orderby=starttime&sortorder=ascending&futureevents=" + future_events + "&max-results=" + limit + "&alt=json");
      return $.getJSON(gcal_url, function(data) {
        var entry, _i, _len, _ref, _results;
        _ref = data.feed.entry;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          entry = _ref[_i];
          _results.push(displayEntry(append_to, template, entry));
        }
        return _results;
      });
    };

    displayEntry = function(append_to, template, entry) {
      var data, html;
      data = {
        title: entry.title.$t,
        start_time: DateTime.formatTime(entry.gd$when[0].startTime),
        end_time: DateTime.formatTime(entry.gd$when[0].endTime),
        start_date: DateTime.formatDate(entry.gd$when[0].startTime),
        end_date: DateTime.formatDate(entry.gd$when[0].endTime),
        where: entry.gd$where[0].valueString
      };
      html = HandlebarsTemplates[template](data);
      return $(append_to).append(html);
    };

    return GCal;

  })();

}).call(this);
