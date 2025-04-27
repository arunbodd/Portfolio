# Development

This page provides documentation on the development workflow and best practices for maintaining and extending the portfolio website.

## Development Workflow

### Local Development

1. Start the development server:
   ```bash
   npm start
   ```

2. The site will be available at [http://localhost:3000](http://localhost:3000) with hot-reloading enabled.

3. Make changes to the code and see them reflected in real-time in your browser.

### Code Organization

The codebase follows these organization principles:

- **Component-Based Architecture**: Each UI element is a reusable React component
- **Page Components**: Each page is a separate component in the `src/pages/` directory
- **Styled Components**: Styling is done using styled-components, with styles defined alongside components
- **Consistent Theming**: A central theme defines colors, spacing, and typography

### Adding New Pages

To add a new page to the portfolio:

1. Create a new component in the `src/pages/` directory
2. Add the route to the new page in `src/App.js`
3. Add a link to the new page in the navigation component (`src/components/Navbar.js`)

Example of adding a new page:

```javascript
// 1. Create src/pages/NewPage.js
import React from 'react';
import styled from 'styled-components';

const PageContainer = styled.div`
  padding: 2rem;
`;

const NewPage = () => {
  return (
    <PageContainer>
      <h1>New Page</h1>
      <p>Content for the new page...</p>
    </PageContainer>
  );
};

export default NewPage;

// 2. Add route in App.js
import NewPage from './pages/NewPage';

// Inside the Routes component
<Route path="/new-page" element={<NewPage />} />

// 3. Add link in Navbar.js
<NavItem>
  <NavLink to="/new-page">New Page</NavLink>
</NavItem>
```

## Testing

### Manual Testing

Before deploying changes, manually test the following:

1. All navigation links work correctly
2. All external links open in a new tab
3. The site is responsive and looks good on different screen sizes
4. All interactive elements (buttons, cards, etc.) function as expected

### Cross-Browser Testing

Test the portfolio in multiple browsers to ensure compatibility:

- Chrome
- Firefox
- Safari
- Edge

## Performance Optimization

### Image Optimization

Optimize images before adding them to the portfolio:

1. Resize images to appropriate dimensions
2. Compress images to reduce file size
3. Consider using WebP format for better compression

### Code Splitting

Use React's lazy loading and Suspense for code splitting:

```javascript
import React, { lazy, Suspense } from 'react';

const HeavyComponent = lazy(() => import('./HeavyComponent'));

function MyComponent() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HeavyComponent />
    </Suspense>
  );
}
```

## Styling Guidelines

### Theme Usage

Always use theme variables for consistent styling:

```javascript
import styled from 'styled-components';

const StyledComponent = styled.div`
  color: ${props => props.theme.colors.primary};
  padding: ${props => props.theme.spacing.medium};
  font-size: ${props => props.theme.typography.fontSize.medium};
`;
```

### Responsive Design

Use media queries for responsive design:

```javascript
const ResponsiveComponent = styled.div`
  width: 100%;
  
  @media (min-width: ${props => props.theme.breakpoints.tablet}) {
    width: 50%;
  }
  
  @media (min-width: ${props => props.theme.breakpoints.desktop}) {
    width: 33%;
  }
`;
```

## Documentation

### Code Documentation

Document your code with clear comments:

- Use JSDoc comments for functions and components
- Explain complex logic
- Document props for components

### Updating This Documentation

When making significant changes to the portfolio:

1. Update the relevant documentation files in the `docs/` directory
2. Build and deploy the updated documentation
