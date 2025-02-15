import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ReportsService } from '../services/reports.service';

export const reportResolver: ResolveFn<any> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<any> => {
  const reportService = inject(ReportsService);
  const reportId = route.paramMap.get('id');
  
  return of(reportService.getReportById(reportId!));
};