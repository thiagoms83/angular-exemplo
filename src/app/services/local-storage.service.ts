import {UtilStorage} from './util-storage.service';

/**
 * LocalStorage for storing string values
 */
export function LocalStorage(
  target: Object, // The prototype of the class
  decoratedPropertyName: string // The name of the property
) {

  // get and set methods
  Object.defineProperty(target, decoratedPropertyName, {
    get: function () {
      const value = localStorage.getItem(decoratedPropertyName);
      return value ? UtilStorage.getGettable(value) : '';
    },
    set: function (newValue) {
      localStorage.setItem(decoratedPropertyName, UtilStorage.getSettable(newValue));
    }
  });

}
