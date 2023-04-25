import { nanoid } from 'nanoid'

interface ISelfCare {
  id?: string,
  timestamp?: number,
  name?: string,
}

class SelfCareBase implements ISelfCare {
  public id: string = nanoid()
  public timestamp: number = Date.now()
  public name: string = ''
}

class SelfCare extends SelfCareBase {}

export {
  type ISelfCare,
  SelfCare,
}