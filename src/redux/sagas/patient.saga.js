import {
  put,
  takeEvery,
  takeLatest
} from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "LOGIN" actions
// for ONE patient
function* fetchPatientDetail(action) {
  try {
    const id = action.payload;
    const response = yield axios.get(`/api/patient/?q=${id}`)
    yield put({
      type: 'SET_PATIENT_DETAIL',
      payload: response.data
    })
  } catch (error) {
    console.log('get patient details error', error)
  }
}

function* fetchPatientDetailClient(action) {
  try {
      const id = action.payload;
      console.log(id)
      const response = yield axios.get('/api/patient/client', {params: action.payload})
      yield put({ type: 'SET_PATIENT_DETAIL', payload: response.data })
  } catch (error) {
      console.log('get patient details error', error)
  }
}

// handles post new patient
function* postPatient(action) {
  console.log('postPatient saga action.payload', action.payload);
  try {
    yield axios.post('/api/patient', action.payload);
    // sending payload because query requires either active or inactive status
    yield put({
      type: 'FETCH_ALL_PATIENT',
      payload: {
        active: true
      }
    });
  } catch {
    console.log('postPatient saga error');
  }
}

function* addToken(action){
  console.log(action.payload)
  try{
    yield axios.put('api/patient/token', action.payload);
  } catch (error) {
    console.log('error in post token', error)
  }
}

function* fetchAllPatient(action) {
  try {
    const allPatient = yield axios.get('/api/patient/all', {
      params: action.payload
    });
    console.log(allPatient.data)
    // yield put({ type: 'SET_ALL_PATIENT', payload: allPatient.data})

    yield put({
      type: 'SET_ALL_PATIENT',
      payload: allPatient.data
    })

  } catch (error) {
    console.log('fetch all patients error in patient saga', error)

  }
}

function* fetchDeactivePatientCount() {
  try {

    const deactivePatients = yield axios.get('/api/patient/allDeactive');
    console.log('deactivePatients', deactivePatients.data);
    yield put({
      type: 'SET_ALL_DEACTIVE',
      payload: deactivePatients.data
    })
  } catch (error) {
    console.log('fetch all deactive patients error in patient saga', error)
  }
}

function* deleteRecommendation(action) {
  const recommendation = action.payload;
  console.log(recommendation)
  try {
    yield axios.delete(`/api/patient/delete/`, {
      params: recommendation
    });
    // ⬇ Refresh the patient recommendations
    yield put({
      type: 'FETCH_PATIENT_DETAIL',
      payload: recommendation.patient_id
    })
  } catch (error) {
    console.log('delete recommendation error', error)
  }
}

function* changePatientActiveStatus(action) {
  console.log('LOGGING', action.payload);
  try {
    yield axios.put(`/api/patient/toggleactive/${action.payload.id}`, action.payload);
    yield put({
      type: 'FETCH_PATIENT_DETAIL',
      payload: action.payload.id
    })
    yield put({
      type: 'FETCH_ALL_PATIENT',
      payload: {
        active: !action.payload.active
      }
    });
  } catch (error) {
    console.log('deactivate patient saga error', error);
  }
}

function* fetchPatientCount(action) {
  try {
    const response = yield axios.get('/api/patient/count');
    const patientCount = response.data[0].total_patients
    console.log(patientCount)
    yield put({
      type: 'SET_PATIENT_COUNT',
      payload: patientCount
    })
  } catch (error) {
    console.log('fetch patient count error in saga', error)
  }
}


function* recommendationNeeded() {
  try {
    // getting data from database in patient router
    const recsNeededList = yield axios.get('/api/patient/recommendationNeeded')
    // console log of patients with "1" in bucket column in patient table
    console.log("recs needed list", recsNeededList.data)
    // setting state of reducer
    yield put({
      type: 'SET_RECOMMENDATIONS_NEEDED',
      payload: recsNeededList.data
    })

  } catch {

  }
}

function* autoGenerateRecs(action) {
  try {
    yield axios.post(`api/patient/generate`, action.payload)
    yield put({
      type: 'FETCH_ALL_PATIENT',
      payload: {
        active: true
      }
    });
  } catch (error) {
    console.log('error in auto generate recs saga', error);
  }
}

function* patientMap(action) {
  try {
    const patient = action.payload.patient;
    console.log('patient in map saga', patient)
    for (let item of patient) {
      const geocoded = yield axios.get(`https://maps.googleapis.com/maps/api/geocode/json`, {
        params: {
          address: item.address + item.city + item.state,
          key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
        }

      })
      item.geo = geocoded.data.results[0].geometry.location
    }


    yield put({
      type: 'SET_PATIENT_MAP',
      payload: patient
    })
  } catch (error) {
    console.log('patient map saga error', error)
  }
}



function* patientSaga() {
  yield takeEvery('ADD_PATIENT', postPatient);
  yield takeEvery('FETCH_PATIENT_DETAIL', fetchPatientDetail);
  yield takeEvery('FETCH_PATIENT_DETAIL_CLIENT', fetchPatientDetailClient);
  yield takeEvery('FETCH_ALL_PATIENT', fetchAllPatient)
  yield takeLatest('DELETE_RECOMMENDATION', deleteRecommendation)
  yield takeLatest('CHANGE_PATIENT_ACTIVE_STATUS', changePatientActiveStatus);
  yield takeEvery('FETCH_PATIENT_COUNT', fetchPatientCount);
  yield takeLatest('FETCH_RECOMMENDATIONS_NEEDED', recommendationNeeded);
  yield takeLatest('AUTO_GENERATE_RECS', autoGenerateRecs);
  yield takeLatest('FETCH_PATIENT_MAP', patientMap);
  yield takeLatest('FETCH_DEACTIVE', fetchDeactivePatientCount);
  yield takeLatest('ADD_TOKEN', addToken)
}

export default patientSaga;