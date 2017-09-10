import Ember from 'ember';

const { Component } = Ember;

export default Component.extend({
  columns: [
    { label: 'Project', valuePath: 'project.name', },
    { label: 'Study Location', valuePath: 'studyLocation.code', },
    { label: 'Method', valuePath: 'collectionMethod.code', },
    { label: 'Type', valuePath: 'collectionType.name', },
    { label: '# of Traps', valuePath: 'numberOfTraps', },
    { label: 'Start', valuePath: 'startDateTime', },
    { label: 'End', valuePath: 'endDateTime', },
  ],
});
