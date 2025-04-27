# Arun Boddapati Portfolio

A modern, responsive portfolio website built with React and styled-components, featuring a clean dark theme with navy blues and teal highlights.

## Features

- **Modern Design**: Clean, responsive layout with a consistent dark theme
- **Interactive Elements**: Hover effects, flip cards, and other interactive components
- **Comprehensive Sections**: Home, About, Career (Education & Experience), Skills, Strengths, Projects, Publications, and Contact
- **Documentation**: Complete MkDocs documentation for setup, development, and deployment

## Live Demo

Visit the live portfolio at [https://arunbodd.github.io/Portfolio](https://arunbodd.github.io/Portfolio)

## Installation

### As a Template

Clone the repository to use as a template for your own portfolio:

```bash
git clone https://github.com/arunbodd/Portfolio.git
cd Portfolio
npm install
npm start
```

### As an npm Package

You can also install this portfolio as an npm package to use its components:

```bash
npm install @arunbodd/portfolio
```

## Usage as a Package

```javascript
import { PageContainer, Title, TimelineList, TimelineItem } from '@arunbodd/portfolio';

function MyComponent() {
  return (
    <PageContainer>
      <Title>My Custom Page</Title>
      <TimelineList>
        <TimelineItem>
          {/* Your content here */}
        </TimelineItem>
      </TimelineList>
    </PageContainer>
  );
}
```

## Documentation

Comprehensive documentation is available at [https://arunbodd.github.io/Portfolio/](https://arunbodd.github.io/Portfolio/)

To run the documentation locally:

```bash
mkdocs serve
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in development mode at [http://localhost:3000](http://localhost:3000)

### `npm run build`

Builds the app for production to the `build` folder

### `npm run deploy`

Deploys the app to GitHub Pages

### `npm run publish-package`

Publishes the package to GitHub Packages

## Customization

1. Update content in the `src/pages/` directory
2. Modify styling in the styled-components within each file
3. Add or replace images in the `src/assets/` directory

## Technologies Used

- React
- styled-components
- react-router-dom
- react-icons
- GitHub Pages
- MkDocs with Material theme
- GitHub Actions for CI/CD

## License

MIT
