/**
 * DateTime utility — converted from CoffeeScript to vanilla ES2020+
 * Provides date/time formatting helpers for calendar event display.
 */
class DateTime {
  static formatTime(dateStr) {
    const d = new Date(dateStr);
    const hours = d.getHours();
    const minutes = d.getMinutes();
    const amOrPm = hours >= 12 ? 'pm' : 'am';
    const hrs = DateTime.convertMilitaryHours(hours);
    const minPrefix = minutes < 10 ? '0' : '';
    const mins = minPrefix + minutes;
    return `${hrs}:${mins}${amOrPm}`;
  }

  static formatDate(dateStr) {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December',
    ];
    const d = new Date(dateStr);
    return `${months[d.getMonth()]} ${d.getDate()}`;
  }

  static convertMilitaryHours(hours) {
    if (hours === 0) return 12;
    if (hours <= 12) return hours;
    return hours % 12;
  }
}
