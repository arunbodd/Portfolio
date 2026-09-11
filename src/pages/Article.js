import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { Container } from '../components/ui';
import { SERIES, bySlug, isSeries, neighbours, posts } from './writing/posts';

const PUB = process.env.PUBLIC_URL || '';

const Section = styled.section`
  padding: 120px 0 96px;
  @media (max-width: 768px) { padding: 104px 0 64px; }
`;

/* Reading measure. The site container is 1360px wide; prose needs ~68ch. */
const Wrap = styled.div`
  max-width: 760px;
  margin: 0 auto;
`;

const Crumb = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: ${(p) => p.theme.fontMono};
  font-size: 0.74rem;
  letter-spacing: 0.06em;
  color: ${(p) => p.theme.textMuted};
  margin-bottom: 34px;
  transition: color 0.3s var(--ease);
  &:hover { color: ${(p) => p.theme.highlight}; }
`;

const Head = styled.header`
  margin-bottom: 44px;
  padding-bottom: 32px;
  border-bottom: 1px solid var(--border);

  .series {
    font-family: ${(p) => p.theme.fontMono};
    font-size: 0.7rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: ${(p) => p.theme.highlight};
    margin: 0 0 14px;
    span { color: ${(p) => p.theme.textMuted}; letter-spacing: 0.08em; text-transform: none; }
  }
  h1 {
    font-family: ${(p) => p.theme.fontDisplay};
    font-size: clamp(2.1rem, 5.4vw, 3.4rem);
    font-weight: 700;
    line-height: 1.06;
    letter-spacing: -0.03em;
    margin: 0 0 18px;
    text-wrap: balance;
  }
  .meta {
    display: flex;
    flex-wrap: wrap;
    gap: 8px 18px;
    font-family: ${(p) => p.theme.fontMono};
    font-size: 0.74rem;
    color: ${(p) => p.theme.textSlate};
    .by { color: ${(p) => p.theme.textLightSlate}; }
  }
  .tags { display: flex; flex-wrap: wrap; gap: 7px; margin-top: 16px; }
  .tags span {
    font-family: ${(p) => p.theme.fontMono};
    font-size: 0.66rem;
    color: ${(p) => p.theme.accent2};
    background: ${(p) => p.theme.accent2Tint};
    border-radius: 999px;
    padding: 3px 10px;
  }
