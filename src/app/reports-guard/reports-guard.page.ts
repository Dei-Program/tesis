import {Component, OnInit, ViewChild} from '@angular/core';
import {FirestorageService} from '../services/firestorage.service';
import {Producto, Guard} from '../shared/user.interfaces';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;


@Component({
    selector: 'app-reports-guard',
    templateUrl: './reports-guard.page.html',
    styleUrls: ['./reports-guard.page.scss'],
})
export class ReportsGuardPage implements OnInit {
    pdfObject: any;
    guards: Guard[] = [];
    private path = 'reportGuards/';
    newGuard: Guard = {
        name: '',
        uid: this.firestoreService.creatId(),
        time_in: '',
        time_out: '',
        obs: '',
        details: ''
    };

    constructor(public firestoreService: FirestorageService) {
    }

    ngOnInit() {
        this.getProductos();
    }

    getProductos() {
        this.firestoreService.getCollection<Guard>(this.path).subscribe(res => {
                console.log(this.newGuard.name);
                console.log(res);
                this.guards = res;
            }
        );
    }

    async generatePDF(name: string, obs: string, timein: string, timeout: string, details: string) {
        let document;
        document = {
            content: [
                {
                    text: '\n\n', fontSize: 14, bold: true, margin: [0, 20, 0, 8],

                    style: 'header',
                    alignment: 'right'
                },
                {
                    image: await this.getBase64ImageFromURL('../../assets/img/eliteseg.jpg'),
                    width: 250,
                    height: 150,
                    alignment: 'center'
                },
                {
                    text: 'ACTA DE NOVEDAD DE SERVICIO', fontSize: 14, bold: true, margin: [0, 20, 0, 8],

                    style: 'header',
                    alignment: 'center'
                },
                {
                    style: 'tableExample',
                    table: {
                        headerRows: 1,
                        // dontBreakRows: true,
                        // keepWithHeaderRows: 1,
                        alignment: 'center',
                        widths: [150, 150, 150],
                        fillColor: '#eeeeff',
                        body: [
                            [{text: 'Fecha y Hora Entrada', style: 'tableHeader', fillColor: '#cccccc'}, {
                                text: 'Servicio',
                                style: 'tableHeader',
                                fillColor: '#cccccc'
                            }, {
                                text: 'Fecha y Hora Salida',
                                style: 'tableHeader', fillColor: '#cccccc'
                            }],
                            [
                                {text: timein, style: 'tableHeader'}, {text: 'SEGURIDAD PRIVADA', style: 'tableHeader'}, {
                                text: timeout,
                                style: 'tableHeader',
                            },
                            ]
                        ]
                    }
                },
                {
                    text: '\n\n', fontSize: 14, bold: true, margin: [0, 20, 0, 8],

                    style: 'header',
                    alignment: 'right'
                },
                {
                    style: 'tableExample',
                    table: {
                        headerRows: 1,
                        // dontBreakRows: true,
                        // keepWithHeaderRows: 1,
                        alignment: 'center',
                        widths: [500],
                        fillColor: '#eeeeff',
                        body: [
                            [{text: 'TITULO DE LA NOVEDAD', style: 'tableHeader', alignment: 'center', fillColor: '#cccccc'}],
                            [
                                {text: obs, style: 'tableHeader'}
                            ]
                        ]
                    }
                },
                {
                    text: '\n', fontSize: 14, bold: true, margin: [0, 20, 0, 8],

                    style: 'header',
                    alignment: 'right'
                },
                {
                    style: 'tableExample',
                    table: {
                        headerRows: 1,
                        // dontBreakRows: true,
                        // keepWithHeaderRows: 1,
                        alignment: 'center',
                        widths: [500],
                        fillColor: '#eeeeff',
                        body: [
                            [{
                                text: 'DESCRIPCION DETALLADA DE LOS HECHOS',
                                style: 'tableHeader',
                                alignment: 'center',
                                fillColor: '#cccccc'
                            }],
                            [
                                {text: details, style: 'tableHeader'}
                            ]
                        ]
                    }
                },
                {
                    text: '\n\n', fontSize: 14, bold: true, margin: [0, 20, 0, 8],

                    style: 'header',
                    alignment: 'right'
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

    getBase64ImageFromURL(url) {
        let canvas;
        let img;
        let ctx;
        let dataURL;
        return new Promise((resolve, reject) => {
            img = new Image();
            img.setAttribute('crossOrigin', 'anonymous');

            img.onload = () => {
                canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;

                ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0);

                dataURL = canvas.toDataURL('image/png');

                resolve(dataURL);
            };

            img.onerror = error => {
                reject(error);
            };

            img.src = url;
        });
    }

    deleteProducto(guard: Guard) {
        this.firestoreService.deleteDoc(this.path, guard.uid);
    }

    guardarUser() {
        this.firestoreService.createDocument(this.newGuard, this.path, this.newGuard.uid);
    }

}
