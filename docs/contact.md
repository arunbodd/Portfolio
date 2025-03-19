# Contact

This page provides documentation for the Contact section of my portfolio website.

## Overview

The Contact page provides visitors with ways to get in touch with me, including a contact form, social media links, and other contact information. This section is essential for networking and professional opportunities.

## Page Structure

The Contact page includes:

- A contact form for direct messages
- Social media links with icons
- Professional profile links (LinkedIn, GitHub, etc.)
- Email contact information
- Consistent styling with the portfolio's dark theme

## Implementation Details

The Contact page is implemented as a React component using styled-components for styling. It maintains the consistent dark theme with navy blues and teal highlights that is used throughout the portfolio.

### Key Components

- `PageContainer`: Wrapper component that provides consistent padding and layout
- `ContactContainer`: Container specific to the Contact page content
- `Title`: Styled heading component
- `ContactForm`: Form component for sending messages
- `FormInput`: Styled input field
- `FormTextarea`: Styled textarea for message content
- `SubmitButton`: Button for submitting the form
- `SocialLinks`: Container for social media and professional profile links
- `SocialIcon`: Icon component for social media links

## Form Handling

The contact form uses a combination of client-side validation and a backend service for processing submissions. Options for form handling include:

1. **Email Service Integration**: Using services like EmailJS or Formspree
2. **Custom Backend**: If the portfolio has a backend server
3. **Netlify Forms**: If deployed on Netlify

Example of form validation:

```javascript
const validateForm = () => {
  let valid = true;
  const errors = {};
  
  if (!name.trim()) {
    errors.name = 'Name is required';
    valid = false;
  }
  
  if (!email.trim()) {
    errors.email = 'Email is required';
    valid = false;
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    errors.email = 'Email is invalid';
    valid = false;
  }
  
  if (!message.trim()) {
    errors.message = 'Message is required';
    valid = false;
  }
  
  setFormErrors(errors);
  return valid;
};
```

## Social Media Integration

The Contact page includes links to social media profiles and professional networks. Each link is represented by an icon and opens in a new tab when clicked.

Example of social media links implementation:

```javascript
const socialLinks = [
  {
    name: 'LinkedIn',
    icon: <FaLinkedin />,
    url: 'https://linkedin.com/in/username'
  },
  {
    name: 'GitHub',
    icon: <FaGithub />,
    url: 'https://github.com/username'
  },
  // Additional social links...
];
```

## Customization

To update the Contact page content:

1. Navigate to `src/pages/Contact.js`
2. Update social media links with your profile URLs
3. Configure the form submission handler to use your preferred service
4. Update contact information as needed
