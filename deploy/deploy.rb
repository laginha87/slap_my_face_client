
`yarn build`

`curl -X POST -H  -H "Content-Type: application/json" -d {"access_token":"1509ae28262b476abb18c0056b261f5b", "environment":"production", "revision":"#{ENV["BUILD_ID"]}"}' https://api.rollbar.com/api/1/deploy`
Dir["dist/*.js"].map { |e| File.basename(e) }.each do |f|
  puts `curl -X POST -H "Content-Type: application/json" -d {"access_token":"1509ae28262b476abb18c0056b261f5b", "version": "#{ENV["BUILD_ID"]}", "minified_url":"https://slapmyface.net/#{f}"}' https://api.rollbar.com/api/1/sourcemap/download`
end
