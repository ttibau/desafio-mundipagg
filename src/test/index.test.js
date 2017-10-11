import React from 'react';
import { expect } from 'chai';
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Index  from '../components/Index';
import Main from '../components/Main';

configure({ adapter: new Adapter()});

describe('Componente: <Index />', () => {

    it('Renderizando Main dentro do Index', () => {
        const wrapper = shallow(<Index />);
        expect(wrapper.find(Main)).to.have.length(0);
    });

    it('Main accept props', () => {
        const wrapper = mount(<Main  starsValue="12" />);
        expect(wrapper.props().starsValue).to.equal('12');
    });

})