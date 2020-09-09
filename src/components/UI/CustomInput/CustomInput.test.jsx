import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { CustomInput } from '.';
import TextField from '@material-ui/core/TextField';

configure({adapter: new Adapter()});

describe('<CustomInput />', () => {
  it('renders <CustomInput /> properly', () => {
    let wrapper = shallow(<CustomInput />);
    expect(wrapper.find(TextField)).toHaveLength(1);
  });

  it('renders with props correctly', () => {
    let wrapper = shallow(<CustomInput label="Test" name="test" />)
    expect(wrapper.find(TextField).first().prop('id')).toBeDefined();
    expect(wrapper.find(TextField).first().prop('name')).toBeDefined();
    expect(wrapper.find(TextField).first().prop('label')).toBeDefined();
  })
});
