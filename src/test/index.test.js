import React from 'react';
import { expect } from 'chai';
import { shallow, configure, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Index  from '../components/Index';
import Main from '../components/Main';
import DataChart from '../components/DataChart';
import Footer from '../components/Footer';
import Spinner from 'react-spinkit';

configure({ adapter: new Adapter()});

describe('Componente: <Index />', () => {

    it('<Index /> should be have <Footer /> Component', () => {
        const wrapper = shallow(<Index />);
        expect(wrapper.find(Footer)).to.have.length(1);
    });

    it('<Main /> accept props and change these props when called', () => {
        const wrapper = mount(<Main  starsValue="12" />);
        expect(wrapper.props().starsValue).to.equal('12');
        wrapper.setProps({starsValue: '123'});
        expect(wrapper.props().starsValue).to.equal('123');
    });

    it('<DataChart /> should be accept props', () => {
        const wrapper = mount(<DataChart data="[123, 123]" label="[abc, abc]"/>);
        expect(wrapper.props().data).to.equal('[123, 123]');
        expect(wrapper.props().label).to.equal('[abc, abc]');
        console.log("VAI DAR UM ERRO DIZENDO QUE NAO HA UM CONTEXTO PARA O CHART, MAS ESSE NAO E O INTUITO DO TESTE, LOGO, IGNORAR A WARNING");
    });

    it('teste', () => {
        const wrapper = render(<Index />);
        expect(wrapper.find(Spinner)).to.have.length(1);
    })
})