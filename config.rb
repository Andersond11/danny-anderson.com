###
# Blog settings
###

activate :blog do |blog|
  blog.prefix = "blog"

  blog.tag_template = "blog/tag.html"
  blog.calendar_template = "blog/calendar.html"

end

page "/feed.xml", :layout => false

activate :directory_indexes

# Methods defined in the helpers block are available in templates
helpers do
  def nav_active(page)
    current_page.url == page ? {:class => "active"} : {}
  end
end

set :css_dir, 'stylesheets'

set :js_dir, 'javascripts'

set :images_dir, 'images'

# Build-specific configuration
configure :build do
  # For example, change the Compass output style for deployment
  # activate :minify_css
  
  # Minify Javascript on build
  # activate :minify_javascript
  
  # Enable cache buster
  # activate :cache_buster
  
  # Use relative URLs
  # activate :relative_assets
  
  # Compress PNGs after build
  # First: gem install middleman-smusher
  # require "middleman-smusher"
  # activate :smusher
  
  # Or use a different image path
  # set :http_path, "/Content/images/"
end
