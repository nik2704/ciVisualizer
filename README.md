# Data Visualizer Development

Built using [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

To run the project:

### `npm start`

Starts the development server.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm test`

Launches the test runner.\
See more: [Running Tests](https://facebook.github.io/create-react-app/docs/running-tests)

### `npm run build`

Builds the app for production.

---

## Project Components

### `App`

The root component.

### `UiControl`

Responsible for data preparation and style management (a wrapper around the `Graph` component).

### `Graph`

Responsible for graph rendering.

---

# Requirements for the Graph Component

## Component Interface

1. All [props](#props) must be properly typed and documented.
2. By default, the component should stretch to 100% of its parent’s width and height. Custom styling must also be supported via `className` and `style` props.
3. Graph element styles (e.g., node) must be configurable like this:

    ```tsx
    <Graph
      itemsProps={{
        'element name': { className, style },
      }}
    />
    ```

4. The component should support two modes:
   - Visual edit mode: empty arrays for `nodes` and `links`.
   - Display mode: actual data passed via props.

## Props

Props accepted by the `Graph` component:

```ts
import { CSSProperties } from 'react';

interface Props {
  className?: string;            // Optional class name
  style?: CSSProperties;         // Optional inline styles
}

interface IGraph extends Props {
  itemProps?: ItemProps;         // Custom props for each item
  links: Link[];                 // Graph links
  nodes: Node[];                 // Graph nodes
}

type ItemProps = { [key: string]: Props };

type Node = {
  code: string;                  // Unique identifier
  name: string;                  // Human-readable label
  type: string;                  // Node type
};

type Link = {
  code: string;                  // Unique identifier
  name: string;                  // Human-readable label
  type: LinkType;                // Type of link
  primary: string;              // Source node code
  secondary: string;            // Target node code
};

type LinkType = 'linked' | 'contains' | 'use' | 'implements' | 'associated';
