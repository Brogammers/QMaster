import React from 'react';
import renderer from 'react-test-renderer';

import RootLayout from './_layout'; // Import the correct component

describe('<RootLayout />', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<RootLayout />).toJSON();
    expect(tree).toMatchSnapshot(); // Use snapshot testing for UI consistency
  });

  it('renders RootLayoutNav when fonts are loaded', () => {
    const tree = renderer.create(<RootLayout />).toJSON();
    expect(tree).toMatchSnapshot(); // Snapshot should include RootLayoutNav
  });

  // Add more tests as needed, e.g., for loading states, error handling, etc.  
});
