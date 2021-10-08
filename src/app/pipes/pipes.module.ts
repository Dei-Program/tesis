import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PipesPipe} from './pipes.pipe';
import { FiltroFechaPipe } from './filtro-fecha.pipe';


@NgModule({
    declarations: [PipesPipe, FiltroFechaPipe],
    exports: [PipesPipe, FiltroFechaPipe]
})
export class PipesModule {
}
