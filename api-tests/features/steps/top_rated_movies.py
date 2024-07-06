from behave import when,then
from assertions.http_assertions import assert_2xx
from hamcrest import assert_that, equal_to
import requests
from utils.constants import api_url_base,headers


@when("the user retrieves the top rated movies")
def retrieve_top_rated_movies(context):
    api_url = api_url_base + '/movie/top_rated'
    response = requests.get(api_url,headers=headers)
    assert_2xx(response)
    context.top_rated_movies = response.json()


@when("the user retrieves the movie with the highest vote count")
def get_highest_number_vote_movie(context):
    max_voted_movie = max(context.top_rated_movies["results"],key=lambda x:x["vote_count"])
    context.max_count_movie_id = max_voted_movie["id"]


@then("the top rated movie has the highest vote average of the list")
def get_highest_number_vote_movie(context):
    top_rated_movies = context.top_rated_movies["results"]
    sorted_top_rated_movies = sorted(top_rated_movies,key=lambda x:int(x["vote_average"]),reverse=True)
    assert_that(sorted_top_rated_movies,equal_to(top_rated_movies))
