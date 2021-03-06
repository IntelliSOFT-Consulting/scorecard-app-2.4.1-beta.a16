import { Injectable } from '@angular/core';
import * as scorecardActions from '../actions/scorecard.actions';
import { Actions, Effect, ofType } from "@ngrx/effects";
import { of } from 'rxjs/observable/of';
import {map, switchMap, catchError, tap} from 'rxjs/operators';
import {ScorecardService} from '../../shared/services/scorecard.service';
import {FunctionService} from '../../shared/services/function.service';
import {DataService} from '../../shared/services/data.service';
import {OrgUnitService} from '../../shared/services/org-unit.service';
import {GET_SCORECARD_TO_VIEW} from "../actions/view.actions";

@Injectable()
export class ScorecardEffects {

  constructor(
    private actions$: Actions,
    private scorecardService: ScorecardService,
    private dataService: DataService,
    private orgUnitService: OrgUnitService,
    private functionService: FunctionService
  ) {  }

  @Effect({ dispatch: false })
  loadScorecard$ = this.actions$.pipe(
    ofType(scorecardActions.LOAD_SCORECARDS),
    tap(() => {
      this.scorecardService.getAllScoreCards();
    })
  );

  @Effect({ dispatch: false })
  loadScorecardToView$ = this.actions$.pipe(
    ofType(GET_SCORECARD_TO_VIEW),
    tap(() => {
      this.scorecardService.getViewedScorecard();
    })
  );


  @Effect({ dispatch: false })
  LoadMetadata$ = this.actions$.pipe(
    ofType(scorecardActions.LOAD_SCORECARDS_COMPLETE),
    tap(() => {
      this.functionService.getAllFunctions();
      this.dataService.getUserGroups();
      this.orgUnitService.prepareOrgunits('report');
    })
  );
}
