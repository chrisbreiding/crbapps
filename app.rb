require 'sinatra'

helpers do
  def randpass limit = 14
    lower = 'a'..'z'
    upper = 'A'..'Z'
    nums  = 0..9
    chars = lower.to_a + upper.to_a + nums.to_a
    pass  = [lower.to_a.sample, upper.to_a.sample, nums.to_a.sample.to_s]
    limit -= 3
    limit.times do
      pass.push chars.sample
    end

    pass.shuffle.join
  end
end

get '/' do
  @title = 'Aquarium'
  @asset_path = 'aquarium'
  erb :aquarium
end

get '/randomize/?' do
  @title = 'List Randomizer'
  @asset_path = 'randomize'
  erb :randomize
end

get '/randpass/?:limit?' do |limit|
  @title = 'Random Password'
  @asset_path = nil
  @password = randpass( limit ? limit.to_i : 14 )
  erb :randpass
end

get '/scorekeeper/?' do
  @title = 'Scorekeeper'
  @asset_path = 'scorekeeper'
  erb :scorekeeper
end

get '/mobile-test/?' do
  erb :mobile_test, layout: false
end

not_found do
  @title = "Page Not Found"
  status 404
  erb :error_404
end