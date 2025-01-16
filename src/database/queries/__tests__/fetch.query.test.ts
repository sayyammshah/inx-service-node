import { FetchAll } from '../fetch.query'

jest.mock('../../config/connection.config', () => ({
  getDbInst: jest.fn(() => ({
    collection: jest.fn(() => ({
      find: jest.fn(() => ({
        toArray: jest.fn().mockResolvedValue([])
      }))
    }))
  }))
}))

describe('Should Test Fetch All Query', () => {
  const traceIdMock = 'test-trace-id'

  it('should throw error on not initiating DB Instance', async () => {
    try {
      await FetchAll({ traceId: traceIdMock })
    } catch (error) {
      if (error instanceof Error)
        expect(error.message).toContain(`${traceIdMock}: Error occured in ${FetchAll.name}`)
    }
  })

  it('should return an empty array when no documents are found in the database', async () => {
    try {
      const response = await FetchAll({ traceId: traceIdMock })
      expect(response).toEqual([])
    } catch (error) {
      if (error instanceof Error)
        expect(error.message).toContain(`${traceIdMock}: Error occured in FetchAll`)
    }
  })
})
