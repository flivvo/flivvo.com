import { type SSTConfig } from 'sst'
import { NextjsSite, RDS, Script } from 'sst/constructs'

export default {
  config(_input) {
    return {
      name: 'flivvocom',
      region: 'us-east-1',
    }
  },
  stacks(app) {
    app.stack(function Site({ stack }) {
      const rds = new RDS(stack, 'db', {
        engine: 'postgresql13.9',
        defaultDatabaseName: 'app_database',
      })

      const site = new NextjsSite(stack, 'site', {
        path: "packages/web",
        bind: [rds],
        customDomain: {
          domainName: stack.stage === 'prod' ? 'flivvo.com' : `${stack.stage}.flivvo.com`,
          domainAlias: stack.stage === 'prod' ? 'www.flivvo.com' : undefined,
        },
      })

      new Script(stack, 'migrations', {
        defaults: {
          function: {
            bind: [rds],
            timeout: 300,
            copyFiles: [
              {
                from: 'packages/web/migrations',
                to: 'migrations',
              },
            ],
          },
        },
        onCreate: 'packages/functions/src/migrate.handler',
        onUpdate: 'packages/functions/src/migrate.handler',
      })

      stack.addOutputs({
        SiteUrl: site.url,
        RDS_ARN: rds.clusterArn,
        RDS_SECRET: rds.secretArn,
        RDS_DATABASE: rds.defaultDatabaseName,
      })
    })
  },
} satisfies SSTConfig