`;

/* Everything Markdown emits lands inside .prose. Styled here rather than via
   per-element component overrides so the cascade is in one place. */
const Prose = styled.div`
  color: ${(p) => p.theme.textSlate};
  font-size: 1.04rem;
  line-height: 1.78;

  > * + * { margin-top: 1.25em; }

  /* Only clear the bottom margin the global stylesheet gives <p>. Setting
     margin: 0 here would out-specify the sibling rule above (0,1,1 vs 0,1,0)
     and collapse paragraph spacing to nothing. */
  p { margin-bottom: 0; }
  strong { color: ${(p) => p.theme.textLightSlate}; font-weight: 600; }
  em { color: ${(p) => p.theme.textLightSlate}; }

  a {
    color: ${(p) => p.theme.highlight};
    text-decoration: underline;
    text-decoration-color: ${(p) => p.theme.highlightTint};
    text-underline-offset: 3px;
    transition: text-decoration-color 0.3s var(--ease);
    &:hover { text-decoration-color: ${(p) => p.theme.highlight}; }
  }

  h2, h3 {
    font-family: ${(p) => p.theme.fontDisplay};
    color: ${(p) => p.theme.textWhite};
    letter-spacing: -0.02em;
    line-height: 1.2;
    scroll-margin-top: 96px;
    text-wrap: balance;
  }
  h2 { font-size: 1.62rem; margin-top: 2.6em; }
  h3 { font-size: 1.22rem; margin-top: 2em; }
  h2 + *, h3 + * { margin-top: 0.9em; }

  ul, ol { padding-left: 1.35em; }
  li + li { margin-top: 0.45em; }
  li::marker { color: ${(p) => p.theme.highlight}; }

  hr {
    border: 0;
    height: 1px;
    background: var(--border);
    margin: 3em 0;
  }

  /* TL;DR and other asides */
  blockquote {
    margin: 2em 0;
    padding: 22px 26px;
    border-left: 2px solid ${(p) => p.theme.highlight};
    border-radius: 0 ${(p) => p.theme.borderRadius} ${(p) => p.theme.borderRadius} 0;
    background: ${(p) => p.theme.cardBackground};
    font-size: 0.97rem;
    > * + * { margin-top: 0.8em; }
    p:first-child strong:first-child {
      font-family: ${(p) => p.theme.fontMono};
      font-size: 0.72rem;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: ${(p) => p.theme.highlight};
    }
    ul { padding-left: 1.2em; }
  }

  figure {
    margin: 2.4em 0;
    img {
      display: block;
      width: 100%;
      height: auto;
      border-radius: 12px;
      border: 1px solid var(--border);
      background: #fff;
    }
    figcaption {
      margin-top: 10px;
      font-family: ${(p) => p.theme.fontMono};
      font-size: 0.72rem;
      line-height: 1.5;
      color: ${(p) => p.theme.textMuted};
    }
  }

  /* GFM footnotes */
  sup a[data-footnote-ref] {
    font-family: ${(p) => p.theme.fontMono};
    font-size: 0.68rem;
    text-decoration: none;
    padding-left: 2px;
    color: ${(p) => p.theme.highlight};
  }
  section[data-footnotes] {
    margin-top: 4em;
    padding-top: 2em;
    border-top: 1px solid var(--border);
    font-size: 0.86rem;
    line-height: 1.6;
    color: ${(p) => p.theme.textSlate};
    h2 {
      font-size: 0.72rem;
      font-family: ${(p) => p.theme.fontMono};
      letter-spacing: 0.16em;
      text-transform: uppercase;
      color: ${(p) => p.theme.highlight};
      margin: 0 0 1.2em;
    }
    ol { padding-left: 1.6em; }
    li { padding-left: 0.3em; }
    li + li { margin-top: 0.55em; }
    li p { display: inline; }
    a[data-footnote-backref] { text-decoration: none; margin-left: 6px; }
    a { word-break: break-word; }
  }

  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.9rem;
    display: block;
    overflow-x: auto;
    th, td { padding: 8px 12px; border-bottom: 1px solid var(--border); text-align: left; }
    th { color: ${(p) => p.theme.textLightSlate}; font-weight: 600; }
    td { font-variant-numeric: tabular-nums; }
  }
`;

const Nav = styled.nav`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-top: 64px;
  padding-top: 28px;
  border-top: 1px solid var(--border);
  @media (max-width: 560px) { grid-template-columns: 1fr; }

  a {
    display: flex;
    flex-direction: column;
    gap: 6px;
    padding: 18px 20px;
    border: 1px solid var(--border);
    border-radius: ${(p) => p.theme.borderRadius};
    background: ${(p) => p.theme.cardBackground};
    transition: border-color 0.3s var(--ease);
    &:hover { border-color: ${(p) => p.theme.highlight}; }
    &.next { text-align: right; align-items: flex-end; }
  }
  .l {
    display: inline-flex; align-items: center; gap: 7px;
    font-family: ${(p) => p.theme.fontMono};
    font-size: 0.66rem; letter-spacing: 0.12em; text-transform: uppercase;
    color: ${(p) => p.theme.textMuted};
  }
  .t {
    font-family: ${(p) => p.theme.fontDisplay};
    font-weight: 600;
    color: ${(p) => p.theme.textLightSlate};
    font-size: 0.98rem;
  }
`;

const State = styled.div`
  padding: 40px 0;
  color: ${(p) => p.theme.textSlate};
  font-size: 0.95rem;
  a { color: ${(p) => p.theme.highlight}; }
`;

const Skeleton = styled.div`
  display: flex; flex-direction: column; gap: 14px;
  span {
    display: block; height: 14px; border-radius: 6px;
    background: ${(p) => p.theme.cardBackground};
    border: 1px solid var(--border);
  }
  span:nth-child(3n) { width: 82%; }
  span:nth-child(3n+1) { width: 96%; }
  span:nth-child(3n+2) { width: 90%; }
