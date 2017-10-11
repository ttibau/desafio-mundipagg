import React from 'react';
import expect from 'expect';
import Index  from '../components/Index';
import { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('Componente: Index', () => {

    it('Renderizando Main dentro do Index', () => {
        const wrapper = shallow(<Index />);
        expect(wrapper.find(Main)).to.have.length(1);
    });

    it('Renderizando o DataChart');

})