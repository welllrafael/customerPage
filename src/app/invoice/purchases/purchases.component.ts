import { purchase, purchases } from './../../models/purchase';
import { Component, Input, OnInit} from '@angular/core';

import {
  PoListViewAction,
  PoNotificationService,
  PoPageAction,
  PoPageFilter
} from '@po-ui/ng-components';

@Component({
  selector: 'app-purchases',
  templateUrl: './purchases.component.html',
  styleUrls: ['./purchases.component.css']
})
export class PurchasesComponent implements OnInit {

  hiringProcesses: Array<purchase> = [];
  hiringProcessesFiltered: Array<object> = [];
  labelFilter: string = '';
  hide: boolean = false;
  selectedActionItem = {};
  titleDetailsModal: string = 'User Detail';
  @Input() purchases: Array<purchase> | undefined;

  readonly actions: Array<PoListViewAction> = [
    {
      label: 'Pix',
      action: this.hireCandidate.bind(this),
      disabled: this.isHiredOrCanceled.bind(this),
      icon: 'po-icon-ok'
    },
    {
      label: 'Outros',
      action: this.cancelCandidate.bind(this),
      disabled: this.isHiredOrCanceled.bind(this),
      type: 'danger',
      icon: 'po-icon-close'
    }
  ];

  readonly pageActions: Array<PoPageAction> = [
    {
      label: 'Outras Acoes',
      action: this.updateCandidates.bind(this, this.hireCandidate),
      disabled: this.disableHireButton.bind(this),
      icon: 'po-icon-ok'
    },
    {
      label: 'Cancelar',
      action: this.updateCandidates.bind(this, this.cancelCandidate),
      disabled: this.disableHireButton.bind(this),
      icon: 'po-icon-close'
    }
  ];

  readonly filterSettings: PoPageFilter = {
    action: this.hiringProcessesFilter.bind(this),
    placeholder: 'Search'
  };

  constructor(
    private poNotification: PoNotificationService
  ) {}

  ngOnInit() {
    if (this.purchases !== undefined)
        this.hiringProcesses = this.purchases
  }

  formatTitle(item: any) {
    return `Nota Fiscal - ${item.Doc}`;
  }

  showDetail(item: any) {
    return item.url;
  }

  private cancelCandidate(selectedCandidate: any) {
    selectedCandidate['hireStatus'] = 'canceled';
    this.poNotification.error('Canceled candidate!');
  }

  private disableHireButton() {
    return true//!this.hiringProcesses?.find(candidate => candidate['$selected']);
  }

  private hireCandidate(selectedCandidate: any) {
    selectedCandidate['hireStatus'] = 'hired';
    this.poNotification.success('Hired candidate!');
  }

  private hiringProcessesFilter(labelFilter: string | Array<string>) {
    const filters = typeof labelFilter === 'string' ? [labelFilter] : [...labelFilter];

    // this.hiringProcessesFiltered = this.hiringProcesses?.filter(item =>
    //   Object.keys(item).some(key => !(item[key] instanceof Object) && this.includeFilter(item[key], filters))
    // );
  }

  private includeFilter(item: any, filters: Array<string>) {
    return filters.some(filter => String(item).toLocaleLowerCase().includes(filter.toLocaleLowerCase()));
  }

  private isHiredOrCanceled(candidate: any): boolean {
    return candidate['hireStatus'] === 'hired' || candidate['hireStatus'] === 'canceled';
  }


  private updateCandidates(action: Function) {
  //   this.hiringProcesses?.TitulosAreceber?.forEach( => {
  //     if (candidate['$selected']) {
  //       switch (candidate['hireStatus']) {
  //         case 'progress':
  //           action.call(this, candidate);
  //           break;

  //         case 'hired':
  //           this.poNotification.warning('This candidate has already been hired.');
  //           break;

  //         case 'canceled':
  //           this.poNotification.error('This candidate has already been disqualified.');
  //           break;
  //       }

  //       candidate['$selected'] = false;
  //     }
  //   });
   }
}


