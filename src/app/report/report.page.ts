import {Component, OnInit} from '@angular/core';
import * as XLSX from 'xlsx';
import {RegisterPerson} from '../shared/user.interfaces';
import {FirestorageService} from '../services/firestorage.service';
import {Router} from '@angular/router';
import {RegisterPerson1} from '../shared/user.interfaces';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
    selector: 'app-report',
    templateUrl: './report.page.html',
    styleUrls: ['./report.page.scss'],
})
export class ReportPage implements OnInit {
    pdfObject: any;
    title = 'angular-app';
    fileName = 'ExcelSheet.xlsx';
    Items: RegisterPerson1[] = [];
    textoBuscar = '';
    fechaBuscar = '';
    fechaIngre: Date = new Date();

    constructor(public db: FirestorageService, private router: Router) {
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

    generatePDF() {
        let document;
        document = {
            content: [
                {
                    text: 'This paragraph uses header style and extends the alignment property',
                    style: 'header',
                    alignment: 'center'
                },
                {
                    text: [
                        'This paragraph uses header style and overrides bold value setting it back to false.\n',
                        'Header style in this example sets alignment to justify, so this paragraph should be rendered \n',
                        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit, officiis viveremus aeternum superstitio suspicor alia nostram, quando nostros congressus susceperant concederetur leguntur iam, vigiliae democritea tantopere causae, atilii plerumque ipsas potitur pertineant multis rem quaeri pro, legendum didicisse credere ex maluisset per videtis. Cur discordans praetereat aliae ruinae dirigentur orestem eodem, praetermittenda divinum. Collegisti, deteriora malint loquuntur officii cotidie finitas referri doleamus ambigua acute. Adhaesiones ratione beate arbitraretur detractis perdiscere, constituant hostis polyaeno. Diu concederetur.'
                    ],
                    style: 'header',
                    bold: false
                }
            ],
            styles: {
                header: {
                    fontSize: 18,
                    bold: true,
                    alignment: 'justify'
                }
            }

        };
        this.pdfObject = pdfMake.createPdf(document);
        this.pdfObject.download();
    }
    getItem() {
        const registerpath = 'UserRegister';
        this.db.getCollectionChanges<RegisterPerson1>(registerpath).subscribe(
            res => {
                console.log(res);
                this.Items = res;
            }
        );
    }

    buscarFe1(event) {
        this.fechaBuscar = event.detail.value;
    }

    cambioFe1(event) {
        console.log('ionCahnge', event);
    }

    buscar1(event) {
        this.textoBuscar = event.detail.value;
    }

    public returnMenu1(): void {
        this.router.navigate(['admin']);
    }
}
