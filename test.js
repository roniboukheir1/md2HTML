// const { default: test } = require('node:test');
const convertMarkdowntoHtml = require('./main.js');

test('converts markdown heading 1 to html', () => {
    const input = `# Heading 1`
    const expected = `<h1>Heading 1</h1>`;
    console.log(convertMarkdowntoHtml(input));
    expect(convertMarkdowntoHtml(input)).toBe(expected);
}
);

test('converts markdown heading 2 to html', () => {
    const input = `## Heading 2`
    const expected = `<h2>Heading 2</h2>`;
    expect(convertMarkdowntoHtml(input)).toBe(expected);
}
);
test('converts markdown heading 3 to html ', () => {
    const input = `### Heading 3`
    const expected = `<h3>Heading 3</h3>`;
    expect(convertMarkdowntoHtml(input)).toBe(expected);
}
);
test('converts markdown heading 4 to html', () => {
    const input = `#### Heading 4`
    const expected = `<h4>Heading 4</h4>`;
    expect(convertMarkdowntoHtml(input)).toBe(expected);
}
);
test('converts markdown heading 5 to html', () => {
    const input = `##### Heading 5`
    const expected = `<h5>Heading 5</h5>`;
    expect(convertMarkdowntoHtml(input)).toBe(expected);
}
);
test('converts markdown heading 6 to html', () => {
    const input = `###### Heading 6`
    const expected = `<h6>Heading 6</h6>`;
    expect(convertMarkdowntoHtml(input)).toBe(expected);
}
);

test('covert markdown bold to html', () => {
    const input = `**Bold**`
    const expected = `<strong>Bold</strong>`;
    expect(convertMarkdowntoHtml(input)).toBe(expected);
});

test('convert markdown bold (underscores) to html ', () => {
    const input = `__Bold__`
    const expected = `<strong>Bold</strong>`;
    expect(convertMarkdowntoHtml(input)).toBe(expected);
}
);

test('covert markdown italic to html', () => {
    const input = `*Italic*`
    const expected = `<em>Italic</em>`;
    expect(convertMarkdowntoHtml(input)).toBe(expected);
}
);

test('convert markdown italic (underscore) to html', () => {
    const input = `_Italic_`
    const expected = `<em>Italic</em>`;
    expect(convertMarkdowntoHtml(input)).toBe(expected);
}
);

test('convert markdown image to html', () => {
    const input = `![Alt text](http://url)`
    const expected = `<img src="http://url" alt="Alt text">`;
    expect(convertMarkdowntoHtml(input)).toBe(expected);
}
);

test('convert markdown link to html', () => {
    const input = `[Link](http://url)`
    const expected = `<a href="http://url">Link</a>`;
    expect(convertMarkdowntoHtml(input)).toBe(expected);
}
);

test('covert markdown list to html', () => {
    const input = `* List item 1`
    const expected = `<ul><li>List item 1</li></ul>`;
    expect(convertMarkdowntoHtml(input)).toBe(expected);
}
);