import { RDSDataClient } from "@aws-sdk/client-rds-data";
import { drizzle } from "drizzle-orm/aws-data-api/pg";
import { RDS } from "sst/node/rds";
import * as schema from "./schema";

// eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-call
export const db = drizzle(new RDSDataClient(), {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/ban-ts-comment, @typescript-eslint/no-explicit-any
  database: (RDS as any).db.defaultDatabaseName,
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/ban-ts-comment, @typescript-eslint/no-explicit-any
  secretArn: (RDS as any).db.secretArn,
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/ban-ts-comment, @typescript-eslint/no-explicit-any
  resourceArn: (RDS as any).db.clusterArn,
  schema,
});
