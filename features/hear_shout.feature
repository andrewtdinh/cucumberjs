Feature: Shout

  Shouty allows users to "hear" other users "shouts" as long as they are close enough to each other.

  To do:
    - only shout to people within a certain distance

  Background: 
    Given a person named Lucy
    And a person named Sean

  Rule: Shouts can be heard by other users

    Scenario: Listener within range by default
      When Sean shouts
      Then Lucy should hear a shout

  Rule: Shouts should only be heard if listener is within range

    Scenario: Listener is within range
      Given the range is 100
      And people are located at
        | name      | Sean  | Lucy  |
        | location  | 0     | 50    |
      When Sean shouts
      Then Lucy should hear a shout

    Scenario: Listener is out of range
      Given the range is 100
      And people are located at
        | name      | Sean  | Larry |
        | location  | 0     | 150   |
      When Sean shouts
      Then Larry should not hear a shout