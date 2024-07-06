Feature: The Movie DB app
  As an api user
  I want to be able to interact with The Movie DB endpoints
  So that I can find out about the best rated movies, rate a movie, etc


  Scenario: User attempts to access a non existent endpoint
    When the user attempts to call the trailer endpoint
    Then a 404 error is thrown


  Scenario: Unauthorised user attempts to retrieve top rated movies
    When the user enters incorrect credentials for top rated movies
    Then a 401 error is thrown


  Scenario: User can retrieve the top rated movies
    When the user retrieves the top rated movies
    Then the top rated movie has the highest vote average of the list


  Scenario: Unauthorised user attempts to add a rating to a movie
    When the user retrieves the top rated movies
    And the user retrieves the movie with the highest vote count
    And the user enters incorrect credentials for rating the movie with a 6
    Then a 401 error is thrown


  Scenario: User can add a rating to a movie
    When the user retrieves the top rated movies
    And the user selects to rate GoodFellas
    And the user rates the movie with a 10
    Then the movie GoodFellas is in the user's rated movies with a value of 10

    When the user selects to rate The Dark Knight
    And the user rates the movie with a 5
    Then the movie The Dark Knight is in the user's rated movies with a value of 5
    And the movie GoodFellas is in the user's rated movies with a value of 10

    When the user selects to rate GoodFellas
    And the user rates the movie with a 7
    Then the movie GoodFellas is in the user's rated movies with a value of 7
    And the movie The Dark Knight is in the user's rated movies with a value of 5


