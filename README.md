# md2HTML

`md2HTML` is a Command Line Interface (CLI) tool that converts Markdown documents into HTML. It's built with Node.js and designed to be a quick and easy tool for transforming markdown files or raw markdown strings into HTML output.

## Installation

To get started with `md2HTML`, clone this repository to your local machine using the following command:

```bash
git clone https://github.com/roniboukheir1/md2HTML.git
```

After cloning, navigate into the project directory:

```bash
cd md2HTML
```

Install the required dependencies:

```bash
npm install
```

## Usage

`md2HTML` offers flexibility in converting markdown through file inputs or direct string inputs. Below are examples of how to use it:

- **Convert a Markdown File to an HTML File**:

  To convert a markdown file to HTML and save it with the same name (but with an `.html` extension), use:

  ```bash
  node main.js -if README.md
  ```

- **Specify Output File Name**:

  If you want to specify the output file name, you can do so with the `-of` flag:

  ```bash
  node main.js -if README.md -of output.html
  ```

- **Convert Raw Markdown String**:

  To convert a raw markdown string and print the resulting HTML to the console:

  ```bash
  node main.js -i "# Hello World"
  ```

## Features

`md2HTML` supports a variety of markdown features, including:

- Headings
- Bold and italic text
- Images and links
- Unordered lists

The tool aims to provide a straightforward and efficient way to convert markdown content to HTML, directly from your command line.

## Running Tests

To run tests and ensure `md2HTML` is functioning correctly, use:

```bash
npm test
```

Make sure all development dependencies are installed before running tests.

## Contributing

Contributions to `md2HTML` are welcome! Feel free to open issues or submit pull requests on GitHub. Whether it's adding new features, fixing bugs, or improving documentation, all contributions are appreciated.

## License

This project is licensed under the ISC License - see the [LICENSE](https://github.com/roniboukheir1/md2HTML/blob/main/LICENSE) file for details.
