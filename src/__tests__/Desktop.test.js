import Enzyme, { shallow } from 'enzyme';
import React from 'react';
import Desktop from '../components/Desktop';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

it('is a test test', () => {
  const wrapper = shallow(<Desktop />);
  console.log(wrapper);
});