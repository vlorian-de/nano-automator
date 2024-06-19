# Nano Automator

**Version:** 1.0.0

## Project Description

Nano Automator is a software that enables a NanoD+ device to support various functions on a computer. This software has been tested only on Windows so far, but it is planned to work on MacOS in the future.

## Prerequisites

- [AutoHotkey2](https://www.autohotkey.com/v2/) must be installed.

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

## Dependencies

- `@serialport/parser-readline` ^12.0.0
- `node-windows` ^1.0.0-beta.8
- `serialport` ^12.0.0

### Development Dependencies

- `nodemon` ^3.1.3

## License

This project is licensed under the MIT License. See the LICENSE file for more details.