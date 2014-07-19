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

configure :build do
  activate :minify_css
  activate :minify_javascript
  activate :relative_assets
end

activate :deploy do |deploy|
  deploy.method = :git
end
