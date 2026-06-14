import React, { useRef } from 'react';
import styled from 'styled-components';
import QRCode from 'react-qr-code';
import { FaShareAlt } from 'react-icons/fa';

const QRCodeContainer = styled.div`
  background: ${props => props.theme.background};
  color: ${props => props.theme.textSlate};
  padding: 160px calc((100vw - 1000px) / 2) 100px;
  min-height: 100vh;

  @media screen and (max-width: 1000px) {
    padding: 130px 24px 80px;
  }
`;

const QRCodeWrapper = styled.div`
  max-width: 600px;
  margin: 0 auto;
  background-color: ${props => props.theme.lightNavy};
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 40px;
  box-shadow: 0 30px 60px -25px rgba(0, 0, 0, 0.7);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  
  @media screen and (max-width: 768px) {
    padding: 30px 20px;
  }
`;

const Heading = styled.h1`
  color: ${props => props.theme.textLightSlate};
  font-size: 2rem;
  margin-bottom: 20px;
`;

const Description = styled.p`
  margin-bottom: 30px;
  line-height: 1.6;
  max-width: 500px;
`;

const QRCodeBox = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 30px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 20px;
  
  @media screen and (max-width: 480px) {
    flex-direction: column;
  }
`;

const Button = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  background-color: ${props => props.theme.highlight};
  color: ${props => props.theme.navy};
  padding: 8px 16px;
  border-radius: 25px;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.85rem;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  
  svg {
    font-size: 0.9rem;
  }
  
  &:hover {
    background-color: ${props => props.theme.highlightTint};
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15);
  }
  
  &:active {
    transform: translateY(0);
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  }
`;

const PortfolioURL = styled.div`
  margin-top: 15px;
  background-color: ${props => props.theme.navy};
  padding: 10px 15px;
  border-radius: 4px;
  font-family: monospace;
  font-size: 0.9rem;
  word-break: break-all;
`;

const QRCodePage = () => {
  const qrCodeRef = useRef(null);
  
  const portfolioUrl = "https://arunbodd.bio/";
  
  const sharePortfolio = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Arun Boddapati Portfolio',
          text: 'Check out my portfolio!',
          url: portfolioUrl,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(portfolioUrl);
      alert('Portfolio URL copied to clipboard!');
    }
  };
  
  return (
    <QRCodeContainer>
      <QRCodeWrapper>
        <Heading>Portfolio QR Code</Heading>
        <Description>
          Scan this QR code to visit my portfolio on your mobile device, 
          or share it with others at networking events.
        </Description>
        
        <QRCodeBox ref={qrCodeRef}>
          <QRCode 
            value={portfolioUrl} 
            size={200}
            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
            fgColor="#0a1430"
            bgColor="white"
          />
        </QRCodeBox>
        
        <PortfolioURL>{portfolioUrl}</PortfolioURL>
        
        <ButtonsContainer>
          <Button onClick={sharePortfolio}>
            <FaShareAlt /> Share Portfolio
          </Button>
        </ButtonsContainer>
      </QRCodeWrapper>
    </QRCodeContainer>
  );
};

export default QRCodePage;
