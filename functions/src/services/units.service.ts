import FirebaseService from './firebase.service'

interface Result {
  success : boolean,
  data : {} | undefined
}

export default class UnitService extends FirebaseService {
  addUnits = async (price: number, unit: number): Promise<Result> => {
    try {
      const product = await this.firestore
        .collection('units')
        .add({ price, unit })
      const result = await product.get()
      const { data } = result
      return Promise.resolve({ success: true, data})
    } catch (error) {
      console.error(error)
      return Promise.reject({ success: false, error })
    }
  }

  async fetchUnits(): Promise<Result> {
    try {
      const data = new Array()
      const units = await this.firestore.collection('units').get()
      units.forEach(async unit => {
        await data.push(unit.data())
      })
      return Promise.resolve({ success: true, data })
    } catch (error) {
      console.error(error)
      return Promise.reject({ success: false, error })
    }
  }

  fetchUnitsById = async (unitId: string): Promise<Result> => {
    try {
      const units = await this.firestore
        .collection('units')
        .doc(`${unitId}`)
        .get()
      const { data } = units
      return Promise.resolve({ success: true, data })
    } catch (error) {
      console.error(error)
      return Promise.reject({ success: false, error })
    }
  }

  updateUnits = async (unitId: string, data: {}): Promise<Result> => {
    try {
      const toUpdate = await this.firestore.collection('units').doc(`${unitId}`)
      await toUpdate.update(data)
      return Promise.resolve({ success: true, data })
    } catch (error) {
      console.error(error)
      return Promise.reject({ success: false, error })
    }
  }

  deleteUnits = async (unitId: string): Promise<Result> => {
    try {
      const toDelete = await this.firestore
        .collection('units')
        .doc(`${unitId}`)
        .delete()
        console.log(toDelete)
      return Promise.resolve({ success: true, data : `Removed data with ${unitId}` })
    } catch (error) {
      console.error(error)
      return Promise.reject({ success: false, error })
    }
  }
}