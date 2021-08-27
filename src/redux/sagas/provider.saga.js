import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


function* fetchProviders() {
    try {
        //GET request to grab all of the active Providers
        const response = yield axios.get('/api/provider');

        //Set the Providers in Redux
        yield put({ type: 'SET_PROVIDERS', payload: response.data });

    } catch (error) {
        console.log('Provider GET request failed', error);
    }
}

function* fetchProviderDetail(action) {
    try {
        const id = action.payload.id;
        const response = yield axios.get(`/api/provider/detail/?q=${id}`)
        yield put({ type: 'SET_PROVIDER_DETAIL', payload: response.data })
    } catch (error) {
        console.log('get provider details error', error)
    }
  }
function* fetchDeactivated() {
    try {
        //GET request to grab all of the deactivated Providers
        const response = yield axios.get('/api/provider/deactivated');

        //Set the Providers in Redux
        yield put({type: 'CLEAR_PROVIDERS'});
        yield put({ type: 'SET_PROVIDERS', payload: response.data });

    } catch (error) {
        console.log('Deactivated Provider GET request failed', error)
    }
}

function* postProvider(action) {
    try {
        //Sends new provider data to server
        yield axios.post('/api/provider', action.payload);
        //After provider has been created it fetches all providers to store in reducer
        yield put({ type: 'FETCH_PROVIDERS' });
    } catch (error) {
        console.log('Error in addProvider generator', error)
    };
}

function* toggleProvider(action) {
    try {
        const provider = action.payload.id
        const boolean = action.payload.active
        console.log(provider)
        //Sends the ID to the database to delete
        yield axios.post(`/api/provider/toggle/${provider}/${boolean}`);

        //After delete is successful, fetch all the providers to update the data
        yield put({ type: 'FETCH_PROVIDERS' });

    } catch (error) {
        console.log('Error in deleteProvider generator', error);
    }
}

function* fetchProviderCount() {
    try {
        //GET request to grab all of the Providers
        const response = yield axios.get('/api/provider/count');
        const providerCount = response.data[0].total_providers
            console.log(providerCount)
        yield put({ type: 'SET_PROVIDER_COUNT', payload: providerCount })

    } catch (error) {
        console.log('Provider GET request failed', error);
    }
}



function* editProvider(action) {
    console.log("got to confirm edit", action.payload)
    try {
   yield axios.put(`/api/provider/edit`, action.payload);
       yield put ({type: 'CLEAR_EDIT' })
       yield put ({ type: "FETCH_PROVIDERS" });
       yield put ({ type: "FETCH_PROVIDER_DETAIL", payload: action.payload });

    } catch (error) {
      console.log('edit provider saga error ', error);
    }
  }

function* providerSaga() {
    yield takeLatest('FETCH_PROVIDERS', fetchProviders);
    yield takeLatest('FETCH_PROVIDER_DETAIL', fetchProviderDetail)
    yield takeLatest('POST_PROVIDER', postProvider)
    yield takeLatest('FETCH_DEACTIVATED', fetchDeactivated);
    //yield takeLatest('POST_PROVIDER', postProvider);
    yield takeLatest('TOGGLE_PROVIDER', toggleProvider);
    yield takeLatest('FETCH_PROVIDER_COUNT', fetchProviderCount)
    yield takeLatest('CONFIRM_EDIT', editProvider);
  }


export default providerSaga;