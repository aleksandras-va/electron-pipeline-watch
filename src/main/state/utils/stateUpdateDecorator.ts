import { eventManager, StateUpdateType } from '../../EventManager';

function onStateUpdate(stateUpdateType: StateUpdateType) {
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
const onNotificationStateUpdate = onStateUpdate(StateUpdateType.Alert);
const onUiStateUpdate = onStateUpdate(StateUpdateType.Ui);
const onUserStateUpdate = onStateUpdate(StateUpdateType.User);

export { onProjectStateUpdate, onNotificationStateUpdate, onUiStateUpdate, onUserStateUpdate };
