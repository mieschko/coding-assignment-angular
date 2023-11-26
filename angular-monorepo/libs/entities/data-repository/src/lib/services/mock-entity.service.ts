import { Injectable } from '@angular/core';
import {
  Employee,
  EntityDetails,
  EntityListItem,
  EntityType,
  EntityUpdateDto,
  GetEntityListParams,
  LocationStats,
} from '../model/model';
import { delay, Observable, of, switchMap, throwError, timer } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class MockEntityService {
  entities: EntityDetails[] = [
    {
      entityId: '1',
      trackingId: 'ab:cd:ef:5d:7a',
      name: 'Entity 1',
      entityType: 'n1t',
      entityStatus: 'On Duty',
      isActive: true,
      attributes: [
        'Department1',
        'Fast Responder',
        'xyakf83kfdasf930-fksdf0239-12303-46340129394',
        'Morning Shift',
      ],
    },
    {
      entityId: '2',
      trackingId: 'ac:cd:ef:4d:7a',
      name: 'Entity 2',
      entityType: 'n1t',
      entityStatus: 'Break',
      isActive: true,
      attributes: [
        'Department1',
        'Fast Responder',
        'xyakf83kfdasf930-fksdf0239-12303-46340129394',
        'Morning Shift',
      ],
    },
    {
      entityId: '3',
      trackingId: 'af:cd:ef:5d:8a',
      name: 'Entity 3',
      entityType: 'n2t',
      entityStatus: 'On Duty',
      isActive: true,
      attributes: [
        'Department1',
        'Fast Responder',
        'xyakf83kfdasf930-fksdf0239-12303-46340129394',
        'Morning Shift',
      ],
    },
    {
      entityId: '4',
      trackingId: 'af:cf:ef:5d:9a',
      name: 'Entity 4',
      entityType: 'n2t',
      entityStatus: 'Break',
      isActive: false,
      attributes: [
        'Department1',
        'Fast Responder',
        'xyakf83kfdasf930-fksdf0239-12303-46340129394',
        'Morning Shift',
      ],
    },
  ];

  entityTypes: EntityType[] = [
    { id: 'n1t', name: 'Nurse' },
    { id: 'n2t', name: 'Security' },
  ];

  lastWeekLocationOccupancy: number[] = [40, 245, 235, 182, 143, 120, 20];

  lastWeekVisitsLog: Employee[] = [
    { id: 'id1', name: 'Jacob Holland' },
    { id: 'id1', name: 'Jacob Holland' },
    { id: 'id2', name: 'Charles Bradley' },
    { id: 'id3', name: 'Mason Moore' },
    { id: 'id4', name: 'Alice Kelly' },
    { id: 'id3', name: 'Mason Moore' },
    { id: 'id1', name: 'Jacob Holland' },
    { id: 'id2', name: 'Charles Bradley' },
    { id: 'id3', name: 'Mason Moore' },
    { id: 'id4', name: 'Alice Kelly' },
    { id: 'id3', name: 'Mason Moore' },
    { id: 'id1', name: 'Jacob Holland' },
    { id: 'id2', name: 'Charles Bradley' },
    { id: 'id3', name: 'Mason Moore' },
    { id: 'id4', name: 'Alice Kelly' },
    { id: 'id3', name: 'Mason Moore' },
    { id: 'id1', name: 'Jacob Holland' },
    { id: 'id2', name: 'Charles Bradley' },
    { id: 'id3', name: 'Mason Moore' },
    { id: 'id4', name: 'Alice Kelly' },
    { id: 'id3', name: 'Mason Moore' },
    { id: 'id1', name: 'Jacob Holland' },
    { id: 'id2', name: 'Charles Bradley' },
    { id: 'id1', name: 'Jacob Holland' },
    { id: 'id2', name: 'Charles Bradley' },
    { id: 'id1', name: 'Jacob Holland' },
    { id: 'id2', name: 'Charles Bradley' },
    { id: 'id1', name: 'Jacob Holland' },
    { id: 'id2', name: 'Charles Bradley' },
    { id: 'id1', name: 'Jacob Holland' },
    { id: 'id2', name: 'Charles Bradley' },
    { id: 'id3', name: 'Mason Moore' },
    { id: 'id4', name: 'Alice Kelly' },
    { id: 'id3', name: 'Mason Moore' },
    { id: 'id4', name: 'Alice Kelly' },
    { id: 'id3', name: 'Mason Moore' },
    { id: 'id4', name: 'Alice Kelly' },
    { id: 'id3', name: 'Mason Moore' },
    { id: 'id4', name: 'Alice Kelly' },
    { id: 'id5', name: 'Rachel Gray' },
    { id: 'id6', name: 'Alexis Morales' },
    { id: 'id1', name: 'Jacob Holland' },
    { id: 'id1', name: 'Jacob Holland' },
  ];

  getEntityList(
    getEntityListParams: GetEntityListParams
  ): Observable<EntityListItem[]> {
    let mockEntities = this.entities;

    if (getEntityListParams.search) {
      const lowerSearchString = getEntityListParams.search.toLowerCase();
      mockEntities = mockEntities.filter((item) => {
        const lowerName = item.name.toLowerCase();
        const lowerTrackingId = item.trackingId?.toLowerCase();

        const nameContains = lowerName.includes(lowerSearchString);
        const trackingIdContains =
          lowerTrackingId && lowerTrackingId.includes(lowerSearchString);

        return nameContains || trackingIdContains;
      });
    }

    if (getEntityListParams.name) {
      const lowerSearchString = getEntityListParams.name.toLowerCase();

      const foundName = mockEntities.find((item) => {
        const lowerName = item.name.toLowerCase();
        return lowerName === lowerSearchString;
      });

      mockEntities = foundName ? [foundName] : [];
    }

    return this.httpMockResponseWithRandomError(mockEntities);
  }

  getEntityDetails(entityId: string): Observable<EntityDetails> {
    const entity = this.entities.find((e) => e.entityId === entityId);
    if (!entity) {
      return throwError(() => ({ status: 404, message: 'Not Found' }));
    }
    return this.httpMockResponseWithRandomError(entity);
  }

  updateEntity(
    entityUpdateDto: EntityUpdateDto,
    entityId: string
  ): Observable<EntityDetails> {
    const entity = this.entities.find((e) => e.entityId === entityId);
    if (!entity) {
      return throwError(() => ({ status: 404, message: 'Not Found' }));
    }
    // I know it's not the best idea but just want to show it works
    Object.assign(entity, entityUpdateDto);
    return this.httpMockResponseWithRandomError(entity);
  }

  getEntityTypes(): Observable<EntityType[]> {
    return this.httpMockResponseWithRandomError(this.entityTypes);
  }

  getLocationStats(): Observable<LocationStats> {
    // todo: create mock data
    return of({
      lastWeekLocationOccupancy: [],
      lastWeekEmployeesVisits: [],
    });
  }

  private httpMockResponseWithRandomError<T>(data: T): Observable<T> {
    const errorProbability = Math.random();
    const delayTime = 1000;

    if (errorProbability < 0.1) {
      return timer(delayTime).pipe(
        switchMap(() =>
          throwError(
            () =>
              new HttpErrorResponse({
                status: 403,
                statusText: 'Forbidden',
                error: 'Forbidden',
              })
          )
        )
      );
    }

    return of(data).pipe(delay(delayTime));
  }
}
