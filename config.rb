set :css_dir, 'stylesheets'
set :js_dir, 'javascripts'
set :images_dir, 'images'

['aquarium', 'calculator', 'randomize', 'scorekeeper', 'randpass'].each do |page|
  if page == 'calculator'
    proxy "/#{page}/index.html", "/#{page}.html", layout: false
  else
    proxy "/#{page}/index.html", "/#{page}.html"
  end
  ignore "/#{page}.html"
end

# Build-specific configuration
configure :build do
  # For example, change the Compass output style for deployment
  activate :minify_css

  # Minify Javascript on build
  # activate :minify_javascript

  # Enable cache buster
  # activate :asset_hash

  # Use relative URLs
  activate :relative_assets

  # Compress PNGs after build
  # require "middleman-smusher"
  # activate :smusher
end

activate :deploy do |deploy|
  deploy.method = :git
end
