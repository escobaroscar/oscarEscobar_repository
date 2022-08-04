import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { RepositoryModule } from './repository/repository.module';
import { OrganizationModule } from './organization/organization.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { URL } from "url";
require('dotenv').config(); 

const dbUrl = new URL("postgresql://oscar-ntt-data:3Bq9BIHqp0YTTZxz9YYf4w@free-tier14.aws-us-east-1.cockroachlabs.cloud:26257/defaultdb?sslmode=verify-full&options=--cluster%3Ddb-ntt-data-4044");
const routingId = dbUrl.searchParams.get("options");
dbUrl.searchParams.delete("options");

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: "cockroachdb",
      url: process.env.DATABASE_URL,
      ssl: true,
      extra: {
        options: routingId
      },
      entities:['dist/**/*.entity{.ts,.js}'],
      synchronize:false,
      retryDelay:3000,
      retryAttempts:10,
      logging:false,
  
    }),
    RepositoryModule, OrganizationModule],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
