import type { MarkdownHeading } from "astro";
import styles from "./NestedTableOfContents.module.css";

export interface TableOfContent {
  depth: number;
  slug: string;
  text: string;
  children?: TableOfContent[];
}

export default function NestedTableOfContents({
  headings,
}: {
  headings: MarkdownHeading[];
}) {
  function nestTable(toc: TableOfContent[]): TableOfContent[] {
    const nested: TableOfContent[] = [];

    if (toc.length === 0) {
      return [];
    }

    const depth = toc[0].depth;
    for (const [index, entry] of toc.entries()) {
      if (entry.depth == depth) {
        nested.push({ ...entry, children: [] });
      } else if (
        entry.depth > depth &&
        nested[nested.length - 1].children?.length == 0
      ) {
        nested[nested.length - 1].children = nestTable(toc.slice(index));
      }
    }
    return nested;
  }

  function renderTOC(toc: TableOfContent[]) {
    return (
      <ol>
        {toc.map((item) => (
          <li key={`${item.depth}/${item.slug}`}>
            <a href={`#${item.slug}`}>{item.text}</a>
            {!!item.children?.length && renderTOC(item.children)}
          </li>
        ))}
      </ol>
    );
  }

  if (headings.length === 0) return;

  const nestedTOC = nestTable(headings);

  return (
    <nav className={styles.toc} aria-label="Table of contents">
      <div className="sticky">
        <h2>On this page</h2>
        {renderTOC(nestedTOC)}
      </div>
    </nav>
  );
}
