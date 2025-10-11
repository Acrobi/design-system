# Master Execution Plan: Design System Management Platform

## Core Principles for the AI Swarm (The Constitution)

1.  **Absolute Honesty:** An agent must never "lie" or comment out failing code. If a task cannot be completed as specified after multiple attempts, the agent must stop, document its attempts, and explicitly ask the human for guidance.
2.  **The Golden Rule:** Components are forbidden from containing hard-coded style values. All styling must be sourced from CSS variables. The ESLint configuration is the enforcer of this law.
3.  **The Editor is the Source of Truth:** All testing, visualization, and documentation will be implemented within the `component-editor.tsx` platform. No external tools like Storybook are to be used.
4.  **Separation of Duties:** The agent that writes the code for a feature (the DEV agent) **cannot** be the same agent that writes the test for it (the QA agent). A different agent must always perform validation.
5.  **Adherence to the Plan:** All work must follow the phased plan. No agent is to begin work on a "Walk" phase story until all "Crawl" phase stories are complete, tested, and approved by the human.

---

## Phase 1: Crawl (The Solid Foundation)

**Goal:** A fully functional, file-based design system with a complete set of primitive tokens and a robust light/dark mode. The `component-editor` is enhanced to serve as the primary documentation and testing platform.

### Epic C1: Foundational Primitives & Tooling

#### Story C1.1: Implement Core CSS Primitives & Theming Strategy
*   **Status:** `Approved`
*   **Story:** As a Design System Architect, I want a complete set of foundational CSS primitive tokens and a robust light/dark mode theming strategy implemented, so that all future components can be built on a consistent, themeable, and accessible foundation.
*   **Tasks / Subtasks:**
    *   `DEV Agent Tasks:`
        *   `[ ]` Task 1: Update `globals.css` with the full `:root` block.
        *   `[ ]` Task 2: Implement the "split-variable" theming strategy.
    *   `QA Agent Tasks:`
        *   `[ ]` Task 3: Create the "Foundations" demo view.
        *   `[ ]` Task 4: Implement the content of the "Foundations" demo.

#### Story C1.2: Configure Tailwind CSS Bridge
*   **Status:** `Approved`
*   **Story:** As a Developer, I want Tailwind CSS utility classes to be connected to our foundational CSS variables, so that I can style components semantically (e.g., `bg-primary`) and have them automatically respect the current theme.
*   **Tasks / Subtasks:**
    *   `DEV Agent Tasks:`
        *   `[ ]` Task 1: Modify `tailwind.config.js`.
    *   `QA Agent Tasks:`
        *   `[ ]` Task 2: Create the test component (`/components/tailwind-bridge-test.tsx`).
        *   `[ ]` Task 3: Integrate the test component into the editor.

#### Story C1.3: Set Up Developer Tooling
*   **Status:** `Approved`
*   **Story:** As a Product Owner, I want the project's linting rules to be configured to prevent any hard-coded style values, so that we can programmatically enforce our "no hard-coded values" golden rule.
*   **Tasks / Subtasks:**
    *   `DEV Agent Tasks:`
        *   `[ ]` Task 1: Install and configure the ESLint plugin.
        *   `[ ]` Task 2: Configure the specific linting rules in `.eslintrc.json`.
    *   `QA Agent Tasks:`
        *   `[ ]` Task 3: Create a temporary violating component.
        *   `[ ]` Task 4: Verify the linting rules by running the `lint` command and capturing the error output, then delete the test component.

### Epic C2: Core System Integration into the Editor

#### Story C2.1: Implement Motion System
*   **Status:** `Approved`
*   **Story:** As a Developer, I want a centralized motion system with themeable durations and easing curves, integrated into Tailwind CSS, so that I can apply consistent, high-performance animations declaratively.
*   **Tasks / Subtasks:**
    *   `DEV Agent Tasks:`
        *   `[ ]` Task 1: Add motion primitives to `globals.css`.
        *   `[ ]` Task 2: Update `tailwind.config.js` for motion, keyframes, and animations.
    *   `QA Agent Tasks:`
        *   `[ ]` Task 3: Enhance the "Foundations" demo to display the motion system.

