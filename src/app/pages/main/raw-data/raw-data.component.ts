import { GenericTableComponent } from '@/app/shared/components/generic-table/generic-table.component';
import { rawDataTableConfig } from '@/app/shared/config/table.config';
import { TableConfig } from '@/app/shared/interfaces/table.interface';
import { Component } from '@angular/core';

@Component({
  selector: 'app-raw-data',
  imports: [GenericTableComponent],
  templateUrl: './raw-data.component.html',
  styleUrl: './raw-data.component.css'
})
export class RawDataComponent {

   tableConfig: TableConfig = rawDataTableConfig;
   loading: boolean = false;

}
