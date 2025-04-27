# Projects

This page provides documentation for the Projects section of my portfolio website.

## Overview

The Projects page showcases my significant professional and personal projects, highlighting my technical skills, problem-solving abilities, and creativity. This section gives visitors concrete examples of my work and capabilities.

## Page Structure

The Projects page includes:

- Project cards with visual previews
- Brief project descriptions
- Technologies used for each project
- Links to live demos and source code repositories
- Consistent styling with the portfolio's dark theme
- Interactive elements for better user engagement

## Implementation Details

The Projects page is implemented as a React component using styled-components for styling. It maintains the consistent dark theme with navy blues and teal highlights that is used throughout the portfolio.

### Key Components

- `PageContainer`: Wrapper component that provides consistent padding and layout
- `ProjectsContainer`: Container specific to the Projects page content
- `Title`: Styled heading component
- `ProjectGrid`: Grid layout for organizing project cards
- `ProjectCard`: Card component displaying individual project
- `ProjectImage`: Visual preview of the project
- `ProjectTitle`: Name of the project
- `ProjectDescription`: Brief explanation of the project
- `TechStack`: List of technologies used
- `ProjectLinks`: Container for demo and code links

## Data Structure

The Projects page uses a data structure that defines each project:

```javascript
const projectsData = [
  {
    title: "Project Name",
    description: "Brief description of the project and its purpose...",
    image: "project-image.jpg",
    technologies: ["React", "Node.js", "MongoDB"],
    demoLink: "https://project-demo-url.com",
    codeLink: "https://github.com/username/project-repo"
  },
  // Additional projects...
];
```

Each project includes:
- `title`: The name of the project
- `description`: Brief explanation of the project
- `image`: Preview image path
- `technologies`: Array of technologies used
- `demoLink`: URL to live demo (if applicable)
- `codeLink`: URL to source code repository

## Customization

To update the Projects page content:

1. Navigate to `src/pages/Projects.js`
2. Modify the projects data structure to add or update projects
3. Add project images to the `src/assets` directory
4. Update links to point to current demos and repositories
