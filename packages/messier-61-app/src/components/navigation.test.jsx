/*
 * Copyright 2023 Paion Data. All rights reserved.
 */
import renderer from 'react-test-renderer';
import { Navigation } from './navigation';

it('renders correctly', () => {
  const tree = renderer
    .create(<Navigation />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
