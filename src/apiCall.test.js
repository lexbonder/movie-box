import fetchApi from './apiCall.js';

describe('fetchApi',  () => {
    beforeAll(() => {
        window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
          status: 200,
          json: () => Promise.resolve({
            results: 'return results',
          })
        }));
      });

    it('fetch gets called', () => {
        expect(window.fetch).not.toHaveBeenCalled();
        fetchApi();
        expect(window.fetch).toHaveBeenCalled();
    });

    it('throw error when catch is hit', async() => {
        const expectedError = Error('error')

        try {
          await fetchApi();
        } catch(err) {
          expect(err).toEqual(expectedError)
        }
    });

});