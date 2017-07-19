import ActionTypes from '../../utils/ActionTypes';
import PayloadStates from '../../utils/PayloadStates';
import payload from '../../utils/payload';

export default function(modelName, Model) {
  return function (store) {
    return function (message) {
      const model = new Model(message.data);

      // todo: replace this with a more configurable solution
      if (model.get('cid')) {
        model.cid = model.get('cid');
      }

      store.dispatch({
        type: ActionTypes.add(modelName),
        payload: payload(model, PayloadStates.RESOLVED)
      });
    };
  };
}
