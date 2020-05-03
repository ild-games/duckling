Feature: Masthead

    The masthead is a user's home when they are using the application --
    comfortable and familiar, but not stiflingly so.

    The masthead should have limited means of interaction, but these interactions
    should provide the complete functionality of the application.

    The masthead should contain opportunities for lightweight customization,
    little widgets, doodads, 'desk toys' that people can play around with.

    However, if a user is trying to get a job done, and they don't have the luxury of time to
    explore the unknown, they should be able to navigate their problem without getting overwhelmed.
    Likewise, 

    Scenario: Visible on all pages
        Given the application is open
        Then the masthead should be clearly visible

    Scenario: Quick access
        Given the user is not typing something
        When the user presses the 'Alt' key
        Then the masthead recieves focus

    Scenario: Multiple result types
        Given two objects have similar names
            But have different types
        When the user searches for a term that matches one object
        Then the masthead shows results for both

    # Scenario: Allow expansion
    #     Given 
    #     When the user get 

    Scenario: Show recent items by default
        When the user focuses on the masthead
        Then the masthead shows recently chosen results

    Scenario: Search for commands by name
        When the user searches for a command
        Then the mastehead displays commands with similar names

    Scenario: Search for asset by name
        When the user searches for an asset's file name
        Then the results include files with similar names

    # Scenario: Search for sub-asset within active asset
    #     Given an asset in the project is active
    #     When the user searches for 
    #     Then

    Scenario: Context for every result
        Given the masthead shows a list of matches
        When the user hovers over a match
