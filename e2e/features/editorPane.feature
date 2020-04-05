# Feature: EditorPane

#     The editor pane provides a single interface that allows us to edit
#     (or at least preview) a single asset within our game project.

#     If an asset type _includes_ sub-assets, the editor type corresponding to that asset
#     should provide methods to edit or preview those sub-assets.

#     These details should be specified by expanding upon the definition of a Given
#     editor type. 

#     Scenario Outline: Editor
#         Given I have opened a project
#         When I select an <object>
#         Then the main pane displays an <editorType>

#         Examples:
#             | object | editorType    |
#             | entity | entity editor |
#             | image  | image preview |
