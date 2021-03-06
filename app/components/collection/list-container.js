import Component from '@ember/component';

export default Component.extend({
  // ARGS
  model: null,

  columns: [
    { label: 'Project', valuePath: 'project.name', },
    { label: 'IACUC', valuePath: 'project.iacucNumber', },
    { label: 'Species', valuePath: 'speciesAndCounts', },
    { label: 'Region', valuePath: 'studyLocation.site.region.name', },
    { label: 'Site', valuePath: 'studyLocation.site.name', },
    { label: 'Study Location', valuePath: 'studyLocation.code', },
    { label: 'Method', valuePath: 'collectionMethod.name', },
    { label: '# of Traps', valuePath: 'numberOfTraps', },
    { label: 'Start', valuePath: 'startDateTime', },
    { label: 'End', valuePath: 'endDateTime', },
    { label: 'ADFG Permit', valuePath: 'adfgPermit.name', },
  ],
});