#### Story C2.2: Implement Sensory Feedback & Icon Metaphor Systems
*   **Status:** `Approved`
*   **Story:** As a Design System Architect, I want centralized providers for sensory feedback and icon metaphors, so that components can be decoupled from the specific implementation of sounds, haptics, and icons.
*   **Tasks / Subtasks:**
    *   `DEV Agent Tasks:`
        *   `[ ]` Task 1: Implement the Sensory Feedback System (`/components/sensory-provider.tsx`).
        *   `[ ]` Task 2: Implement the static Icon Metaphor System (`/lib/icon-metaphors.ts`, `/lib/icon-maps/lucide.map.ts`, `/components/icon-provider.tsx`, refactor `/components/ui/icon.tsx`).
    *   `QA Agent Tasks:`
        *   `[ ]` Task 3: Verify the Sensory Feedback System via a temporary test component.
        *   `[ ]` Task 4: Verify the Icon Metaphor System using the existing `IconDemo`.

#### Story C2.3: Refactor & Test Core Components in the Editor
*   **Status:** `Approved`
*   **Story:** As a Design System Maintainer, I want the core components to be refactored to use all the new foundational systems, so that our component library is fully decoupled and themeable.
*   **Tasks / Subtasks:**
    *   `DEV Agent Tasks:`
        *   `[ ]` Task 1: Refactor the `Button` component.
        *   `[ ]` Task 2: Refactor the `Label` component.
    *   `QA Agent Tasks:`
        *   `[ ]` Task 3: Enhance the `component-editor.tsx` platform by adding comments clarifying its role as the official testing pattern.
        *   `[ ]` Task 4: Verify the refactored `Button` component's variants, themes, and sensory feedback.
        *   `[ ]` Task 5: Verify the refactored `Label` component's icon metaphor functionality.

---

## Phase 2: Walk (The Dynamic Theming Engine)

**Goal:** Enable dynamic client themes managed through simple `.css` files.

### Epic W1: Client Theme Generation

#### Story W1.1: Implement Palette Generation Utility
*   **Status:** `Approved`
*   **Story:** As a Theme Engine, I want a utility function that can generate a full, 11-step accessible color palette from a single base color, so that I can dynamically create unique, brand-aligned themes for clients.
*   **Tasks / Subtasks:**
    *   `DEV Agent Tasks:`
        *   `[ ]` Task 1: Install the `color2k` dependency.
        *   `[ ]` Task 2: Implement the palette generation utility in `/lib/theme-utils.ts`.
    *   `QA Agent Tasks:`
        *   `[ ]` Task 3: Write unit tests for the utility in `/lib/theme-utils.test.ts`.

#### Story W1.2: Build the Theme Serving API Endpoint
*   **Status:** `Approved`
*   **Story:** As a Theme Engine, I want a dynamic API endpoint that can read a client's theme file, generate a full color palette if needed, and serve a complete CSS stylesheet, so that client-specific branding can be loaded in real-time.
*   **Tasks / Subtasks:**
    *   `DEV Agent Tasks:`
        *   `[ ]` Task 1: Create the dynamic API route file at `pages/api/themes/[themeName].css.ts`.
        *   `[ ]` Task 2: Implement the theme generation logic within the API handler.
    *   `QA Agent Tasks:`
        *   `[ ]` Task 3: Write an integration test for the API endpoint.

#### Story W1.3: Enhance Editor for Dynamic Theming
*   **Status:** `Approved`
*   **Story:** As a Design System User, I want to be able to switch between different client themes and color modes within the editor, so that I can instantly preview how components will look under various brand identities.
*   **Tasks / Subtasks:**
    *   `DEV Agent Tasks:`
        *   `[ ]` Task 1: Implement the dynamic `ThemeProvider` in `/components/theme-provider.tsx`.
        *   `[ ]` Task 2: Integrate the provider into the editor's root layout.
    *   `QA Agent Tasks:`
        *   `[ ]` Task 3: Enhance the `component-editor` UI with a `<Select>` dropdown for theme switching.
        *   `[ ]` Task 4: Verify the full dynamic theming functionality.

---

## Phase 3: Run (The Design System Platform)

**Goal:** Evolve the system into a full-stack application with a database, a UI for managing themes and assets, and complete abstraction.

