import { eventManager, StateUpdateType } from '../../EventManager';

export function onStateUpdate(stateUpdateType: StateUpdateType) {
  return function (_target: unknown, _key: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: unknown[]) {
      originalMethod.apply(this, args);

      eventManager.notify(stateUpdateType);
    };

    return descriptor;
  };
}

const onProjectStateUpdate = onStateUpdate(StateUpdateType.Project);
const onNotificationStateUpdate = onStateUpdate(StateUpdateType.Notification);

export { onProjectStateUpdate, onNotificationStateUpdate };
