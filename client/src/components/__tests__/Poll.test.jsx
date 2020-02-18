
import React from 'react';
import { render } from 'enzyme';
import renderer from 'react-test-renderer';

import Poll from "../Poll";
//Will Require Apollo Mock Provider
test('Poll renders properly', () => {
  const wrapper = render(<Poll/>);
  const element = wrapper.find('div');
  expect(element.length).toBe(1);
});

test('About renders a snapshot properly', () => {
    const tree = renderer.create(<Poll/>).toJSON();
    expect(tree).toMatchSnapshot();
  });