import Ember from 'ember';

const { Component } = Ember;

export default Component.extend({
  // ARGS
  model: null,

  mainColumns: [
    { label: 'Project', valuePath: 'project.name', },
    { label: 'IACUC', valuePath: 'project.iacucNumber', },
    { label: 'Region', valuePath: 'studyLocation.site.region.name', },
    { label: 'Site', valuePath: 'studyLocation.site.name', },
    { label: 'Study Location', valuePath: 'studyLocation.code', },
    { label: 'Method', valuePath: 'collectionMethod.code', },
    { label: 'Type', valuePath: 'collectionType.name', },
    { label: '# of Traps', valuePath: 'numberOfTraps', },
    { label: 'Start', valuePath: 'startDateTime', },
    { label: 'End', valuePath: 'endDateTime', },
    { label: 'ADFG Permit', valuePath: 'adfgPermit.name', },
  ],

  collectionSpeciesColumns: [
    { label: 'Species', valuePath: 'species.commonName' },
    { label: 'Count', valuePath: 'count' },
    { label: 'Count Estimated?', valuePath: 'countEstimated' },
    { label: 'Sex', valuePath: 'sex' },
  ],

  envMeasColumns: [
    { label: 'Date Measured', valuePath: 'dateMeasured', },
    { label: 'Time Measured', valuePath: 'timeMeasured', },
    { label: 'Water Temp (deg C)', valuePath: 'waterTempC', },
    { label: 'Air Temp (deg C)', valuePath: 'airTempC', },
  ],
});
