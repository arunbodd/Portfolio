# Career

This page provides documentation for the Career section of my portfolio website.

## Overview

The Career page presents a unified view of my professional journey, combining both Education and Experience sections into a single cohesive timeline. This approach creates a streamlined user experience by presenting my complete professional development in one place.

## Page Structure

The Career page includes:

- A vertical timeline layout for both Education and Experience sections
- Interactive flip cards showing company logos on the front and details on the back
- Concise paragraphs describing professional experiences (instead of bullet points)
- Icons to distinguish between Education and Experience sections
- Metadata with icons for date and location
- External links to projects with hover effects

## Implementation Details

The Career page is implemented as a React component using styled-components for styling. It maintains the consistent dark theme with navy blues and teal highlights that is used throughout the portfolio.

### Key Components

- `PageContainer`: Wrapper component that provides consistent padding and layout
- `CareerContainer`: Container specific to the Career page content
- `Title`: Styled heading component
- `SectionTitle`: Subheading for Experience and Education sections
- `TimelineList`: Container for the timeline items
- `TimelineItem`: Individual item in the timeline
- `FlipCard`: Interactive card component with front and back sides

## Data Structure

The Career page uses two main data arrays:

1. `experiences`: An array of objects containing professional experience data
2. `education`: An array of objects containing educational background data

Each object includes properties such as:
- `title`: Position title or degree
- `company`/`institution`: Where the experience/education took place
- `date`: Time period
- `location`: Geographic location
- `description`: Details about the experience/education
- `logo`: Path to the company/institution logo
- `link`: URL to related project or institution (if applicable)

## Design Inspiration

The vertical timeline design was inspired by the reference website [Yaswini Neelamraju's portfolio](https://yaseswinineelamraju.netlify.app/cv/), adapted to match the existing color scheme and interactive elements of my portfolio.
