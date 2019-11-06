const cheerio = require('cheerio');
const MarkdownItContainer = require('markdown-it-container');

const stripTags = (str, tags) => {
  const $ = cheerio.load(str, { decodeEntities: false });
  if (!tags || tags.length === 0) {
    return str;
  }
  tags = !Array.isArray(tags) ? [tags] : tags;
  let len = tags.length;
  while (len--) {
    $(tags[len]).remove();
  }
  return $.html();
};

const wrapCustomClass = render => function (...args) {
  return render(...args)
    .replace('<code class="', '<code class="hljs ')
    .replace('<code>', '<code class="hljs">');
};

const convertHtml = str => str.replace(/(&#x)(\w{4});/gi, $0 => String.fromCharCode(parseInt(encodeURIComponent($0).replace(/(%26%23x)(\w{4})(%3B)/g, '$2'), 16)));

module.exports = {
  raw: true,
  preprocess: (MarkdownIt, source) => {
    MarkdownIt.renderer.rules.table_open = function () {
      return '<table class="table">';
    };
    MarkdownIt.renderer.rules.fence = wrapCustomClass(MarkdownIt.renderer.rules.fence);

    const { code_inline } = MarkdownIt.renderer.rules;
    MarkdownIt.renderer.rules.code_inline = function (...args) {
      args[0][args[1]].attrJoin('class', 'code-inline');
      return code_inline(...args);
    };
    return source;
  },
  use: [
    [MarkdownItContainer, 'demo', {
      validate: params => params.trim().match(/^demo\s*(.*)$/),
      render(tokens, idx) {
        if (tokens[idx].nesting === 1) {
          const html = convertHtml(stripTags(tokens[idx + 1].content, 'script'));
          tokens[idx + 2].children = [];
          return `<demo-block><div slot="desc">${html}</div><div slot="highlight">`;
        }
        return '</div></demo-block>\n';
      },
    }],
  ],
};