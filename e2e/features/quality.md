Quality Requirements
------------------------

As we specify different components, 
there are a lot of common features we want each component to support, 
`(e.g. search capability, 'can be triggered by keyboard', etc.)`
but specifying the test for the component features muddies everything.

In other words, cross-cutting features -- how to test.

Not sure if tags can have arguments, but if so,
then we could have something like
`@has-default-keyboard-shortcut('ctrl+c')`

## Undecided


Note that these should only be used where that 
aspect of the functionality is important, from a behavior side.
> e.g. ctrl+c --> copy is important enough for something like "compatibility"


Well what are some things I would want to tag?
* `@default-keyboard-shortcut('ctrl+c')`
* `@command-pallete() // A `
* `@command-pallete({ short: 'u' }) // A `

So then I might say something like 

```
@cross-cutting
Feature: Standard Command

    Users should be able to access commands through 
    a variety of methods, which should scale in difficulty
    and specificity.

    Using duckling should feel like learning to use a power saw:
    exiciting, and the feeling of being invited to build 
    magical things. But at the same time, understanding the
    power the machine, and the teachings of time hold.
    Imbuing users with a sense of their own smallness in 
    comparison to the never-ending wonder of knowledge.

    The most general entry point to operations within the 
    application (the knowledge in question here) should 
    allow users to quickly get started with a piece of
    functionality.

    Following a pattern from (technical documentation)[https://www.writethedocs.org/videos/eu/2017/the-four-kinds-of-documentation-and-why-you-need-to-understand-what-they-are-daniele-procida/]
    We should have 


    Scenario: Can be triggered by command wheel

    Scenario: Can be triggered from masthead search
    
    Scenario: Can be added directly to the masthead



```
