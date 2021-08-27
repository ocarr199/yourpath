import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import provider from './provider.reducer';
import tag from './tag.reducer';
import patient from './patient.reducer';
import patientTag from './patientTag.reducer';
import providerTag from './providerTag.reducer';
import editProviderReducer from './edit.provider.reducer';
import recommendation from './recommendation.reducer';
import patientCount from './patient.count.reducer';
import newTag from './newTag.reducer'
import editTag from './select.tag.reducer.js'
import allUsers from './all.users.reducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  provider, // contains allProviders and providerDetails
  tag, // will have all of the tags from our tag table
  patient, // contains onePatient and allPatients
  patientTag, // all tags associated with one patient when adding a patient
  providerTag, //All tags associated with one provider
  editProviderReducer, //Will have provider info that is being edited
  recommendation, // list of all patients in bucket 1
  patientCount,
  newTag,
  allUsers,
  editTag,
});

export default rootReducer;
