import {Component, OnInit} from '@angular/core';
import * as XLSX from 'xlsx';
import {RegisterPerson} from '../shared/user.interfaces';
import {FirestorageService} from '../services/firestorage.service';

@Component({
    selector: 'app-report',
    templateUrl: './report.page.html',
    styleUrls: ['./report.page.scss'],
})
export class ReportPage implements OnInit {
    title = 'angular-app';
    fileName = 'ExcelSheet.xlsx';
    Items: RegisterPerson[] = [];

    constructor(public db: FirestorageService) {
    }

    ngOnInit() {
        this.getItem();
    }

    exportexcel(): void {
        const element = document.getElementById('excel-table');
        const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        /* GUARDAR EL DOCUMENTO */
        XLSX.writeFile(wb, this.fileName);

    }

    getItem() {
        const registerpath = 'UserRegister';
        this.db.getCollectionChanges<RegisterPerson>(registerpath).subscribe(
            res => {
                console.log(res);
                this.Items = res;
            }
        );
    }
}
