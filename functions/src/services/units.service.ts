import FirebaseService from './firebase.service'

export default class UnitService extends FirebaseService {
  addUnits = async (price: number, unit: number): Promise<object> => {
    try {
      const product = await this.firestore
        .collection('units')
        .add({ price, unit })
      const result = await product.get()
      return Promise.resolve({ data: result.data() })
    } catch (error) {
      console.error(error)
      return Promise.reject(error)
    }
  }

  async fetchUnits (): Promise<object>{
    try {
      const data = new Array();
      const units = await this.firestore.collection('units').get()
      units.forEach(async unit => {
        await data.push(unit.data())
      })
      return Promise.resolve(data)
    } catch (error) {
      console.error(error)
      return Promise.reject({ success: false, error })
    }
  }

  fetchUnitsById = async (unitId: string): Promise<object> => {
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

  updateUnits = async (unitId: string, data: {}): Promise<object> => {
    try {
      const toUpdate = await this.firestore
        .collection('units')
        .doc(`${unitId}`)
      await toUpdate.update(data)
      return Promise.resolve({ success: true, data })
    } catch (error) {
      console.error(error)
      return Promise.reject({ success: false, error })
    }
  }

  deleteUnits = async (unitId: string): Promise<any> => {
    try {
      const toDelete = await this.firestore
        .collection('units')
        .doc(`${unitId}`)
        .delete()
      return Promise.resolve({ success: true, toDelete })
    } catch (error) {
      console.error(error)
      return Promise.reject({ success: false, error })
    }
  }
}
