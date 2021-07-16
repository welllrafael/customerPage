import { purchase, purchases } from './../../models/purchase';
import { bond, bonds } from './../../models/bonds';
import { Component, Input, OnInit, ViewChild } from '@angular/core';

import {
  PoListViewAction,
  PoModalComponent,
  PoNotificationService,
  PoPageAction,
  PoPageFilter
} from '@po-ui/ng-components';

@Component({
  selector: 'app-bonds',
  templateUrl: './bonds.component.html',
  styleUrls: ['./bonds.component.css']
})
export class BondsComponent implements OnInit {

  hiringProcesses: Array<bond> = [];
  hiringProcessesFiltered: Array<object> = [];
  labelFilter: string = '';
  hide: boolean = false;
  selectedActionItem = {};
  titleDetailsModal: string = 'User Detail';
  @Input() bonds: Array<bond> | undefined;
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
    // console.log(this.bonds);
    // console.log(this.purchases);
    // this.hiringProcesses = [
    //   {
    //     hireStatus: 'hired',
    //     name: 'James Johnson',
    //     city: 'Ontario',
    //     age: 24,
    //     idCard: 'AB34lxi90',
    //     email: 'james@johnson.com',
    //     telephone: '1-541-754-3010',
    //     jobDescription: 'Systems Analyst',
    //     url: 'https://po-ui.io/'
    //   },
    //   {
    //     hireStatus: 'progress',
    //     name: 'Brian Brown',
    //     city: 'Buffalo',
    //     age: 23,
    //     idCard: 'HG56lds54',
    //     email: 'brian@brown.com',
    //     telephone: '1-543-456-9876',
    //     jobDescription: 'Trainee',
    //     url: 'https://po-ui.io/'
    //   },
    //   {
    //     hireStatus: 'canceled',
    //     name: 'Mary Davis',
    //     city: 'Albany',
    //     age: 31,
    //     idCard: 'DF23cfr65',
    //     email: 'mary@davis.com',
    //     telephone: '1-521-223-3232',
    //     jobDescription: 'Programmer'
    //   },
    //   {
    //     hireStatus: 'progress',
    //     name: 'Margaret Garcia',
    //     city: 'New York',
    //     age: 29,
    //     idCard: 'GF45fgh34',
    //     email: 'margaret@garcia.com',
    //     telephone: '1-541-344-2211',
    //     jobDescription: 'Web developer',
    //     url: 'https://po-ui.io/'
    //   },
    //   {
    //     hireStatus: 'hired',
    //     name: 'Emma Hall',
    //     city: 'Ontario',
    //     age: 34,
    //     idCard: 'RF76jut21',
    //     email: 'emma@hall.com',
    //     telephone: '1-555-321-3234',
    //     jobDescription: 'Recruiter',
    //     url: 'https://po-ui.io/'
    //   },
    //   {
    //     hireStatus: 'progress',
    //     name: 'Lucas Clark',
    //     city: 'Utica',
    //     age: 32,
    //     idCard: 'HY21kgu65',
    //     email: 'lucas@clark.com',
    //     telephone: '1-541-322-4343',
    //     jobDescription: 'Consultant'
    //   },
    //   {
    //     hireStatus: 'progress',
    //     name: 'Ella Scott',
    //     city: 'Ontario',
    //     age: 24,
    //     idCard: 'UL78flg68',
    //     email: 'ella@scott.com',
    //     telephone: '1-229-324-3434',
    //     jobDescription: 'DBA'
    //   },
    //   {
    //     hireStatus: 'progress',
    //     name: 'Chloe Walker',
    //     city: 'Albany',
    //     age: 29,
    //     idCard: 'JH12oli98',
    //     email: 'chloe@walker.com',
    //     telephone: '1-518-222-1212',
    //     jobDescription: 'Programmer'
    //   }
    // ];
    // console.log(this.hiringProcesses)
    // this.hiringProcessesFiltered = [...this.hiringProcesses];
    // console.log(this.hiringProcessesFiltered)
    if (this.bonds !== undefined)
        this.hiringProcesses = this.bonds
  }

  formatTitle(item: any) {
    return `${item.idCard} - ${item.name}`;
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
