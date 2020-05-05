Feature: Color Theme Switch

    People like customizing tools that they use frequently.
    Also, perhaps more importantly, themes allow you to 'set your own contrast'.

    Starting users with positive interactions helps to spread the love.

    Scenario: Present from the very beginning
        When I open the application
        Then I can see the change-theme widget

    Scenario: Present during normal operation
        Given the application is open
        When I open a project
        Then I can see the change-theme widget