### Epic R1: Backend & Asset Abstraction

#### Story R1.1: Design and Implement Database Schema
*   **Status:** `Approved`
*   **Story:** As a System Architect, I want a robust and scalable database schema implemented with Prisma, so that we can reliably store and manage all design system assets, metaphors, and theme mappings.
*   **Tasks / Subtasks:**
    *   `DEV Agent Tasks:`
        *   `[ ]` Task 1: Initialize Prisma and configure for Cloudflare D1.
        *   `[ ]` Task 2: Define the database models in `schema.prisma`.
        *   `[ ]` Task 3: Generate and apply the database migration.
    *   `QA Agent Tasks:`
        *   `[ ]` Task 4: Verify the generated SQL migration file.

#### Story R1.2: Build Asset & Metaphor CRUD APIs
*   **Status:** `Approved`
*   **Story:** As a Design System Platform, I want a complete set of secure CRUD API endpoints for managing metaphors and assets, so that a user interface can be built to interact with our database.
*   **Tasks / Subtasks:**
    *   `DEV Agent Tasks:`
        *   `[ ]` Task 1: Generate the Prisma Client.
        *   `[ ]` Task 2: Implement the Metaphors API.
        *   `[ ]` Task 3: Implement the Assets API.
        *   `[ ]` Task 4: Implement the Theme Mapping API.
    *   `QA Agent Tasks:`
        *   `[ ]` Task 5: Write integration tests for the APIs.

#### Story R1.3: Implement File Upload Service
*   **Status:** `Approved`
*   **Story:** As a Content Manager, I want a secure and reliable API endpoint to upload asset files, so that I can store custom assets in our system for use in themes.
*   **Tasks / Subtasks:**
    *   `DEV Agent Tasks:`
        *   `[ ]` Task 1: Configure R2 Bucket Binding in `wrangler.toml`.
        *   `[ ]` Task 2: Implement the File Upload API Worker.
    *   `QA Agent Tasks:`
        *   `[ ]` Task 3: Write an integration test for the upload service.

#### Story R1.4: Build Brand Asset System
*   **Status:** `Approved`
*   **Story:** As a Developer, I want a dedicated and strictly-typed system for handling fixed brand assets, so that I can place brand imagery declaratively and ensure it's theme-aware.
*   **Tasks / Subtasks:**
    *   `DEV Agent Tasks:`
        *   `[ ]` Task 1: Define the Brand Contract.
        *   `[ ]` Task 2: Implement the Brand Provider.
        *   `[ ]` Task 3: Implement the Brand Asset Component.
    *   `QA Agent Tasks:`
        *   `[ ]` Task 4: Create the Branding demo page and test the system with mock data.

#### Story R1.5: Build Universal Asset System
*   **Status:** `Approved`
*   **Story:** As a Developer, I want a single, universal component for rendering any type of asset based on a semantic metaphor, so that I can place assets in my UI without needing to know the specific file or type.
*   **Tasks / Subtasks:**
    *   `DEV Agent Tasks:`
        *   `[ ]` Task 1: Implement the Asset Provider.
        *   `[ ]` Task 2: Implement the Universal Asset Component.
        *   `[ ]` Task 3: Refactor the entire application to use the new Asset component.
    *   `QA Agent Tasks:`
        *   `[ ]` Task 4: Verify the Universal Asset System.

### Epic R2: The Management Dashboard UI

#### Story R2.1: Build Theme Editor UI
*   **Status:** `Approved`
*   **Story:** As a Client Administrator, I want a visual, interactive theme editor, so that I can create and manage my brand's themes and see a live preview of my changes.
*   **Tasks / Subtasks:**
    *   `DEV Agent Tasks:`
        *   `[ ]` Task 1: Create the Theme Editor view.
        *   `[ ]` Task 2: Implement the UI controls for the editor.
        *   `[ ]` Task 3: Implement real-time preview functionality.
        *   `[ ]` Task 4: Implement the save functionality (console.log for now).
    *   `QA Agent Tasks:`
        *   `[ ]` Task 5: Verify the Theme Editor's functionality.

