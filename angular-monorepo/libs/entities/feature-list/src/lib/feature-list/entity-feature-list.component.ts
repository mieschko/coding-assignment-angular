import { Component } from '@angular/core';
import { EntityService } from '../../../../data-repository/src/lib/services/entity.service';
import { catchError, EMPTY, Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { EntityListItem } from '../../../../data-repository/src/lib/model/model';

@Component({
  selector: 'angular-monorepo-entity-feature-list',
  templateUrl: './entity-feature-list.component.html',
  styleUrls: ['./entity-feature-list.component.scss'],
})
export class EntityFeatureListComponent {
  entities$: Observable<EntityListItem[]> = this.entityService
    .getEntityList({})
    .pipe(
      catchError((e: HttpErrorResponse) => {
        // todo: handle error
        console.error(e);
        return EMPTY;
      })
    );

  constructor(private entityService: EntityService) {}
}
