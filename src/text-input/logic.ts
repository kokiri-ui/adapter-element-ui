import { Component, Inject } from 'vue-property-decorator';

import { TextInputStructuralComponent } from '@kokiri/core/dist/text-input';
import ElInput from 'element-ui/lib/input';

import { getComponentName, convertSize } from '../basic';

@Component({
  // @ts-ignore
  abstract: true,
  name: getComponentName('textInput'),
  components: { ElInput },
})
export default class TextInput extends TextInputStructuralComponent {
  @Inject({ from: 'elFormItem', default: null })
  private readonly elFormItem!: any;

  private get resolvedProps(): Record<string, any> {
    const props: Record<string, any> = {
      name: this.name,
      value: this.value,
      size: this.size
        ? convertSize(this.size)
        : (this.elFormItem && this.elFormItem.elFormItemSize) || 'medium',
      disabled: this.disabled,
      readonly: this.readonly,
      placeholder: this.placeholder,
      clearable: this.clearable,
    };

    if (this.maxLength) {
      props.maxlength = this.maxLength;
    }

    if (this.minLength) {
      props.minlength = this.minLength;
    }

    return props;
  }
}
