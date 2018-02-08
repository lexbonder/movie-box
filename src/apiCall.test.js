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
});