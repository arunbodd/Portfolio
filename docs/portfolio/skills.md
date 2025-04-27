# Skills

This page provides documentation for the Skills section of my portfolio website.

## Overview

The Skills page showcases my technical and professional competencies, organized into relevant categories. This section helps visitors quickly understand my areas of expertise and technical proficiency.

## Page Structure

The Skills page includes:

- Visual representation of skill proficiency levels
- Categorized skill sets (e.g., Programming Languages, Frameworks, Tools)
- Consistent styling with the portfolio's dark theme
- Interactive elements for better user engagement

## Implementation Details

The Skills page is implemented as a React component using styled-components for styling. It maintains the consistent dark theme with navy blues and teal highlights that is used throughout the portfolio.

### Key Components

- `PageContainer`: Wrapper component that provides consistent padding and layout
- `SkillsContainer`: Container specific to the Skills page content
- `Title`: Styled heading component
- `SkillCategory`: Section for grouping related skills
- `SkillItem`: Individual skill with visual representation of proficiency
- `ProgressBar`: Visual component showing skill level

## Data Structure

The Skills page uses a data structure that organizes skills into categories:

```javascript
const skillsData = [
  {
    category: "Programming Languages",
    skills: [
      { name: "JavaScript", level: 90 },
      { name: "Python", level: 85 },
      // Additional skills...
    ]
  },
  // Additional categories...
];
```

Each skill includes:
- `name`: The name of the skill
- `level`: Proficiency level (typically on a scale of 0-100)

## Customization

To update the Skills page content:

1. Navigate to `src/pages/Skills.js`
2. Modify the skills data structure to reflect current skills and proficiency levels
3. Adjust categories as needed to best represent skill groupings
