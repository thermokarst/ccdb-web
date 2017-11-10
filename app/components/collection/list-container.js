import Ember from 'ember';

const { Component } = Ember;

export default Component.extend({
  // ARGS
  model: null,

  columns: [
    { label: 'Project', valuePath: 'project.name', },
    { label: 'Region', valuePath: 'studyLocation.site.region.name', },
    { label: 'Site', valuePath: 'studyLocation.site.name', },
    { label: 'Study Location', valuePath: 'studyLocation.code', },
    { label: 'Method', valuePath: 'collectionMethod.name', },
    { label: '# of Traps', valuePath: 'numberOfTraps', },
    { label: 'Start', valuePath: 'startDateTime', },
    { label: 'End', valuePath: 'endDateTime', },
  ],
});
