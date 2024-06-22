# Nano Automator

**Version:** 1.1.0

## Project Description

Nano Automator is a software that enables a [Binaris Nano_D++](https://store.binaris.io/products/nano_d-sensory-hid) device to support various functions on a computer. This software now supports both Windows and MacOS.

## Prerequisites

- On Windows: [AutoHotkey2](https://www.autohotkey.com/v2/) must be installed.

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/vlorian-de/nano-automator.git
    ```

2. Change to the project directory:
    ```sh
    cd nano-automator
    ```

3. Install the dependencies:
    ```sh
    npm install
    ```

## Usage

The following scripts are available to start the software:

- **Start:** 
    ```sh
    npm start
    ```
    This starts the application with `node`.

- **Development:**
    ```sh
    npm run dev
    ```
    This starts the application with `nodemon` for development, which means the application will automatically restart with each change.

## Configuration

In the `config.js` file, you can easily link different combinations of trigger conditions and actions without real code modifications. The path for AutoHotkey is also set in this file.

Here is an example configuration:

```javascriptconst AUTOHOTKEY_PATH = '"C:\\Program Files\\AutoHotkey\\UX\\AutoHotkeyUX.exe"';

const MAPPINGS = [
    {
        condition: [knobTurned],
        action: setVolume
    },
    {
        condition: [keyDown(0)],
        action: lockComputer,
    },
    {
        condition: [macOS, keyDown(1)],
        action: macShortcut('Homekit - Turn office light on'),
    },
    {
        condition: [macOS, keyDown(2)],
        action: playPause,
    },
    {
        condition: [macOS, keyDown(3)],
        action: nextTrack,
    },
    {
        condition: [windows, keyDown(2)],
        action: copy,
    },
    {
        condition: [windows, keyDown(3)],
        action: paste,
    },
]
````

## Available Conditions and Actions
### Actions
|                                            | Windows | MacOS |
| ------------------------------------------ | ------- | ----- |
| copy / paste                               | ✅       |       |
| undo / redo                                | ✅       | <br>  |
| run AutoHotKey scripts                     | ✅       |       |
| play / pause                               | ✅       | ✅<br> |
| previous track                             | ⏳<br>   | ✅<br> |
| next track                                 | ⏳<br>   | ✅<br> |
| volume control                             | ✅<br>   | ✅<br> |
| run terminal command                       | ✅<br>   | ✅<br> |
| webhook                                    | ⏳       | ⏳     |
| switch nano profile                        | ⏳       | ⏳     |
| lock computer                              | ⏳       | ✅     |
| run (Siri) "shortcuts"                     |         | ✅<br> |
| control Homekit devices (with "shortcuts") |         | ✅     |

### Trigger Conditions
|                  | Windows | MacOS |
| ---------------- | ------- | ----- |
| key down         | ✅       | ✅     |
| key up           | ✅       | ✅     |
| key long press   | ⏳       | ⏳     |
| key combinations | ⏳       | ⏳     |
| knob turned      | ✅       | ✅     |
| nano profile is  | ⏳       | ⏳     |
| os is Windows    | ✅       | ✅     |
| os is macOS      | ✅       | ✅     |

✅ indicates implemented features, while ⏳ indicates features currently under development.

## Dependencies

- `@serialport/parser-readline` ^12.0.0
- `node-windows` ^1.0.0-beta.8
- `serialport` ^12.0.0

### Development Dependencies

- `nodemon` ^3.1.3

## License

This project is licensed under the MIT License. See the LICENSE file for more details.
