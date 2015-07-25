import oauth2 as oauth
import urllib2 as urllib

# See assignment1.html instructions or README for how to get these credentials

api_key = "MNpmyWfqMv8qCXXWhIlAG84Ok"
api_secret = "CS7POWUkMHsHcPgzVCQMtCIb7Vu47vuHHodPrXPe32ag7TIwmp"
access_token_key = "3278872357-tvBraRyprrRID0hBI1SvIROb4UjnYE9m39lVMhf"
access_token_secret = "p8no5D84NDYJ2NXWI8DVRmwkY7YFIglB3KssasN5ky9tS"

_debug = 0

oauth_token    = oauth.Token(key=access_token_key, secret=access_token_secret)
oauth_consumer = oauth.Consumer(key=api_key, secret=api_secret)

signature_method_hmac_sha1 = oauth.SignatureMethod_HMAC_SHA1()

http_method = "GET"


http_handler  = urllib.HTTPHandler(debuglevel=_debug)
https_handler = urllib.HTTPSHandler(debuglevel=_debug)

'''
Construct, sign, and open a twitter request
using the hard-coded credentials above.
'''
def twitterreq(url, method, parameters):
  req = oauth.Request.from_consumer_and_token(oauth_consumer,
                                             token=oauth_token,
                                             http_method=http_method,
                                             http_url=url, 
                                             parameters=parameters)

  req.sign_request(signature_method_hmac_sha1, oauth_consumer, oauth_token)

  headers = req.to_header()

  if http_method == "POST":
    encoded_post_data = req.to_postdata()
  else:
    encoded_post_data = None
    url = req.to_url()

  opener = urllib.OpenerDirector()
  opener.add_handler(http_handler)
  opener.add_handler(https_handler)

  response = opener.open(url, encoded_post_data)

  return response
  # url = "https://stream.twitter.com/1.1/statuses/filter.json?delimited=length&track=twitterapi"
  # url = "https://api.twitter.com/1.1/geo/search.json?query=Toronto"
  # url = "https://api.twitter.com/1.1/geo/search.json?lat=37.78&long=-122.40"
  # url = "https://api.twitter.com/1.1/geo/search.json?granularity=city&lat=37.774546&long=-122.433523"
def fetchsamples():
  url = "https://stream.twitter.com/1/statuses/sample.json"
  parameters = []
  response = twitterreq(url, "GET", parameters)
  for line in response:
    print line.strip()

if __name__ == '__main__':
  fetchsamples()
