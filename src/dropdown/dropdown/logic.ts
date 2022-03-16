import { CreateElement, VNode } from 'vue';
import { Component } from 'vue-property-decorator';

import ElDropdown from 'element-ui/lib/dropdown';
import ElDropdownMenu from 'element-ui/lib/dropdown-menu';

import { isSpecificComponent } from '@kokiri/core/dist/basic';
import { DropdownStructuralComponent } from '@kokiri/core/dist/dropdown';

import { getComponentName, convertPlacement } from '../../basic';

@Component({
  // @ts-ignore
  abstract: true,
  name: getComponentName('dropdown'),
  components: { ElDropdown },
})
export default class Dropdown extends DropdownStructuralComponent {
  private render(h: CreateElement): VNode {
    const children: VNode[] = [];

    let dropdownMenu: VNode | undefined;

    (this.$slots.default || []).forEach(vn => {
      if (isSpecificComponent(vn, getComponentName('dropdownMenu'))) {
        dropdownMenu = vn;
      } else {
        children.push(vn);
      }
    });

    if (dropdownMenu) {
      children.push(
        h(
          ElDropdownMenu,
          { slot: 'dropdown' },
          dropdownMenu.componentOptions ? dropdownMenu.componentOptions.children || [] : [],
        ),
      );
    }

    return h(
      ElDropdown,
      {
        class: this.className,
        props: { trigger: this.trigger, placement: convertPlacement(this.placement) },
      },
      children,
    );
  }
}
