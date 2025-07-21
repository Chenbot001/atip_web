# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/e10598ff-b0b3-4522-ab0a-dd22e0f2de5c

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/e10598ff-b0b3-4522-ab0a-dd22e0f2de5c) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/e10598ff-b0b3-4522-ab0a-dd22e0f2de5c) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)

## Application Pages & Visuals

This frontend project offers a modern, interactive academic analytics platform with the following main pages and visual features:

### Home Page (`/`)
- **Hero Section**: Project title, description, and a prominent search bar for researcher lookup.
- **Database Statistics**: Visual cards showing key stats (e.g., researchers indexed, papers analyzed, venues covered).
- **Mini Bar Chart**: Publications per year, visualized as a mini bar chart.
- **Leaderboard Previews**: Card previews for top researchers in three metrics (ANCI, Acceleration, PQI), with quick links to full leaderboards.
- **Researcher Spotlight**: Highlighted researcher with badge, profile summary, and direct link to their profile.

### Leaderboards Page (`/leaderboards`)
- **Metric Tabs**: Switch between ANCI, Acceleration, and PQI leaderboards, each with a description and icon.
- **Filters & Sorting**: Filter researchers by affiliation and career stage, and sort by score.
- **Leaderboard Table**: Interactive table showing rank, author, affiliation, score, papers, citations, career length, and quick profile links. Top 3 are visually highlighted.

### Profile Page (`/profile/:id`)
- **Header Section**: Researcher name, affiliation, homepage link, career stats, and AI-generated summary.
- **Research Metrics Radar Chart**: Visualizes the researcher's scores across multiple dimensions (impact, productivity, quality, momentum, collaboration, influence).
- **Co-author Network Visualization**: Circular network graph showing main co-authors, with interactive hover details.
- **Publications List**: Sortable, expandable list of publications with venue, year, citation count, award badges, author list, and abstract.
- **Compare Button**: Quick link to compare the researcher with others (feature coming soon).

### Other Pages
- **Compare** (`/compare`): Placeholder for future researcher comparison feature.
- **Methodology** (`/methodology`): Placeholder for future methodology details.
- **Affiliations** (`/affiliations/*`): Placeholder for future institution-based browsing.
- **404 Not Found**: Friendly error page for invalid routes.

### Visual & UI Technologies
- **Component Library**: Built with shadcn-ui and Tailwind CSS for a modern, responsive design.
- **Icons**: Uses Lucide icons for visual clarity.
- **Cards, Tables, Tabs, Badges, Tooltips**: Rich UI primitives for data display and interactivity.
- **Dark Mode**: Toggle available in navigation (if enabled).
