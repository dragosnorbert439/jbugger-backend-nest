import { Module } from '@nestjs/common';
import {UniqueConstraintService} from "./decorators/unique.constraint.decorator";

@Module({
    exports: [UniqueConstraintService],
    providers: [UniqueConstraintService]
})
export class Neo4jDataModule {
    constructor(private readonly uConstrService: UniqueConstraintService) {
        uConstrService.sync();
    }
}
