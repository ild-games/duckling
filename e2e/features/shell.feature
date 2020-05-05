Feature: Shell

    A shell component that houses the application contents

    Scenario: Opening the application shows the project list
        When I open the application
        Then I can see the project list
