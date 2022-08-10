import { Module, Global } from '@nestjs/common';
import { OrganizationService } from 'src/organization/services/organization.service';

@Global()
@Module({
  providers: [
    {
      provide: OrganizationService,
      useValue: {}, // mock
    },
  ],
  exports:[OrganizationService]
})
export class TestModule {}
