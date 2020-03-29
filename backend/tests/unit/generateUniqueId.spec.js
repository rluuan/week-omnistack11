const genereateUniqueId = require('../../src/utils/generateUniquedId')


describe('Generate Unique ID', () => {
    it('should generate an unique ID', () => {
        const id = genereateUniqueId()

        expect(id).toHaveLength(8)
    })
})