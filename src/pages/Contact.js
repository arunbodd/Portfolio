import React, { useState } from 'react';
import styled from 'styled-components';
import { FaEnvelope, FaLinkedin, FaTwitter, FaGithub, FaMapMarkerAlt } from 'react-icons/fa';

const ContactContainer = styled.div`
  background: #0a192f;
  color: #8892b0;
  padding: 100px calc((100vw - 1200px) / 2);
  min-height: 80vh;
  
  @media screen and (max-width: 768px) {
    padding: 80px 24px;
  }
`;

const ContactWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
`;

const SectionTitle = styled.h2`
  color: #ccd6f6;
  font-size: 32px;
  margin-bottom: 16px;
  position: relative;
  
  &:before {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 70px;
    height: 3px;
    background: #64ffda;
  }
`;

const ContactContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 50px;
  margin-top: 40px;
  
  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const ContactText = styled.p`
  font-size: 18px;
  line-height: 1.6;
  margin-bottom: 30px;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  
  svg {
    color: #64ffda;
    font-size: 24px;
    margin-right: 15px;
  }
`;

const ContactLink = styled.a`
  color: #ccd6f6;
  text-decoration: none;
  transition: color 0.3s ease;
  
  &:hover {
    color: #64ffda;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  margin-top: 30px;
`;

const SocialLink = styled.a`
  color: #ccd6f6;
  font-size: 24px;
  margin-right: 20px;
  transition: all 0.3s ease;
  
  &:hover {
    color: #64ffda;
    transform: translateY(-3px);
  }
`;

const FormContainer = styled.div`
  background: #112240;
  padding: 30px;
  border-radius: 5px;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  color: #ccd6f6;
  margin-bottom: 8px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #8892b0;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.05);
  color: #e6f1ff;
  font-size: 16px;
  
  &:focus {
    outline: none;
    border-color: #64ffda;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px;
  border: 1px solid #8892b0;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.05);
  color: #e6f1ff;
  font-size: 16px;
  min-height: 150px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: #64ffda;
  }
`;

const SubmitButton = styled.button`
  background: transparent;
  color: #64ffda;
  padding: 12px 30px;
  border: 1px solid #64ffda;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(100, 255, 218, 0.1);
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const SuccessMessage = styled.div`
  background: rgba(100, 255, 218, 0.1);
  color: #64ffda;
  padding: 15px;
  border-radius: 4px;
  margin-top: 20px;
  text-align: center;
`;

const ErrorMessage = styled.div`
  background: rgba(255, 100, 100, 0.1);
  color: #ff6464;
  padding: 15px;
  border-radius: 4px;
  margin-top: 20px;
  text-align: center;
`;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }, 1500);
  };
  
  return (
    <ContactContainer id="contact">
      <ContactWrapper>
        <SectionTitle>Get In Touch</SectionTitle>
        
        <ContactContent>
          <ContactInfo>
            <ContactText>
              I'm currently open to new opportunities and collaborations in bioinformatics, 
              genomics, and machine learning. Feel free to reach out if you have a question, 
              project idea, or just want to connect!
            </ContactText>
            
            <ContactItem>
              <FaEnvelope />
              <ContactLink href="mailto:contact@arunboddapati.com">
                contact@arunboddapati.com
              </ContactLink>
            </ContactItem>
            
            <ContactItem>
              <FaLinkedin />
              <ContactLink href="https://linkedin.com/in/arunboddapati" target="_blank" rel="noopener noreferrer">
                linkedin.com/in/arunboddapati
              </ContactLink>
            </ContactItem>
            
            <ContactItem>
              <FaGithub />
              <ContactLink href="https://github.com/arunbodd" target="_blank" rel="noopener noreferrer">
                github.com/arunbodd
              </ContactLink>
            </ContactItem>
            
            <ContactItem>
              <FaMapMarkerAlt />
              <span>Washington, D.C. Metro Area</span>
            </ContactItem>
            
            <SocialLinks>
              <SocialLink href="https://github.com/arunbodd" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <FaGithub />
              </SocialLink>
              <SocialLink href="https://linkedin.com/in/arunboddapati" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <FaLinkedin />
              </SocialLink>
              <SocialLink href="https://twitter.com/arunbodd" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <FaTwitter />
              </SocialLink>
              <SocialLink href="mailto:contact@arunboddapati.com" aria-label="Email">
                <FaEnvelope />
              </SocialLink>
            </SocialLinks>
          </ContactInfo>
          
          <FormContainer>
            <form onSubmit={handleSubmit}>
              <FormGroup>
                <Label htmlFor="name">Name</Label>
                <Input 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={formData.name}
                  onChange={handleChange}
                  required 
                />
              </FormGroup>
              
              <FormGroup>
                <Label htmlFor="email">Email</Label>
                <Input 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={formData.email}
                  onChange={handleChange}
                  required 
                />
              </FormGroup>
              
              <FormGroup>
                <Label htmlFor="subject">Subject</Label>
                <Input 
                  type="text" 
                  id="subject" 
                  name="subject" 
                  value={formData.subject}
                  onChange={handleChange}
                  required 
                />
              </FormGroup>
              
              <FormGroup>
                <Label htmlFor="message">Message</Label>
                <TextArea 
                  id="message" 
                  name="message" 
                  value={formData.message}
                  onChange={handleChange}
                  required 
                />
              </FormGroup>
              
              <SubmitButton type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </SubmitButton>
              
              {submitStatus === 'success' && (
                <SuccessMessage>
                  Your message has been sent successfully! I'll get back to you soon.
                </SuccessMessage>
              )}
              
              {submitStatus === 'error' && (
                <ErrorMessage>
                  There was an error sending your message. Please try again later.
                </ErrorMessage>
              )}
            </form>
          </FormContainer>
        </ContactContent>
      </ContactWrapper>
    </ContactContainer>
  );
};

export default Contact;
