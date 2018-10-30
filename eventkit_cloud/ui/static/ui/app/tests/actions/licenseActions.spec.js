import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import createTestStore from '../../store/configureTestStore';
import { types, getLicenses } from '../../actions/licenseActions';

describe('license actions', () => {
    it('should dispatch fetching then fetched with license data', () => {
        const mock = new MockAdapter(axios, { delayResponse: 1 });
        mock.onGet('/api/licenses').reply(200, [
            { name: 'license 1' },
            { name: 'license 2' },
        ]);
        const expectedActions = [
            { type: types.FETCHING_LICENSES, _auth_required: true },
            { type: types.RECEIVED_LICENSES, licenses: [{ name: 'license 1' }, { name: 'license 2' }], _auth_required: true },
        ];
        const store = createTestStore({ licenses: [] });

        return store.dispatch(getLicenses())
            .then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            });
    });

    it('should dispatch fetching then error with error message', () => {
        const mock = new MockAdapter(axios, { delayResponse: 1 });
        mock.onGet('/api/licenses').reply(404, 'oh no');
        const expectedActions = [
            { type: types.FETCHING_LICENSES, _auth_required: true },
            { type: types.FETCH_LICENSES_ERROR, error: 'oh no', _auth_required: true },
        ];
        const store = createTestStore({ licenses: [] });

        return store.dispatch(getLicenses())
            .then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            });
    });
});
