import os

api_token = os.environ.get("API_TOKEN")
api_url_base = 'https://api.themoviedb.org/3'
account_id = 21363465
headers = {'Content-Type':'application/json',
           'Authorization':'Bearer {0}'.format(api_token)}

unauthorised_api_token = 'eyJhbGciOiJIUzI1NiJ9'
unauthorised_headers = {'Content-Type':'application/json',
                        'Authorization':'Bearer {0}'.format(unauthorised_api_token)}
