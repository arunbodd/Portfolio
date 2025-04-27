# Publications

This page provides documentation for the Publications section of my portfolio website.

## Overview

The Publications page showcases my academic and professional publications, including research papers, articles, and other scholarly works. This section demonstrates my contributions to the field and academic expertise.

## Page Structure

The Publications page includes:

- Publication entries with titles, authors, and publication details
- Brief abstracts or descriptions of each publication
- Links to full papers or publisher websites
- Citation information in a standard format
- Filtering or categorization options (if applicable)
- Consistent styling with the portfolio's dark theme

## Implementation Details

The Publications page is implemented as a React component using styled-components for styling. It maintains the consistent dark theme with navy blues and teal highlights that is used throughout the portfolio.

### Key Components

- `PageContainer`: Wrapper component that provides consistent padding and layout
- `PublicationsContainer`: Container specific to the Publications page content
- `Title`: Styled heading component
- `PublicationList`: Container for publication entries
- `PublicationItem`: Individual publication entry
- `PublicationTitle`: Title of the publication
- `PublicationAuthors`: List of authors
- `PublicationDetails`: Journal, conference, or publication venue information
- `PublicationAbstract`: Brief summary of the publication
- `PublicationLinks`: Links to full text or publisher site

## Data Structure

The Publications page uses a data structure that defines each publication:

```javascript
const publicationsData = [
  {
    title: "Publication Title",
    authors: ["Author 1", "Author 2", "Author 3"],
    venue: "Journal/Conference Name, Year",
    abstract: "Brief summary of the publication...",
    doi: "10.xxxx/xxxxx",
    link: "https://doi.org/10.xxxx/xxxxx",
    citation: "Author 1, Author 2, Author 3. (Year). Publication Title. Journal/Conference Name, Volume(Issue), pages."
  },
  // Additional publications...
];
```

Each publication includes:
- `title`: The title of the publication
- `authors`: Array of author names
- `venue`: Publication venue information
- `abstract`: Brief summary of the publication
- `doi`: Digital Object Identifier (if applicable)
- `link`: URL to the full publication
- `citation`: Formatted citation for the publication

## Customization

To update the Publications page content:

1. Navigate to `src/pages/Publications.js`
2. Modify the publications data structure to add or update publications
3. Ensure links to publications are current and functional
