import ApplicationAdapter from './application';
import FileUploadAdapter from 'ccdb-web/mixins/file-upload';

export default ApplicationAdapter.extend(FileUploadAdapter, {
  getFormFields(data) {
    return {
      'datasheet': data['data']['attributes']['datasheet'],
      'collection': JSON.stringify(data['data']['relationships']['collection']['data']),
    }
  },

  getFormKey(key) {
    return key;
  },

  getFormValue(key, value) {
    return value;
  },
});
