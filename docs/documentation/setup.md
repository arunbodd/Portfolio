# Setup

This page provides documentation on how to set up and configure the portfolio website locally.

## Prerequisites

Before setting up the portfolio, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14.0.0 or higher)
- [npm](https://www.npmjs.com/) (v6.0.0 or higher)
- [Git](https://git-scm.com/)

## Installation

Follow these steps to set up the portfolio locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/arunbodd/Portfolio.git
   cd Portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open your browser and navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

The portfolio is organized with the following structure:

```
Portfolio/
├── public/               # Public assets
├── src/                  # Source code
│   ├── assets/           # Images, icons, and other static assets
│   ├── components/       # Reusable React components
│   ├── pages/            # Page components
│   ├── styles/           # Global styles and theme
│   ├── App.js            # Main application component
│   └── index.js          # Entry point
├── docs/                 # Documentation (MkDocs)
├── package.json          # Project dependencies and scripts
└── README.md             # Project overview
```

## Configuration

### Customizing Content

To customize the content of the portfolio:

1. Update page components in the `src/pages/` directory
2. Modify data structures within each page component to reflect your information
3. Replace images in the `src/assets/` directory with your own

### Styling

The portfolio uses styled-components for styling. To customize the appearance:

1. Update theme variables in `src/styles/theme.js`
2. Modify component styles within each component file

## Dependencies

The portfolio relies on the following key dependencies:

- [React](https://reactjs.org/) - Frontend library
- [styled-components](https://styled-components.com/) - CSS-in-JS styling
- [react-router-dom](https://reactrouter.com/) - Routing
- [react-icons](https://react-icons.github.io/react-icons/) - Icon library
- [gh-pages](https://github.com/tschaub/gh-pages) - GitHub Pages deployment
