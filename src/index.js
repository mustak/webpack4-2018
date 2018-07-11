import str from './temp';
import _ from 'lodash';

function component() {
    var element = document.createElement('div');

    element.innerHTML = _.join(['Hello', 'webpack', str], ' ');

    return element;
}

document.body.appendChild(component());
