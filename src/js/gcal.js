/**
 * GCal — Google Calendar event display helper.
 * Converted from CoffeeScript to vanilla ES2020+.
 *
 * NOTE: The Google Calendar Feeds API (gdata v2) used in the original code
 * was shut down by Google. To restore calendar functionality, update this
 * class to use the Google Calendar API v3:
 *   https://developers.google.com/calendar/api/v3/reference/events/list
 * You will need:
 *   - A Google Cloud project with the Calendar API enabled
 *   - An API key restricted to your domain
 *   - Your calendar ID (Settings > Integrate calendar)
 */
class GCal {
  /**
   * @param {string} calendarId - Google Calendar ID
   * @param {string} apiKey     - Google Calendar API v3 key
   */
  constructor(calendarId, apiKey) {
    this.calendarId = calendarId;
    this.apiKey = apiKey;
  }

  /**
   * Fetch upcoming events and render them into the DOM.
   *
   * @param {string}  appendTo    - CSS selector of the container element
   * @param {number}  limit       - Max events to display (default 25)
   * @param {boolean} futureOnly  - Only show future events (default true)
   */
  async allEvents(appendTo = '#events', limit = 25, futureOnly = true) {
    const now = new Date().toISOString();
    const encodedId = encodeURIComponent(this.calendarId);
    const url = new URL(
      `https://www.googleapis.com/calendar/v3/calendars/${encodedId}/events`
    );
    url.searchParams.set('key', this.apiKey);
    url.searchParams.set('orderBy', 'startTime');
    url.searchParams.set('singleEvents', 'true');
    url.searchParams.set('maxResults', String(limit));
    if (futureOnly) {
      url.searchParams.set('timeMin', now);
    }

    try {
      const response = await fetch(url.toString());
      if (!response.ok) throw new Error(`Calendar API error: ${response.status}`);
      const data = await response.json();
      const container = document.querySelector(appendTo);
      if (!container) return;
      for (const item of data.items || []) {
        container.appendChild(this.renderEvent(item));
      }
    } catch (err) {
      console.error('GCal: failed to load events', err);
    }
  }

  /** @private */
  renderEvent(item) {
    const start = item.start.dateTime || item.start.date;
    const end   = item.end.dateTime   || item.end.date;

    const div = document.createElement('div');
    div.className = 'show';
    div.innerHTML = `
      <div class="when">${DateTime.formatDate(start)} <span class="faded">at</span> ${DateTime.formatTime(start)}</div>
      <div class="who">${this.escapeHtml(item.summary || '')}</div>
      <div class="where">${this.escapeHtml(item.location || '')}</div>
    `;
    return div;
  }

  /** @private */
  escapeHtml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }
}
