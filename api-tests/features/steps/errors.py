from behave import when,then
import requests
from utils.constants import api_url_base,headers,unauthorised_headers
from hamcrest import assert_that,equal_to


@when("the user attempts to call the trailer endpoint")
def get_trailers(context):
    api_url = api_url_base + '/trailers'
    context.response = requests.get(api_url,headers=headers)


@then("a {status_code:d} error is thrown")
def assert_error_thrown(context,status_code):
    assert_that(context.response.status_code,equal_to(status_code))


@when("the user enters incorrect credentials for top rated movies")
def user_authentication(context):
    api_url = api_url_base + '/top_rated'
    context.response = requests.get(api_url,headers=unauthorised_headers)


@when("the user enters incorrect credentials for rating the movie with a {vote_value:d}")
def user_authentication(context,vote_value):
    api_url = api_url_base + f'/movie/{context.max_count_movie_id}/rating'
    payload = {"value":vote_value}
    context.response = requests.post(api_url,json=payload,headers=unauthorised_headers)
