# How to Run The Project Locally

## Prerequisites

Before running the Nuxt 3 project, ensure you have the following installed:

- **Node.js**: Download and install Node.js from [nodejs.org](https://nodejs.org/).
- **npm or Yarn**: npm comes with Node.js, but if you prefer Yarn, you can install it by following the instructions at [yarnpkg.com](https://yarnpkg.com/getting-started/install).
- **Git**: Ensure Git is installed to clone the repository. Download from [git-scm.com](https://git-scm.com/).

## Setup Instructions

### 1. Clone the Repository

Open your terminal and clone the project repository to your local machine:

```bash
git clone https://github.com/Sofialv05/todo-list-app.git
```

### 2. Setup

Make sure to install the dependencies:

```bash
# yarn
yarn install

# npm
npm install

# pnpm
pnpm install --shamefully-hoist
```

Create `.env` file and then copy the `.env.example` file to `.env` and fill in the values.

```bash
cp .env.example .env
```

### 3. Development Server

Start the development server on http://localhost:3000

```bash
npm run dev
```

### Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```
