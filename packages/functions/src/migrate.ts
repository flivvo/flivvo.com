import { ApiHandler } from 'sst/node/api'
import { migrate } from '@flivvo/web/src/server/db/migrate'

export const handler = ApiHandler(async (_event) => {
  await migrate('migrations')
  return {
    body: 'Migrations completed',
  }
})
