import Button from '../../src/components/Button';
import { createTest, createVue, destroyVM } from '../util';

describe('Button', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  it('create', () => {
    vm = createTest(Button, {
      type: 'normal'
    }, true);
    const buttonElement = vm.$el;
    expect(buttonElement.classList.contains('mp-button__normal')).to.be.true;
  });
})
