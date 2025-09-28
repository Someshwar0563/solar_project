# Radiwrit Solar - Next.js Application

A modern, interactive solar energy solutions website built with Next.js, React, and Tailwind CSS.

## Features

- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Dark/Light Theme**: Toggle between day and night modes
- **Interactive Calculator**: Solar savings calculator with real-time projections
- **3D Visualization**: Interactive solar house simulator (Three.js integration)
- **Chart Visualizations**: 25-year savings projection charts
- **Contact Form**: Form validation and submission handling
- **Smooth Animations**: Scroll-triggered animations and transitions

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **UI Library**: React 18.3
- **Styling**: Tailwind CSS 3.4
- **Charts**: Chart.js with react-chartjs-2
- **3D Graphics**: Three.js 0.160
- **Language**: TypeScript 5.0
- **Fonts**: Inter & Orbitron (Google Fonts)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
# or
yarn install
```

2. Run the development server:
```bash
npm run dev
# or
yarn dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
├── app/
│   ├── globals.css          # Global styles and CSS variables
│   ├── layout.tsx           # Root layout component
│   └── page.tsx             # Main page component
├── components/
│   ├── Header.tsx           # Navigation header
│   ├── Footer.tsx           # Footer component
│   ├── HomePage.tsx         # Home page content
│   ├── AboutPage.tsx        # About page content
│   ├── ServicesPage.tsx     # Services page content
│   ├── TechnologyPage.tsx   # Technology page content
│   ├── CalculatorPage.tsx   # Interactive calculator
│   └── ContactPage.tsx      # Contact form and info
├── public/                  # Static assets
├── package.json
├── tailwind.config.js
├── next.config.js
└── tsconfig.json
```

## Key Features Implementation

### Theme System
- CSS custom properties for consistent theming
- Local storage persistence
- System preference detection

### Calculator
- Real-time solar system calculations
- Interactive time-of-day slider
- Chart.js integration for savings visualization
- Form validation and error handling

### Responsive Design
- Mobile-first approach
- Collapsible navigation menu
- Flexible grid layouts
- Touch-friendly interactions

### Performance
- Dynamic imports for heavy libraries
- Optimized images and assets
- Efficient state management
- Smooth animations with CSS transitions

## Customization

### Colors
Edit the CSS custom properties in `app/globals.css`:
```css
:root {
  --accent-gold: #ffc107;
  --accent-cyan: #17a2b8;
  --accent-orange: #fd7e14;
  --accent-green: #20c997;
}
```

### Content
Update the content in individual page components located in the `components/` directory.

### Styling
Modify Tailwind classes or add custom CSS in `app/globals.css`.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

© 2025 Radiwrit Solar. All rights reserved.
