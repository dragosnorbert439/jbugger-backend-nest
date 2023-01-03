import {Injectable} from "@nestjs/common";
import {Neo4jService} from "nest-neo4j/dist";

const registeredClassAndProperties: Set<{class: Object, property: string}>
    = new Set<{class: Object, property: string}>();

@Injectable()
export class UniqueConstraintService {

    constructor(private readonly neo4jService: Neo4jService) {}

    sync() {
        this.dropAllConstraintsAndIndices().then(_ => {
            this.addAllConstraints();
        });
    }

    getRegisteredClasses() {
        return registeredClassAndProperties;
    }

    private async addUniqueConstraint(label: string, property: string): Promise<void> {
        if (!this.isParameter(label) && !this.isParameter(property)) return;

        await this.neo4jService.write(
            `CREATE CONSTRAINT UK_` + label + `_` + property +
            ` IF NOT EXISTS FOR (label:` + label + `) REQUIRE label.` + property + ` IS UNIQUE`,
            {}
        );
    }

    private async dropAllConstraintsAndIndices(): Promise<void> {
        for (const constraintName of (
            await this.neo4jService.read(`SHOW ALL CONSTRAINTS`, {})
        ).records
            .map(it => it['_fields'].at(it['keys'].indexOf('name')))) {
            await this.neo4jService.write(
                `DROP CONSTRAINT ` + constraintName + ` IF EXISTS`,{}
            )
            await this.neo4jService.write(
                `DROP INDEX ` + constraintName + ` IF EXISTS`,{}
            )
        }
    }

    private addAllConstraints(): void {
        this.getRegisteredClasses().forEach((entry) => {
            // noinspection JSIgnoredPromiseFromCall
            this.addUniqueConstraint(entry.class.constructor.name, entry.property);
        });
    }

    isParameter(word: string): boolean {
        return !word.includes(' ');
    }

}
export const Unique = () => {
    return (target: Object, propertyKey: string) => {
        registeredClassAndProperties.add({
            class: target,
            property: propertyKey
        })
    }
}

