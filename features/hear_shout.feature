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

    @focus
    Scenario: Listener is out of range
      Given the range is 100
      And people are located at
        | name      | Sean  | Larry |
        | location  | 0     | 150   |
      When Sean shouts
      Then Larry should not hear a shout

  Rule: Listener should be able to hear multiple shouts

    Scenario: Two shouts
      Given a person named Sean
      And a person named Lucy
      When Sean shouts "Free bagels!"
      When Sean shouts "Free toast!"
      Then Lucy hears the following messages:
        | Free bagels! |
        | Free toast!  |

  Rule: Maximum length of message is 180 characters

    Scenario: Message is too long
      Given a person named Sean
      And a person named Lucy
      When Sean shouts the following message
        """
        This is a crazy long and meaningless paragraph used to 
        demonstrate the use of doc string.  I am going to keep
        typing until the paragraph is five lines long to make 
        sure we have exceeded the 180 characters count to proof
        that doc strings can be used in such casesl
        """
      Then Lucy should not hear a shout