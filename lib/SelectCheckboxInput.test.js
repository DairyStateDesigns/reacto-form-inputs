import React from 'react';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import { testInput } from 'composable-form-tests';
import SelectCheckboxInput from './SelectCheckboxInput';

const options = [
  { label: 'A', value: 'a' },
  { label: 'B', value: 'b' },
  { label: 'C', value: 'c' },
];

// Run generic Input tests that should pass for any Composable Forms Spec input
testInput({
  component: SelectCheckboxInput,
  defaultValue: [],
  exampleValueOne: ['a'],
  exampleValueTwo: ['b', 'c'],
  mount,
  options,
  simulateChanged(wrapper, value) {
    wrapper.find('input').forEach((checkbox) => {
      const checked = value.indexOf(checkbox.prop('value')) > -1;
      checkbox.simulate('change', { target: { checked } });
    });
  },
});

test('renders', () => {
  const component = renderer.create(
    <SelectCheckboxInput name="test" options={options} />,
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
