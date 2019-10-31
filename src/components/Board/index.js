import MpBoard from './Board.vue';

MpBoard.install = (Vue) => {
  Vue.component(MpBoard.name, MpBoard);
};

export default MpBoard;