import str from './temp';
import _ from 'lodash';

function component() {
    var element = document.createElement('div');

    element.innerHTML = _.join(['Hello', 'webpack', str], ' ', funcx(2));

    return element;
}

const funcx = x => x + 1; //babel test
document.body.appendChild(component());
