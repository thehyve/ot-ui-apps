# Data Metrics Plugin

This package provides React components for displaying data metrics for OTP, including summary cards, tables, and charts. The main entry point is the `DataMetricsPage` component.

## Installation

To install this package from The Hyve's GitHub npm registry, you need to configure your project to use the correct registry for the `@thehyve` scope.

### 1. Configure `.npmrc`

Create or update a `.npmrc` file in your project root with the following lines:

```ini
@thehyve:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=YOUR_GITHUB_PAT
```

You need a GitHub Personal Access Token (PAT) with at least `read:packages` scope, even for public packages. Replace `YOUR_GITHUB_PAT` with your token.

> **Important:** Add `.npmrc` to your `.gitignore` file to avoid accidentally pushing your PAT to GitHub.

### 2. Add the dependency

In your project's `package.json`, add:

```json
"dependencies": {
  "@thehyve/data-metrics-plugin": "@thehyve/data-metrics-plugin"
}
```

### 3. Install dependencies

Run:

```sh
yarn install
```

## Usage

### DataMetricsPage

The `DataMetricsPage` component displays a full metrics dashboard, including:
- Release header
- Download links for metrics files
- Summary cards for key metrics
- Evidence metrics table and pie chart

#### Props

| Prop                | Type     | Description                                 |
|---------------------|----------|---------------------------------------------|
| `currentRelease`    | string   | The current release version (e.g. "25.12")  |
| `previousRelease`   | string   | The previous release version (e.g. "25.09") |
| `currentMetricsUrl` | string   | Filename or URL for the current metrics CSV  |
| `previousMetricsUrl`| string   | Filename or URL for the previous metrics CSV |

#### Example

```tsx
import { DataMetricsPage } from "@thehyve/data-metrics-plugin";

<DataMetricsPage
  currentRelease="25.12"
  previousRelease="25.09"
  currentMetricsUrl="metrics_25-12.csv"
  previousMetricsUrl="metrics_25-09.csv"
/>
```

- The component will fetch the CSV files and display the metrics dashboard.
- Place the metrics CSV files in your public directory.

## Components

- `DataMetricsPage`: Main dashboard page
- `DataMetricsTotalCards`: Summary cards for total counts
- `EvidenceDataMetricsSection`: Table and pie chart for evidence metrics
- `DownloadLink`: Download link for metrics files
- `DataMetricsPieChart`: Pie chart for datasource metrics
- `DataMetricsTable`: Table for metrics comparison

## Development

- Written in TypeScript and React.
