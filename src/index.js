import MpInput from './components/Input';
import MpPanel from './components/Panel';
import MpBoard from './components/Board';
import MpRadio from './components/Radio';
import MpRadioGroup from './components/RadioGroup';
import MpCheck from './components/Check';
import MpCheckGroup from './components/CheckGroup';
import MpButton from './components/Button';
import MpUploadHelper from './components/UploadHelper';
import MpImageUpload from './components/ImageUpload';
import MpText from './components/Text';
import MpSlider from './components/Slider';
import MpList from './components/List';
import Message from './components/Message';

const components = [
  MpInput,
  MpPanel,
  MpBoard,
  MpRadio,
  MpRadioGroup,
  MpCheck,
  MpCheckGroup,
  MpButton,
  MpUploadHelper,
  MpImageUpload,
  MpText,
  MpSlider,
  MpList
]

function install(Vue) {
  Vue.prototype.$message = Message;
  components.forEach((component) => {
    Vue.component(component.name, component);
  });
}

export default {
  version: '0.0.0',
  install,
  MpInput,
  MpPanel,
  MpBoard,
  MpRadio,
  MpRadioGroup,
  MpCheck,
  MpCheckGroup,
  MpButton,
  MpUploadHelper,
  MpImageUpload,
  MpText,
  MpSlider,
  MpList,
  Message
}
