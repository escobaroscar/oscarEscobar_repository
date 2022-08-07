import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { RepositoryModule } from './repository/repository.module';
import { OrganizationModule } from './organization/organization.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { URL } from "url";
import { TribuModule } from './tribu/tribu.module';
import { DownlandModule } from './downland/downland.module';
import { MetricModule } from './metric/metric.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:'.env',
      isGlobal:true,
    }),
    TypeOrmModule.forRoot({
      type: "cockroachdb",
      url: process.env.DATABASE_URL,
      ssl: true,
      extra: {
        options: process.env.DATABASE_ROUTINGID
      },
      entities:['dist/**/*.entity{.ts,.js}'],
      synchronize:false,
      retryDelay:3000,
      retryAttempts:10,
      logging:false,
  
    }),
    RepositoryModule, OrganizationModule, TribuModule, DownlandModule, MetricModule],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
