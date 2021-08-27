import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// fetch all tags in tag table?
function* fetchTags() {
    try {
        //GET request to grab the tags in the DB
        const response = yield axios.get('/api/tag');

        //Set the tag list in Redux
        yield put({ type: 'SET_TAGS', payload: response.data })

    } catch (error) {
        console.log('Tag GET request failed', error);
    }
}

function* fetchProviderTag(action) {
    console.log('action.payload fetchProviderTag', action.payload);
    try {
        const id = action.payload.id;
        const response = yield axios.get(`/api/tag/provider/${id}`)
        console.log('response.data provider tag', response.data);
        yield put({ type: 'SET_PROVIDER_TAG', payload: response.data })
    } catch (error) {
        console.log('get provider details error', error)
    }
}

function* createTag(action) {
    try {
        const tagName = action.payload;
        console.log('new tag is', tagName)
        yield axios.post(`/api/tag/new`, action.payload)
        yield put({ type: "FETCH_TAGS" })
    } catch (error) {
        console.log('create tag saga error', error)
    }
}


function* confirmTagEdit(action) {
    try {
        const editTag = action.payload;
        console.log('confirm edit tag saga ', editTag)
        yield axios.put(`/api/tag/edit`, editTag)
        yield put({ type: "FETCH_TAGS" })
    } catch (error) {
        console.log('error in edit tag saga', error)
    }
}

function* deactivateTag(action) {
    try {
        const deactivateTag = action.payload;
        console.log(`delete tag saga payload`, deactivateTag)
        yield axios.put(`/api/tag/deactivate`, deactivateTag)
        yield put({ type: "FETCH_TAGS" })
    } catch (error) {
        console.log('error in delete tag saga', error)
    }
}


function* activateTag(action) {
    try {
        const activateTag = action.payload;
        console.log(`delete tag saga payload`, activateTag)
        yield axios.put(`/api/tag/activate`, activateTag)
        yield put({ type: "FETCH_TAGS" })
    } catch (error) {
        console.log('error in delete tag saga', error)
    }
}




function* addProviderTags(action) {
    try {
        yield axios.post(`api/tag/addToProvider`, action.payload);
        yield put({ type: 'FETCH_PROVIDER_TAG', payload: action.payload });
    } catch (error) {
        console.log('add provider tags saga error', error)
    }
}

function* editProviderTags(action) {
    try {
        yield axios.put(`api/tag/editProvider`, action.payload);
        yield put({ type: 'FETCH_PROVIDER_TAG', payload: action.payload });
    } catch (error) {
        console.log('edit provider tags saga error', error)
    }
}

function* tagSaga() {
    yield takeLatest('FETCH_TAGS', fetchTags);
    yield takeLatest('FETCH_PROVIDER_TAG', fetchProviderTag)
    yield takeLatest('CREATE_TAG', createTag);
    yield takeLatest('CONFIRM_TAG_EDIT', confirmTagEdit);
    yield takeLatest('DEACTIVATE_TAG', deactivateTag)
    yield takeLatest('ACTIVATE_TAG', activateTag)
    yield takeLatest('ADD_PROVIDER_TAGS', addProviderTags)
    yield takeLatest('EDIT_PROVIDER_TAGS', editProviderTags)

}


export default tagSaga;