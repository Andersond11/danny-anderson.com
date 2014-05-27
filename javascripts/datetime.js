(function() {
  this.DateTime = (function() {
    function DateTime() {}

    DateTime.formatTime = function(date) {
      var am_or_pm, d, hours, hrs, min_prefix, mins, minutes;
      d = new Date(date);
      hours = d.getHours();
      minutes = d.getMinutes();
      am_or_pm = hours > 12 ? 'pm' : 'am';
      hrs = hours % 12;
      min_prefix = minutes < 10 ? '0' : '';
      mins = min_prefix + minutes;
      return hrs + ":" + mins + am_or_pm;
    };

    DateTime.formatDate = function(date) {
      var d, months, _date, _month, _year;
      months = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
      d = new Date(date);
      _date = d.getDate();
      _month = d.getMonth();
      _year = d.getFullYear();
      return _date + " " + months[_month] + " " + _year;
    };

    return DateTime;

  })();

}).call(this);
