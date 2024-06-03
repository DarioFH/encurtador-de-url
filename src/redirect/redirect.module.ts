import { Module } from '@nestjs/common';
import { RedirectService } from './redirect.service';
import { RedirectController } from './redirect.controller';
import { EncurtadorModule } from 'src/encurtador/encurtador.module';

@Module({
  imports: [
    EncurtadorModule
  ],
  controllers: [RedirectController],
  providers: [RedirectService]
})
export class RedirectModule {}
