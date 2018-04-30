import * as apiFuncs from './apiCall.js';

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
    apiFuncs.fetchApi();
    expect(window.fetch).toHaveBeenCalled();
  });

  it('throw error when catch is hit', async() => {
    const expectedError = Error('error')

    try {
      await apiFuncs.fetchApi();
    } catch(err) {
      expect(err).toEqual(expectedError)
    }
  });
});

describe('cleanDate', () => {
  it('returns only the year from a date object', () => {
    expect(apiFuncs.cleanDate('2017-04-15')).toEqual('2017')
  })
})

describe('cleanData', () => {
  it('returns a cleaned movie object', () => {
    const mockMovieArray = [{
      vote_count: 5632,
      id: 211672,
      video: false,
      vote_average: 6.4,
      title: "Minions",
      popularity: 456.619878,
      poster_path: "/q0R4crx2SehcEEQEkYObktdeFy.jpg",
      original_language: "en",
      original_title: "Minions",
      genre_ids: [ 10751, 16, 12, 35 ],
      backdrop_path: "/qLmdjn2fv0FV2Mh4NBzMArdA0Uu.jpg",
      adult: false,
      overview: "Minions Stuart, Kevin and Bob are recruited by Scarlet Overkill, a super-villain who, alongside her inventor husband Herb, hatches a plot to take over the world.",
      release_date: "2015-06-17"
    }];
    const expected = [{
      title: "Minions",
      vote_average: 6.4,
      release_date: "2015",
      overview: "Minions Stuart, Kevin and Bob are recruited by Scarlet Overkill, a super-villain who, alongside her inventor husband Herb, hatches a plot to take over the world.",
      poster_path: "https://image.tmdb.org/t/p/w500/q0R4crx2SehcEEQEkYObktdeFy.jpg",
      movie_id: 211672
    }]

    expect(apiFuncs.cleanData(mockMovieArray)).toEqual(expected)
  })
})

describe('createUser', () => {
  it.skip('should return a success object', () => {
    const mockUserInfo = {name: 'a', password: 'a', email: 'a@a.com'}

    expect(apiFuncs.createUser(mockUserInfo)).toEqual({status: 'success'})
  })
})
