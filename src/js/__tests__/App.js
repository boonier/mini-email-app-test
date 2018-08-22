import { createMarkup, fetchData} from '../functions';
jest.mock('../__mocks__/fetchData');

describe('createMarkup', () => {
    it('should return an object', () => {
        const input = "this is a string";
        expect(createMarkup(input)).toEqual({"__html": "this is a string"});
    });
    it('should only accept a string', () => {
        const input = "this is a string";
        expect(createMarkup(input)).toEqual({"__html": "this is a string"});
    });    
    it('should not accept a number', () => {
        const input = 1000;
        expect(createMarkup(input)).toBe(null);
    });
    it('should not accept an array', () => {
        const input = [1,2,3];
        expect(createMarkup(input)).toBe(null);
    });
    it('should not accept an object', () => {
        const input = {key: 100};
        expect(createMarkup(input)).toBe(null);
    });
});

describe('fetchData', () => {

    // test('it should only accept a string', async () => {
    //     expect.assertions(1);
    //     const data = await fetchData('https://res.cloudinary.com/boonier/raw/upload/v1534931425/emails.json');
    //     expect(data).toBeDefined();
    // })
    ;
    test('it should only accept a string', async () => {
        expect.assertions(1);
        const input = 'https://res.cloudinary.com/boonier/raw/upload/v1534931425/emails.json';
        await expect(fetchData(input)).resolves.toBeDefined();
    });

    test('should not accept a number', async () => {
        expect.assertions(1);
        const input = 1200;
        await expect(fetchData(input)).resolves.toBe(null);
    });
    test('should not accept a object', async () => {
        expect.assertions(1);
        const input = {key: 100};
        await expect(fetchData(input)).resolves.toBe(null);
    });
    test('should not accept a array', async () => {
        expect.assertions(1);
        const input = [1,2,3];
        await expect(fetchData(input)).resolves.toBe(null);
    });



});