import { BlockUIService } from '../classes/block-ui.service';

export function BlockUI() {
  return function (_: any, __: string, descriptor: PropertyDescriptor) {
    const originalFn = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      try {
        BlockUIService.instance.show();
        return await originalFn.apply(this, args);
      } catch (error) {
        throw error;
      } finally {
        BlockUIService.instance.hide();
      }
    };
  };
}
