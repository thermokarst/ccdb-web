import Ember from 'ember';

const { Mixin, isArray } = Ember;
const { keys } = Object;

// Portions borrowed from https://github.com/funtusov/ember-cli-form-data
// (that project has an MIT license listed, but no copyright holder explicitly identified)
export default Mixin.create({
  formDataTypes: ['POST', 'PUT', 'PATCH'],

  ajaxOptions(url, type, options) {
    let data;
    if (options && 'data' in options) { data = options.data; }
    let hash = this._super.apply(this, arguments);

    if (typeof FormData !== 'undefined' && data && this.formDataTypes.indexOf(type) >= 0) {
      hash.processData = false;
      hash.contentType = false;
      hash.data = this._getFormData(data);
    }
    return hash;
  },

  getFormFields(data) {
    this._root = this._root || keys(data)[0];
    return data[this._root];
  },

  getFormKey(key) {
    return `${this._root}[${key}]`;
  },

  getFormValue(key, value) {
    return value;
  },

  _getFormData(data) {
    let formData = new FormData();
    const fields = this.getFormFields(data);

    keys(fields).forEach((key) => {
      this._appendValue(
        this.getFormValue(key, fields[key]),
        this.getFormKey(key, fields[key]),
        formData);
    });
    return formData;
  },

  _appendValue(value, formKey, formData) {
    if (isArray(value)) {
      value.forEach((item) => {
        this._appendValue(item, `${formKey}[]`, formData);
      });
    } else if (value && value.constructor === Object) {
      keys(value).forEach((key) => {
        this._appendValue(value[key], `${formKey}[${key}]`, formData);
      });
    } else if (typeof value !== 'undefined'){
      formData.append(formKey, value === null ? '' : value);
    }
  },
});
