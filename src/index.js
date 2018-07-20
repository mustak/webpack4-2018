import str from './temp';
import _ from 'lodash';
import './style.css';

function component() {
    var element = document.createElement('div');

    element.innerHTML = _.join(['Hello', 'webpack', str], ' ', funcx(2));
    element.classList.add('red');

    return element;
}

const funcx = x => x + 1; //babel test
document.body.appendChild(component());
