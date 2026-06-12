import styled from 'styled-components';
import Reveal from './anim/Reveal';

export const Page = styled.main`
  width: 100%;
  min-height: 100vh;
  padding: 140px 0 120px;
  position: relative;

  @media (max-width: 768px) {
    padding: 110px 0 80px;
  }
`;

// Anchored section used to stack the whole portfolio onto one continuous page.
export const Section = styled.section`
  width: 100%;
  position: relative;
  padding: 100px 0;
  scroll-margin-top: 80px;

  @media (max-width: 768px) {
    padding: 64px 0;
  }
`;

export const Container = styled.div`
  width: 100%;
  max-width: var(--maxw);
  margin: 0 auto;
  padding: 0 32px;

  @media (max-width: 768px) {
    padding: 0 20px;
  }
`;

export const Eyebrow = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-family: ${(p) => p.theme.fontMono};
  font-size: 0.8rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: ${(p) => p.theme.highlight};
  margin-bottom: 18px;

  &::before {
    content: '';
    width: 28px;
    height: 1px;
    background: ${(p) => p.theme.highlight};
  }
`;

export const PageTitle = styled.h2`
  font-size: clamp(2.6rem, 6vw, 4.6rem);
  font-weight: 700;
  color: ${(p) => p.theme.textLightSlate};
  margin: 0 0 18px;
  letter-spacing: -0.03em;
`;

export const Lead = styled.p`
  font-size: clamp(1.05rem, 2vw, 1.25rem);
  color: ${(p) => p.theme.textSlate};
  max-width: 680px;
  line-height: 1.7;
`;

const HeaderWrap = styled.div`
  position: relative;
`;

const GhostNum = styled.span`
  position: absolute;
  top: -0.5em;
  right: 0;
  z-index: 0;
  font-family: ${(p) => p.theme.fontDisplay};
  font-size: clamp(7rem, 15vw, 14rem);
  font-weight: 700;
  line-height: 1;
  color: transparent;
  -webkit-text-stroke: 1.2px ${(p) => p.theme.borderStrong};
  opacity: 0.7;
  pointer-events: none;
  user-select: none;

  @media (max-width: 768px) {
    font-size: 6rem;
    top: -0.35em;
    opacity: 0.4;
  }
`;

const HeaderInner = styled.div`
  position: relative;
  z-index: 1;
`;

export const PageHeader = ({ eyebrow, title, lead, index, align = 'left' }) => (
  <Reveal style={{ textAlign: align, marginBottom: '64px' }}>
    <HeaderWrap>
      {index && <GhostNum>{index}</GhostNum>}
      <HeaderInner>
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <PageTitle className="grad-text" style={{ display: 'inline-block' }}>
          {title}
        </PageTitle>
        {lead && (
          <Lead style={{ marginLeft: align === 'center' ? 'auto' : 0, marginRight: align === 'center' ? 'auto' : 0 }}>
            {lead}
          </Lead>
        )}
      </HeaderInner>
    </HeaderWrap>
  </Reveal>
);

export const Card = styled.div`
  position: relative;
  background: ${(p) => p.theme.lightNavy};
  border: 1px solid var(--border);
  border-radius: ${(p) => p.theme.borderRadius};
  padding: 28px;
  overflow: hidden;
  transition: transform 0.5s var(--ease), border-color 0.5s var(--ease), box-shadow 0.5s var(--ease);

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    padding: 1px;
    background: ${(p) => p.theme.gradient};
    -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    opacity: 0;
    transition: opacity 0.5s var(--ease);
    pointer-events: none;
  }

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 30px 60px -20px rgba(0, 0, 0, 0.6);
  }
  &:hover::before { opacity: 1; }
`;
