import requests
import time

from behave import when,then
from assertions.http_assertions import assert_2xx
from hamcrest import assert_that,has_item,not_none
from utils.constants import api_url_base,headers,account_id


@when("the user selects to rate {movie_title}")
def select_movie(context,movie_title):
    matching_movie = next(filter(lambda m:m["title"] == movie_title,context.top_rated_movies["results"]),None)
    assert_that(matching_movie,not_none())
    context.movie_id = matching_movie["id"]


@when("the user rates the movie with a {vote_value:d}")
def vote_movie(context,vote_value):
    api_url = api_url_base + f'/movie/{context.movie_id}/rating'
    payload = {"value":vote_value}
    response = requests.post(api_url,json=payload,headers=headers)
    assert_2xx(response)
    context.vote = response.json()


@then("the movie {movie_title} is in the user's rated movies with a value of {vote_value:d}")
def assert_movie_added_to_rated_with_value(context,movie_title,vote_value):
    api_url = api_url_base + '/account/{account_id}/rated/movies'
    time.sleep(3)  # Wait for the rating to be persisted
    response = requests.get(api_url,headers=headers)
    assert_2xx(response)
    user_rated_movies = response.json()
    assert_that(list((m["title"],m["rating"]) for m in user_rated_movies["results"]),has_item((movie_title,vote_value)))
