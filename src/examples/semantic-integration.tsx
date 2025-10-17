/** ========================================
 * SEMANTIC TOKEN INTEGRATION EXAMPLES
 * ========================================
 * 🚨 AI AGENT GUIDANCE:
 * - These examples demonstrate proper semantic token usage
 * - DO NOT use hard-coded values in components
 * - ALWAYS reference semantic tokens via Tailwind classes
 * - Components should be theme-agnostic and reusable
 * ======================================== */

import React from 'react';

// ========================================
// BUTTON COMPONENTS - SEMANTIC TOKEN EXAMPLES
// ========================================

export function ButtonPrimary() {
  return (
    <button className="
      bg-primary
      text-primary-foreground
      px-4 py-2
      rounded-md
      font-medium
      transition-colors
      hover:bg-primary/90
      focus-visible:outline-none
      focus-visible:ring-2
      focus-visible:ring-ring
      focus-visible:ring-offset-2
      disabled:opacity-50
      disabled:pointer-events-none
    ">
      Primary Action
    </button>
  );
}

export function ButtonSecondary() {
  return (
    <button className="
      bg-secondary
      text-secondary-foreground
      px-4 py-2
      rounded-md
      font-medium
      transition-colors
      hover:bg-secondary/80
      focus-visible:outline-none
      focus-visible:ring-2
      focus-visible:ring-ring
      focus-visible:ring-offset-2
      disabled:opacity-50
      disabled:pointer-events-none
    ">
      Secondary Action
    </button>
  );
}

export function ButtonDestructive() {
  return (
    <button className="
      bg-destructive
      text-destructive-foreground
      px-4 py-2
      rounded-md
      font-medium
      transition-colors
      hover:bg-destructive/90
      focus-visible:outline-none
      focus-visible:ring-2
      focus-visible:ring-ring
      focus-visible:ring-offset-2
      disabled:opacity-50
      disabled:pointer-events-none
    ">
      Destructive Action
    </button>
  );
}

export function ButtonOutline() {
  return (
    <button className="
      border
      border-input
      bg-background
      hover:bg-accent
      hover:text-accent-foreground
      px-4 py-2
      rounded-md
      font-medium
      transition-colors
      focus-visible:outline-none
      focus-visible:ring-2
      focus-visible:ring-ring
      focus-visible:ring-offset-2
      disabled:opacity-50
      disabled:pointer-events-none
    ">
      Outline Action
    </button>
  );
}

// ========================================
// CARD COMPONENTS - SEMANTIC TOKEN EXAMPLES
// ========================================

export function CardExample() {
  return (
    <div className="
      rounded-lg
      border
      bg-card
      text-card-foreground
      shadow-card
      p-6
      space-y-4
    ">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold leading-none tracking-tight">
          Card Title
        </h3>
        <p className="text-sm text-muted-foreground">
          Card description goes here using muted text for secondary information.
        </p>
      </div>
    </div>
  );
}

export function CardInteractive() {
  return (
    <div className="
      rounded-lg
      border
      bg-card
      text-card-foreground
      shadow-card
      p-6
      space-y-4
      transition-shadow
      hover:shadow-interactive
      cursor-pointer
    ">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold leading-none tracking-tight">
          Interactive Card
        </h3>
        <p className="text-sm text-muted-foreground">
          This card uses semantic shadows for hover states and interactive feedback.
        </p>
      </div>
    </div>
  );
}

// ========================================
// FORM COMPONENTS - SEMANTIC TOKEN EXAMPLES
// ========================================

export function FormInput() {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        Label Text
      </label>
      <input
        type="text"
        className="
          flex
          h-10
          w-full
          rounded-md
          border
          border-input
          bg-background
          px-3
          py-2
          text-sm
          ring-offset-background
          file:border-0
          file:bg-transparent
          file:text-sm
          file:font-medium
          placeholder:text-muted-foreground
          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-ring
          focus-visible:ring-offset-2
          disabled:cursor-not-allowed
          disabled:opacity-50
        "
        placeholder="Enter value..."
      />
    </div>
  );
}

export function FormTextarea() {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        Message
      </label>
      <textarea
        className="
          flex
          min-h-[80px]
          w-full
          rounded-md
          border
          border-input
          bg-background
          px-3
          py-2
          text-sm
          ring-offset-background
          placeholder:text-muted-foreground
          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-ring
          focus-visible:ring-offset-2
          disabled:cursor-not-allowed
          disabled:opacity-50
        "
        placeholder="Type your message here..."
      />
    </div>
  );
}

// ========================================
// ALERT COMPONENTS - SEMANTIC TOKEN EXAMPLES
// ========================================

export function AlertSuccess() {
  return (
    <div className="
      rounded-lg
      border
      p-4
      bg-success/10
      text-success
      border-success/20
    ">
      <div className="flex items-center space-x-2">
        <div className="text-sm font-medium">
          Success
        </div>
      </div>
      <div className="text-sm mt-2 text-success-foreground">
        Your changes have been saved successfully.
      </div>
    </div>
  );
}

