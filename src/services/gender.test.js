const nock = require('nock');
const genderServiceBuilder = require('./gender');

const baseURL = 'http://localhost';
const countryId = 'ES';
const genderService = genderServiceBuilder({
  baseURL,
  countryId,
});

describe('/services/gender', () => {
  describe('for a correct call', () => {
    let gender;
    let nockMock;

    beforeAll(async () => {
      nockMock = nock(baseURL)
        .get(`/?name=Angel&country_id=${countryId}`)
        .times(2)
        .reply(200, {
          gender: 'male'
        });

      gender = await genderService('Angel');
      gender = await genderService('Angel');
    });
    afterAll(() => {
      nock.cleanAll();
    });

    it('we should call external sevice', () => {
      expect(nockMock.isDone()).toBe(true);
    });

    it('should return the correct gender value', async () => {
      expect(gender).toBe('male');
    });
  })
});
