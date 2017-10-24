export function fSwitch(term) {
  return {
    term,
    value() {
      return this._value;
    },

    default(defaultValue) {
      if(this._value === undefined) {
        this._value = defaultValue;
      }
      return this;
    },

    case(caseTerm, condition) {
      if(this.term === caseTerm && this._value === undefined) {
        this._value = condition;
      }
      return this;
    }
  };
}