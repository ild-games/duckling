Feature: Color Theme Switch

    People like customizing tools that they use frequently.
    Also, perhaps more importantly, themes allow you to 'set your own contrast'.

    Starting users with positive interactions helps to spread the love.

    Scenario: Present from the very beginning
        When a user opens the application
        Then the user can see the change-theme widget

    Scenario: Present during normal operation
        Given a project is open
        When the user opens a project
        Then I can see the change-theme widget
