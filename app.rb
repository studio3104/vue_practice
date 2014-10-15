require 'sinatra/base'
require 'slim'

class App < Sinatra::Base
  configure do
    Slim::Engine.default_options[:pretty] = true
    set :root, File.dirname(__FILE__)
  end

  configure :development do
    require 'sinatra/reloader'
    register Sinatra::Reloader
    set :show_exception, false
    set :show_exception, :after_handler
  end

  get '/' do
    slim :index
  end
end
