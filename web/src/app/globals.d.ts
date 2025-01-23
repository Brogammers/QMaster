// Allow 'use client' directive
declare namespace JSX {
  interface IntrinsicElements {
    'use client': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
  }
} 