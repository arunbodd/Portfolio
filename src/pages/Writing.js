import React from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { FaExternalLinkAlt, FaArrowRight } from 'react-icons/fa';
import Reveal from '../components/anim/Reveal';
import { Container, PageHeader } from '../components/ui';
import { SERIES, posts, briefs, external } from './writing/posts';

const Section = styled.section`
  padding: 130px 0 100px;
  @media (max-width: 768px) { padding: 110px 0 70px; }
`;

/* The series is the spine of this page, so it gets a framed rail with its own
   header rather than sitting in the same flat list as the standalone pieces. */
const SeriesHead = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 14px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--border);
  margin-bottom: 4px;

  h3 {
    font-family: ${(p) => p.theme.fontDisplay};
    font-size: 1.35rem;
    font-weight: 700;
    color: ${(p) => p.theme.textWhite};
    margin: 0;
    letter-spacing: -0.02em;
  }
  .count {
    font-family: ${(p) => p.theme.fontMono};
    font-size: 0.72rem;
    color: ${(p) => p.theme.highlight};
    background: ${(p) => p.theme.highlightTint};
    border-radius: 999px;
    padding: 4px 11px;
  }
  p {
    flex-basis: 100%;
    margin: 6px 0 0;
    color: ${(p) => p.theme.textSlate};
    font-size: 0.94rem;
    max-width: 68ch;
  }
`;

const Issue = styled(Link)`
  display: grid;
  grid-template-columns: 62px 1fr auto;
  gap: 24px;
  align-items: start;
  padding: 26px 0;
  border-bottom: 1px solid var(--border);

  &:hover .t, &:hover .go { color: ${(p) => p.theme.highlight}; }

  .num {
    font-family: ${(p) => p.theme.fontDisplay};
    font-size: 1.9rem;
    font-weight: 700;
    line-height: 1;
    color: transparent;
    -webkit-text-stroke: 1px var(--border-strong);
    font-variant-numeric: tabular-nums;
  }
  .t {
    font-family: ${(p) => p.theme.fontDisplay};
    font-size: 1.24rem;
    font-weight: 600;
    color: ${(p) => p.theme.textWhite};
    margin: 0 0 4px;
    line-height: 1.3;
    transition: color 0.3s var(--ease);
  }
  .when {
    font-family: ${(p) => p.theme.fontMono};
    font-size: 0.71rem;
    color: ${(p) => p.theme.textMuted};
    margin: 0 0 10px;
  }
  .sum {
    color: ${(p) => p.theme.textSlate};
    font-size: 0.92rem;
    margin: 0 0 12px;
    max-width: 66ch;
    line-height: 1.65;
  }
  .go {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    font-family: ${(p) => p.theme.fontMono};
    font-size: 0.72rem;
    color: ${(p) => p.theme.textMuted};
    white-space: nowrap;
    padding-top: 5px;
    transition: color 0.3s var(--ease);
  }

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
    gap: 8px;
    .num { font-size: 1.4rem; }
    .go { padding-top: 0; }
  }
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
  span {
    font-family: ${(p) => p.theme.fontMono};
    font-size: 0.66rem;
    color: ${(p) => p.theme.accent2};
    background: ${(p) => p.theme.accent2Tint};
    border-radius: 999px;
    padding: 3px 10px;
  }
`;

const Standalone = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 18px;
  margin-top: 22px;
  @media (max-width: 820px) { grid-template-columns: 1fr; }
`;

const pieceStyles = css`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 26px;
  border: 1px solid var(--border);
  border-radius: ${(p) => p.theme.borderRadius};
  background: ${(p) => p.theme.cardBackground};
  transition: border-color 0.3s var(--ease), transform 0.3s var(--ease);

  &:hover { border-color: ${(p) => p.theme.highlight}; transform: translateY(-3px); }
  &:hover h4, &:hover .go { color: ${(p) => p.theme.highlight}; }

  .kind {
    font-family: ${(p) => p.theme.fontMono};
    font-size: 0.66rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: ${(p) => p.theme.highlight};
  }
  h4 {
    font-family: ${(p) => p.theme.fontDisplay};
    font-size: 1.14rem;
    font-weight: 600;
    color: ${(p) => p.theme.textWhite};
    margin: 0;
    line-height: 1.3;
    transition: color 0.3s var(--ease);
  }
  p { color: ${(p) => p.theme.textSlate}; font-size: 0.9rem; margin: 0; line-height: 1.65; flex: 1; }
  .go {
    display: inline-flex; align-items: center; gap: 7px;
    font-family: ${(p) => p.theme.fontMono};
    font-size: 0.72rem;
    color: ${(p) => p.theme.textMuted};
    transition: color 0.3s var(--ease);
  }
`;
const PieceLink = styled(Link)`${pieceStyles}`;
const PieceExt = styled.a`${pieceStyles}`;

const SubHead = styled.h3`
  font-family: ${(p) => p.theme.fontDisplay};
  font-size: 1.35rem;
  font-weight: 700;
  color: ${(p) => p.theme.textWhite};
  letter-spacing: -0.02em;
  margin: 74px 0 0;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--border);
`;

const Writing = () => (
  <Section id="writing">
    <Container>
      <PageHeader
        index="05"
        eyebrow="Notes"
        title="Writing"
        lead="Long-form analysis of the forces reshaping computational biology — funding, compute, policy, and what they do to the work. Published here in full, free, no login."
      />

      <Reveal>
        <SeriesHead>
          <h3>{SERIES.name}</h3>
          <span className="count">{posts.length}-part series</span>
          <p>{SERIES.tagline}. {SERIES.blurb}</p>
        </SeriesHead>
      </Reveal>

      {posts.map((it) => (
        <Reveal key={it.slug}>
          <Issue to={`/writing/${it.slug}`}>
            <span className="num">{it.n}</span>
            <div>
              <h4 className="t">{it.title}</h4>
              <p className="when">
                {it.dateLabel} · {it.readingMinutes} min read{it.note ? ` · ${it.note}` : ''}
              </p>
              <p className="sum">{it.summary}</p>
              <Tags>{it.tags.map((t) => <span key={t}>{t}</span>)}</Tags>
            </div>
            <span className="go">Read <FaArrowRight /></span>
          </Issue>
        </Reveal>
      ))}

      <Reveal><SubHead>Also published</SubHead></Reveal>
      <Standalone>
        {briefs.map((b, i) => (
          <Reveal key={b.slug} delay={i * 0.08}>
            <PieceLink to={`/writing/${b.slug}`}>
              <span className="kind">{b.kind} · {b.dateLabel}</span>
              <h4>{b.title}</h4>
              <p>{b.summary}</p>
              <span className="go">Read the brief <FaArrowRight /></span>
            </PieceLink>
          </Reveal>
        ))}
        {external.map((s, i) => (
          <Reveal key={s.href} delay={(briefs.length + i) * 0.08}>
            <PieceExt href={s.href} target="_blank" rel="noopener noreferrer">
              <span className="kind">{s.kind}</span>
              <h4>{s.title}</h4>
              <p>{s.summary}</p>
              <span className="go"><FaExternalLinkAlt /> {s.cta}</span>
            </PieceExt>
          </Reveal>
        ))}
      </Standalone>
    </Container>
  </Section>
);

export default Writing;
