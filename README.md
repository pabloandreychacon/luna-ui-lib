# Luna UI Lib

Luna UI Lib is a lightweight web component library for building modern user interfaces. 
It uses **Pico CSS** for styling and provides a set of reusable custom elements.

## Components

Here is a list of the available components in this library:

### 1. `ui-datatable` (`<ui-datatable>`)
A robust data table component that supports searching, sorting, and pagination. It includes a toolbar for actions and provides a clean, responsive layout for displaying tabular data.

### 2. `ui-fab` (`<ui-fab>`)
A Floating Action Button component. It can be positioned at various corners of the screen (e.g., `bottom-right`, `top-left`) and is typically used for primary, prominent actions on a page.

### 3. `ui-multiselect` (`<ui-multiselect>`)
A custom select dropdown that allows users to select multiple options at once. It provides a better user experience than native multiple selects, with clear visual feedback for selected items.

### 4. `ui-popconfirm`
A pop-up confirmation dialog component. It is used to ask the user for confirmation before executing an action (like deleting an item), acting as a non-intrusive alternative to native `confirm()` dialogues.

### 5. `ui-spinner` (`<ui-spinner>`)
A loading spinner indicator. Use this component to provide visual feedback to users when data is being fetched or an asynchronous operation is in progress.

### 6. `ui-toast`
A toast notification system. It displays brief, auto-expiring messages at the edge of the screen to inform users about the success, error, or status of an operation without interrupting their workflow.

## Installation

This project uses npm for dependency management. To install the dependencies, run:

```bash
npm install
```

Since it relies on Pico CSS, ensure it's installed:

```bash
npm install @picocss/pico
```

## Example

Check out the [live demo](https://pabloandreychacon.github.io/luna-ui-lib/) to see the components in action. Or run the local example:

```bash
npx vite
```

## Publishing to GitHub Pages

To update the live demo on GitHub Pages:

```bash
# Build the library
npm run build

# Stage and commit changes
git add example.html
git commit -m "Update example"

# Publish to gh-pages branch
npm run publish:examples
```

The `publish:examples` script will automatically switch to the `gh-pages` branch, copy the necessary files, commit, and push to the repository.
