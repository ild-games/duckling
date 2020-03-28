# features/calculator.feature
Feature: Shell

    A shell component that houses the application contents

    Scenario: Opening the application shows the project list
        Given the application is opened
        Then the project list is shown
