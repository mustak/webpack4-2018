import str from './temp';
import _ from 'lodash';
import './style.css';

function component() {
    var element = document.createElement('div');

    element.innerHTML = _.join(['Hello', 'webpack', str], ' ');
    element.classList.add('red');

    return element;
}

document.body.appendChild(component());
