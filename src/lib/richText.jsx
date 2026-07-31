/**
 * A whitelist renderer for the three markup forms that actually appear in this
 * app's content: `**bold**`, `- ` bullets, and `1)` numbered items.
 *
 * The old ActivityDetail rendered all three as literal characters — visitors
 * saw `**Srirangam:**` on screen. The obvious fix is react-markdown, but full
 * CommonMark would start *misreading* devotional content: asterisks and
 * underscores inside transliterated names, `#` in postal addresses, and stray
 * `1.` in prose would all become unintended markup. A whitelist is both smaller
 * and safer here.
 */

const BULLET = /^-\s+/;
const NUMBERED = /^\d+[).]\s+/;

/** `**bold**` → <strong>. Everything else passes through untouched. */
function renderInline(text, keyPrefix) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
      return (
        <strong key={`${keyPrefix}-${i}`} className="font-semibold text-ink">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

/** Groups consecutive lines of the same kind into paragraphs and lists. */
function toBlocks(source) {
  const blocks = [];

  for (const raw of String(source).split('\n')) {
    const line = raw.trim();
    if (!line) continue;

    const kind = BULLET.test(line)
      ? 'ul'
      : NUMBERED.test(line)
        ? 'ol'
        : 'p';
    const content = line.replace(BULLET, '').replace(NUMBERED, '');
    const last = blocks[blocks.length - 1];

    if (kind !== 'p' && last?.kind === kind) {
      last.items.push(content);
    } else {
      blocks.push({ kind, items: [content] });
    }
  }

  return blocks;
}

export default function RichText({ children, className = '' }) {
  if (!children) return null;

  return (
    <div className={`flex flex-col gap-5 font-sans text-body-lg text-ink-muted ${className}`}>
      {toBlocks(children).map((block, b) => {
        if (block.kind === 'p') {
          return <p key={b}>{renderInline(block.items[0], `p${b}`)}</p>;
        }

        const List = block.kind === 'ul' ? 'ul' : 'ol';
        return (
          <List
            key={b}
            className={[
              'flex flex-col gap-3 pl-8',
              block.kind === 'ul'
                ? 'list-disc marker:text-saffron'
                : 'list-decimal marker:font-semibold marker:text-kumkum',
            ].join(' ')}
          >
            {block.items.map((item, i) => (
              <li key={i} className="pl-1">
                {renderInline(item, `${b}-${i}`)}
              </li>
            ))}
          </List>
        );
      })}
    </div>
  );
}
