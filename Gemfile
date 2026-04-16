source "https://rubygems.org"

# GitHub Pages gem includes Jekyll and compatible plugins
gem "github-pages", group: :jekyll_plugins

# Additional plugins for enhanced functionality
group :jekyll_plugins do
  gem "jekyll-seo-tag"
  gem "jekyll-sitemap"
  gem "jekyll-feed"
end

# Windows and JRuby does not include zoneinfo files
gem "tzinfo-data", platforms: [:mingw, :mswin, :x64_mingw, :jruby]

# Performance-booster for watching directories on Windows
gem "wdm", "~> 0.1.1", :platforms => [:mingw, :x64_mingw, :mswin]

# Lock `http_parser.rb` gem to `v0.6.x` on JRuby builds
gem "http_parser.rb", "~> 0.6.0", :platforms => [:jruby]