`;

const Figure = ({ src, alt }) => (
  <figure>
    <img src={src.startsWith('/') ? `${PUB}${src}` : src} alt={alt || ''} loading="lazy" />
    {alt && <figcaption>{alt}</figcaption>}
  </figure>
);

const components = {
  img: Figure,
  // react-markdown wraps a lone image in <p>; unwrap so <figure> isn't inside <p>.
  p: ({ node, children, ...rest }) => {
    const only = node?.children?.length === 1 && node.children[0].tagName === 'img';
    return only ? <>{children}</> : <p {...rest}>{children}</p>;
  },
  a: ({ node, href = '', children, ...rest }) => {
    const ext = /^https?:\/\//.test(href);
    return (
      <a href={href} {...rest} {...(ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
        {children}
      </a>
    );
  },
};

const Article = () => {
  const { slug } = useParams();
  const post = bySlug(slug);
  const [md, setMd] = useState(null);
  const [err, setErr] = useState(null);

  useEffect(() => {
    if (!post) return undefined;
    let alive = true;
    setMd(null); setErr(null);
    fetch(`${PUB}/content/writing/${slug}.md`)
      .then((r) => (r.ok ? r.text() : Promise.reject(new Error(`HTTP ${r.status}`))))
      .then((t) => { if (alive) setMd(t); })
      .catch((e) => { if (alive) setErr(e.message); });
    return () => { alive = false; };
  }, [slug, post]);

  const series = post ? isSeries(post) : false;

  useEffect(() => {
    const base = 'Arun Boddapati';
    if (!post) document.title = `Not found | ${base}`;
    else document.title = series ? `${post.title} · ${SERIES.name} ${post.n} | ${base}` : `${post.title} | ${base}`;
    return () => { document.title = `${base} | AI / ML Data Science Lead`; };
  }, [post, series]);

  if (!post) {
    return (
      <Section>
        <Container>
          <Wrap>
            <Crumb to="/writing"><FaArrowLeft /> Writing</Crumb>
            <State>That article doesn’t exist. <Link to="/writing">Back to Writing.</Link></State>
          </Wrap>
        </Container>
      </Section>
    );
  }

  const { prev, next } = series ? neighbours(slug) : { prev: null, next: null };
  const total = String(posts.length).padStart(2, '0');

  return (
    <Section>
      <Container>
        <Wrap>
          <Crumb to="/writing"><FaArrowLeft /> Writing</Crumb>

          <Head>
            <p className="series">
              {series
                ? <>{SERIES.name} · Issue {post.n} of {total} <span>— {SERIES.tagline}</span></>
                : <>{post.kind}</>}
            </p>
            <h1 className="grad-text">{post.title}</h1>
            <div className="meta">
              <span className="by">Arun Kumar Boddapati</span>
              <span>{post.dateLabel}</span>
              <span>{post.readingMinutes} min read</span>
              {post.note && <span>{post.note}</span>}
            </div>
            <div className="tags">{post.tags.map((t) => <span key={t}>{t}</span>)}</div>
          </Head>

          {err && (
            <State>Couldn’t load this article ({err}). <Link to="/writing">Back to Writing.</Link></State>
          )}
          {!err && md === null && (
            <Skeleton aria-hidden="true">{Array.from({ length: 12 }).map((_, i) => <span key={i} />)}</Skeleton>
          )}
          {md !== null && (
            <Prose>
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                remarkRehypeOptions={{ footnoteLabel: 'References', footnoteLabelProperties: {} }}
                components={components}
              >
                {md}
              </ReactMarkdown>
            </Prose>
          )}

          {(prev || next) && (
            <Nav aria-label="Series navigation">
              {prev ? (
                <Link to={`/writing/${prev.slug}`}>
                  <span className="l"><FaArrowLeft /> Previous · Issue {prev.n}</span>
                  <span className="t">{prev.title}</span>
                </Link>
              ) : <span />}
              {next && (
                <Link to={`/writing/${next.slug}`} className="next">
                  <span className="l">Next · Issue {next.n} <FaArrowRight /></span>
                  <span className="t">{next.title}</span>
                </Link>
              )}
            </Nav>
          )}
        </Wrap>
      </Container>
    </Section>
  );
};

export default Article;