export function AlertWarning() {
  return (
    <div className="
      rounded-lg
      border
      p-4
      bg-warning/10
      text-warning
      border-warning/20
    ">
      <div className="flex items-center space-x-2">
        <div className="text-sm font-medium">
          Warning
        </div>
      </div>
      <div className="text-sm mt-2 text-warning-foreground">
        Please review your changes before proceeding.
      </div>
    </div>
  );
}

export function AlertError() {
  return (
    <div className="
      rounded-lg
      border
      p-4
      bg-destructive/10
      text-destructive
      border-destructive/20
    ">
      <div className="flex items-center space-x-2">
        <div className="text-sm font-medium">
          Error
        </div>
      </div>
      <div className="text-sm mt-2 text-destructive-foreground">
        Something went wrong. Please try again.
      </div>
    </div>
  );
}

export function AlertInfo() {
  return (
    <div className="
      rounded-lg
      border
      p-4
      bg-info/10
      text-info
      border-info/20
    ">
      <div className="flex items-center space-x-2">
        <div className="text-sm font-medium">
          Information
        </div>
      </div>
      <div className="text-sm mt-2 text-info-foreground">
          Here's some helpful information about this feature.
      </div>
    </div>
  );
}

// ========================================
// TYPOGRAPHY COMPONENTS - SEMANTIC TOKEN EXAMPLES
// ========================================

export function HeadingDisplay() {
  return (
    <div className="space-y-6">
      <h1 className="text-display-2xl font-bold tracking-tight">
        Display Heading
      </h1>
      <h2 className="text-display-xl font-semibold tracking-tight">
        Large Heading
      </h2>
      <h3 className="text-display-lg font-medium tracking-tight">
        Medium Heading
      </h3>
      <h4 className="text-2xl font-medium">
        Regular Heading
      </h4>
      <h5 className="text-xl font-medium">
        Small Heading
      </h5>
      <h6 className="text-lg font-medium">
        Micro Heading
      </h6>
    </div>
  );
}

export function TextHierarchy() {
  return (
    <div className="space-y-4">
      <p className="text-base text-content-primary">
        Primary content text using the main content color for important information.
      </p>
      <p className="text-sm text-content-secondary">
        Secondary content text for supporting information and descriptions.
      </p>
      <p className="text-xs text-content-tertiary">
        Tertiary content text for metadata and less important details.
      </p>
      <p className="text-xs text-content-disabled">
        Disabled content text for inactive or unavailable elements.
      </p>
    </div>
  );
}

// ========================================
// LAYOUT COMPONENTS - SEMANTIC TOKEN EXAMPLES
// ========================================

