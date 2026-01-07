# Macro Extended Extension

A SillyTavern extension that adds powerful macro functions to enhance control over character portrayal, actions, and narrative flow.

## Features

This extension provides two new macro functions that allow you to detect who sent the last message in the chat:

- **`isLastMessageFromUser`** - Returns `true` if the last message is from the user
- **`isLastMessageFromChar`** - Returns `true` if the last message is from the character

## Installation

1. **Install the Extension:**
   - In the Extension tab, click on ``Install Extension`` and enter ``https://github.com/NotRealPaz/MacroExtended-Extension``
2. Enable **Experimental Macro Engine** in SillyTavern settings

For more information about macros, visit the [SillyTavern Macros Documentation](https://docs.sillytavern.app/usage/core-concepts/macros/)

## Example Use Cases

### Skip Turn Detection
```Handlebars
{{ if isLastMessageFromUser }}
[The character responds to the user's input]
{{ else if isLastMessageFromChar }}
[The {{user}} decided to skip their turn. Continue the scene]
{{ /if }}
```

## Macro Details

### `isLastMessageFromUser`

- **Category:** Chat
- **Returns:** Boolean (`true`/`false`)
- **Description:** Returns `true` if the last message in the chat is from the user

### `isLastMessageFromChar`

- **Category:** Chat
- **Returns:** Boolean (`true`/`false`)
- **Description:** Returns `true` if the last message in the chat is from the character

## Technical Notes

- Conditional Macros requires ``staging`` branch of SillyTavern.

## Version

Current version: **1.0.0**

## Author

Created by **NotRealPaz**

## License

See [LICENSE](LICENSE) file for details.
