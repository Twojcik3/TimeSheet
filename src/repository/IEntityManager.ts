import { DeleteResult, EntityTarget, ObjectID, UpdateResult } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export interface IEntityManager {
    save(entity: any): Promise<any>;
    remove(entity: any): Promise<any>;
    softDelete(entity: any, id: string): Promise<UpdateResult>;
    delete<Entity>(
      targetOrEntity: EntityTarget<Entity>,
      criteria: string | string[] | number | number[] | Date | Date[] | ObjectID | ObjectID[] | any):
      Promise<DeleteResult>;
    transaction<T>(runInTransaction: (entityManager: IEntityManager) => Promise<T>): Promise<T>;
    update<Entity>(
      target: EntityTarget<Entity>,
      criteria: string | string[] | number | number[] | Date | Date[] | ObjectID | ObjectID[] | any,
      partialEntity: QueryDeepPartialEntity<Entity>
    ): Promise<UpdateResult>;

}