export function ContainerLayout() {
  return (
    <div className="
      container
      mx-auto
      px-4
      py-8
      space-y-8
    ">
      <header className="space-y-4">
        <h1 className="text-3xl font-bold">Page Title</h1>
        <p className="text-lg text-muted-foreground">
          Page description using muted text for secondary context.
        </p>
      </header>

      <main className="space-y-6">
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Section Title</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <CardExample key={i} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export function SidebarLayout() {
  return (
    <div className="
      flex
      min-h-screen
      bg-background
    ">
      {/* Sidebar */}
      <aside className="
        w-64
        border-r
        bg-card
        p-6
        space-y-6
      ">
        <div className="space-y-2">
          <h2 className="text-lg font-semibold">Navigation</h2>
          <nav className="space-y-1">
            <a href="#" className="
              block
              px-3
              py-2
              rounded-md
              text-sm
              font-medium
              bg-accent
              text-accent-foreground
            ">
              Active Item
            </a>
            <a href="#" className="
              block
              px-3
              py-2
              rounded-md
              text-sm
              text-muted-foreground
              hover:bg-accent
              hover:text-accent-foreground
              transition-colors
            ">
              Inactive Item
            </a>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="
        flex-1
        p-6
        space-y-6
      ">
        <ContainerLayout />
      </main>
    </div>
  );
}

// ========================================
// BADGE COMPONENTS - SEMANTIC TOKEN EXAMPLES
// ========================================

export function BadgeDefault() {
  return (
    <span className="
      inline-flex
      items-center
      rounded-full
      border
      px-2.5
      py-0.5
      text-xs
      font-semibold
      transition-colors
      focus:outline-none
      focus:ring-2
      focus:ring-ring
      focus:ring-offset-2
      border-transparent
      bg-primary
      text-primary-foreground
      hover:bg-primary/80
    ">
      Badge
    </span>
  );
}

export function BadgeSecondary() {
  return (
    <span className="
      inline-flex
      items-center
      rounded-full
      border
      px-2.5
      py-0.5
      text-xs
      font-semibold
      transition-colors
      focus:outline-none
      focus:ring-2
      focus:ring-ring
      focus:ring-offset-2
      border-transparent
      bg-secondary
      text-secondary-foreground
      hover:bg-secondary/80
    ">
      Secondary
    </span>
  );
}

export function BadgeSuccess() {
  return (
    <span className="
      inline-flex
      items-center
      rounded-full
      border
      px-2.5
      py-0.5
      text-xs
      font-semibold
      transition-colors
      focus:outline-none
      focus:ring-2
      focus:ring-ring
      focus:ring-offset-2
      border-transparent
      bg-success
      text-success-foreground
      hover:bg-success/80
    ">
      Success
    </span>
  );
}

// ========================================
// MODAL COMPONENTS - SEMANTIC TOKEN EXAMPLES
// ========================================

export function ModalExample() {
  return (
    <div className="
      fixed
      inset-0
      z-modal
      bg-background/80
      backdrop-blur-sm
      flex
      items-center
      justify-center
      p-4
    ">
      <div className="
        relative
        w-full
        max-w-lg
        rounded-lg
        border
        bg-popover
        text-popover-foreground
        shadow-modal
        p-6
        space-y-4
      ">
        <div className="flex flex-col space-y-1.5 text-center sm:text-left">
          <h2 className="text-lg font-semibold leading-none tracking-tight">
            Modal Title
          </h2>
          <p className="text-sm text-muted-foreground">
            Modal description using semantic text colors for hierarchy.
          </p>
        </div>

        <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 space-y-2">
          <ButtonSecondary />
          <ButtonPrimary />
        </div>
      </div>
    </div>
  );
}

// ========================================
// LOADING COMPONENTS - SEMANTIC TOKEN EXAMPLES
// ========================================

export function LoadingSpinner() {
  return (
    <div className="
      flex
      items-center
      justify-center
      p-8
    ">
      <div className="
        animate-spin
        rounded-full
        h-8
        w-8
        border-b-2
        border-primary
      " />
    </div>
  );
}

export function LoadingSkeleton() {
  return (
    <div className="space-y-4">
      <div className="
        space-y-2
      ">
        <div className="
          h-4
          w-1/4
          rounded
          bg-muted
        " />
        <div className="
          h-4
          w-full
          rounded
          bg-muted
        " />
        <div className="
          h-4
          w-3/4
          rounded
          bg-muted
        " />
      </div>

      <div className="
        grid
        gap-4
        md:grid-cols-2
      ">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="
              rounded-lg
              border
              bg-card
              p-6
              space-y-4
            "
          >
            <div className="
              h-6
              w-1/2
              rounded
              bg-muted
            " />
            <div className="
              space-y-2
            ">
              <div className="
                h-4
                w-full
                rounded
                bg-muted
              " />
              <div className="
                h-4
                w-3/4
                rounded
                bg-muted
              " />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ========================================
 * EXAMPLE USAGE COMPONENT
 * ========================================

export function SemanticTokenExamples() {
  return (
    <div className="min-h-screen bg-background text-foreground space-y-16 p-8">
      {/* Header */}
      <header className="space-y-4">
        <h1 className="text-display-2xl font-bold tracking-tight">
          Semantic Token Examples
        </h1>
        <p className="text-lg text-muted-foreground">
          Demonstrating proper usage of semantic tokens in Tailwind CSS v4
        </p>
      </header>

      {/* Button Examples */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Button Components</h2>
        <div className="flex flex-wrap gap-4">
          <ButtonPrimary />
          <ButtonSecondary />
          <ButtonDestructive />
          <ButtonOutline />
        </div>
      </section>

      {/* Card Examples */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Card Components</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <CardExample />
          <CardInteractive />
        </div>
      </section>

      {/* Form Examples */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Form Components</h2>
        <div className="max-w-md space-y-4">
          <FormInput />
          <FormTextarea />
        </div>
      </section>

      {/* Alert Examples */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Alert Components</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <AlertSuccess />
          <AlertWarning />
          <AlertError />
          <AlertInfo />
        </div>
      </section>

      {/* Typography Examples */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Typography Components</h2>
        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Heading Hierarchy</h3>
            <HeadingDisplay />
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Text Hierarchy</h3>
            <TextHierarchy />
          </div>
        </div>
      </section>

      {/* Badge Examples */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Badge Components</h2>
        <div className="flex flex-wrap gap-2">
          <BadgeDefault />
          <BadgeSecondary />
          <BadgeSuccess />
        </div>
      </section>

      {/* Loading Examples */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Loading Components</h2>
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h3 className="text-lg font-semibold mb-4">Spinner</h3>
            <LoadingSpinner />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Skeleton</h3>
            <LoadingSkeleton />
          </div>
        </div>
      </section>
    </div>
  );
}

// ========================================
 * THEME TOGGLER EXAMPLE
 * ========================================

export function ThemeToggler() {
  const [isDark, setIsDark] = React.useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <button
      onClick={toggleTheme}
      className="
        inline-flex
        items-center
        justify-center
        rounded-md
        text-sm
        font-medium
        transition-colors
        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-ring
        focus-visible:ring-offset-2
        disabled:opacity-50
        disabled:pointer-events-none
        hover:bg-accent
        hover:text-accent-foreground
        h-10
        w-10
      "
      aria-label="Toggle theme"
    >
      {isDark ? '🌙' : '☀️'}
    </button>
  );
}