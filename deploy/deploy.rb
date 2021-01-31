
`yarn build`

Dir["dist/*.js"].map { |e| File.basename(e) }.each do |f|
  `curl https://api.rollbar.com/api/1/sourcemap/download
    -F access_token=1509ae28262b476abb18c0056b261f5b \
    -F version=#{ENV["BUILD_ID"]} \
    -F minified_url=https://slapmyface.net/#{f}`

end
