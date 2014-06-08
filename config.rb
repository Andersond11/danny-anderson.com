## Pdfmaker custom extension
require 'makepdf'

###
# Blog settings
###

activate :blog do |blog|
  blog.prefix = "blog"

  blog.tag_template = "blog/tag.html"
  blog.calendar_template = "blog/calendar.html"

end

page "/feed.xml", :layout => false
page "/resume.html", :layout => false

# Google Analytics Configuration
activate :google_analytics do |ga|
  ga.tracking_id = 'UA-10430809-1' # Replace with your property ID.
end

# Clean URLs
activate :directory_indexes

ready do
  # Handlebar precompile
  require 'handlebars_assets'  
  sprockets.append_path HandlebarsAssets.path  
end


# Methods defined in the helpers block are available in templates
helpers do
  def nav_active(page)
    current_page.url == page ? {:class => "active"} : {}
  end

  def page_name
    page = current_page.url.gsub(/\//, '')
    if page == ''
      page = 'index'
    end
    page
  end

  def display_date(date)
    # Change this if you prefer another date format:
    # http://www.ruby-doc.org/stdlib-1.9.3/libdoc/date/rdoc/Date.html#method-i-strftime
    if date.is_a?(Date)
      date.strftime("%e %B %Y")
    else
      date
    end
  end

  def display_age(birthday)
    now = Date.today
    now.year - birthday.year - (Date.new(now.year, birthday.month, birthday.day) > now ? 1 : 0)
  end
end

# Sprockets
activate :sprockets
set :css_dir, 'stylesheets'
set :js_dir, 'javascripts'
set :images_dir, 'images'

# Build-specific configuration
configure :build do
  # For example, change the Compass output style for deployment
  activate :minify_css
  
  # Minify Javascript on build
  activate :minify_javascript
  
  # Enable cache buster
  # activate :cache_buster
  
  # Use relative URLs
  activate :relative_assets
  
  # Compress PNGs after build
  # First: gem install middleman-smusher
  # require "middleman-smusher"
  # activate :smusher
  
  # Or use a different image path
  # set :http_path, "/Content/images/"

  # Disable this if you don't want PDF generation
  activate :pdfmaker
end
