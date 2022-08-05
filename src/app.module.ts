import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { RepositoryModule } from './repository/repository.module';
import { OrganizationModule } from './organization/organization.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { URL } from "url";
import { TribuModule } from './tribu/tribu.module';
import { DownlandModule } from './downland/downland.module';
require('dotenv').config(); 

const dbUrl = new URL("postgresql://user_ntt_data:q06yTlGX-BfRR1yWkicDZA@free-tier14.aws-us-east-1.cockroachlabs.cloud:26257/defaultdb?sslmode=verify-full&options=--cluster%3Dntt-datta-4073");
const routingId = dbUrl.searchParams.get("options");
dbUrl.searchParams.delete("options");

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: "cockroachdb",
      url: "postgresql://user_ntt_data:q06yTlGX-BfRR1yWkicDZA@free-tier14.aws-us-east-1.cockroachlabs.cloud:26257/defaultdb?sslmode=verify-full&options=--cluster%3Dntt-datta-4073",
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
    RepositoryModule, OrganizationModule, TribuModule, DownlandModule],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