#### Story R2.2: Build Metaphor Management UI
*   **Status:** `Approved`
*   **Story:** As an Administrator, I want a CRUD interface for managing metaphors, so that I can define the official vocabulary for all abstractable assets.
*   **Tasks / Subtasks:**
    *   `DEV Agent Tasks:`
        *   `[ ]` Task 1: Create the Metaphor Management view.
        *   `[ ]` Task 2: Implement the metaphor list display.
        *   `[ ]` Task 3: Implement the "Create Metaphor" functionality.
        *   `[ ]` Task 4: Implement the "Edit" and "Delete" functionalities.
    *   `QA Agent Tasks:`
        *   `[ ]` Task 5: Verify the full CRUD lifecycle for metaphors.

#### Story R2.3: Build Visual Asset Mapping UI
*   **Status:** `Approved`
*   **Story:** As a Client Administrator, I want a visual interface to map my uploaded assets to the system's defined metaphors, so that I can customize the icons and illustrations in my application.
*   **Tasks / Subtasks:**
    *   `DEV Agent Tasks:`
        *   `[ ]` Task 1: Create the Asset Mapping view.
        *   `[ ]` Task 2: Implement the metaphor grid display.
        *   `[ ]` Task 3: Implement the asset upload and mapping modal.
    *   `QA Agent Tasks:`
        *   `[ ]` Task 4: Verify the full asset mapping workflow.

#### Story R2.4: Build Brand Asset Management UI
*   **Status:** `Approved`
*   **Story:** As a Client Administrator, I want a dedicated interface for uploading and assigning my company's official brand assets, so that I can ensure my brand identity is correctly applied.
*   **Tasks / Subtasks:**
    *   `DEV Agent Tasks:`
        *   `[ ]` Task 1: Create the Brand Asset Management view.
        *   `[ ]` Task 2: Implement the brand slot list.
        *   `[ ]` Task 3: Implement the upload and assignment functionality.
    *   `QA Agent Tasks:`
        *   `[ ]` Task 4: Verify the full brand asset management workflow.

### Epic R3: The Asset Collection System

#### Story R3.1: Update Database Schema for Collections
*   **Status:** `Approved`
*   **Story:** As a System Architect, I want to extend the database schema to support named collections of assets, so that assets can be grouped and applied to specific app interfaces.
*   **Tasks / Subtasks:**
    *   `DEV Agent Tasks:`
        *   `[ ]` Task 1: Add a new `Collection` model to `schema.prisma`.
        *   `[ ]` Task 2: Add a many-to-many relationship between `Collection` and `Asset`.
        *   `[ ]` Task 3: Add a new model `AppInterfaceTheme`.
        *   `[ ]` Task 4: Run `prisma migrate dev`.
    *   `QA Agent Tasks:`
        *   `[ ]` Task 5: Review the migration file.

#### Story R3.2: Build Collection Management APIs
*   **Status:** `Approved`
*   **Story:** As a Design System Platform, I want API endpoints for managing asset collections, so that a UI can be built for this functionality.
*   **Tasks / Subtasks:**
    *   `DEV Agent Tasks:`
        *   `[ ]` Task 1: Create Cloudflare Workers for CRUD operations on Collections.
        *   `[ ]` Task 2: Create an endpoint to manage assets within a collection.
        *   `[ ]` Task 3: Create an endpoint to assign a Collection/Theme to an App Interface.
    *   `QA Agent Tasks:`
        *   `[ ]` Task 4: Use an API client to test the full lifecycle of collection management.

#### Story R3.3: Enhance Providers for Collection Awareness
*   **Status:** `Approved`
*   **Story:** As a Developer, I want the `AssetProvider` to be aware of asset collections, so that it can apply collection-specific asset overrides on top of the theme's assets.
*   **Tasks / Subtasks:**
    *   `DEV Agent Tasks:`
        *   `[ ]` Task 1: Modify the `AssetProvider` to accept an `appInterface` prop.
        *   `[ ]` Task 2: Update the data fetching logic to include the collection's asset map.
        *   `[ ]` Task 3: Implement the override logic in the `getAsset` function.
    *   `QA Agent Tasks:`
        *   `[ ]` Task 4: Create a comprehensive test scenario to verify the override logic.

