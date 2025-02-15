import { FormsModule } from '@angular/forms';
import { DeviceService } from '@/app/core/services/device.service';
import { UiService } from '@/app/core/services/ui.service';
import { GenericTableComponent } from '@/app/shared/components/generic-table/generic-table.component';
import { reportTableConfig } from '@/app/shared/config/table.config';
import { IDevice } from '@/app/shared/interfaces/device.interfaces';
import { TableConfig } from '@/app/shared/interfaces/table.interface';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { DatePicker } from 'primeng/datepicker';

@Component({
  selector: 'app-report-details',
  imports: [FormsModule,CommonModule,ButtonModule, SelectModule,GenericTableComponent,DatePicker],
  templateUrl: './report-details.component.html',
  styleUrl: './report-details.component.css'
})
export class ReportDetailsComponent {

  report!:any;
  tableConfig: TableConfig = reportTableConfig;
  loading: boolean = false;
  vehicleSelectOptions: { name: string, value: number}[] = [];
  selectedVehicle: number | null = null;
  date: Date[] | undefined = [
    new Date(new Date().setHours(0, 0, 0, 0)),  // Start of the day (00:00:00)
    new Date(new Date().setHours(23, 59, 59, 999)) // End of the day (23:59:59)
  ];
  maxDate!: Date;
  
  constructor(private activatedRoute: ActivatedRoute, private deviceService:DeviceService, private uiService:UiService) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(async ({ report }) => {
      console.log(report);
      this.report = report; // Access the resolved data
      await this.fetchandOperateVehicles();
      this.maxDate = new Date();
    });
  }

   async fetchandOperateVehicles(): Promise<void> {
        this.loading = true;
        try {
          const data: IDevice[] = await this.deviceService.getDeviceList();
          this.vehicleSelectOptions = data.map(({ id, vehicleNo }) => ({ name: vehicleNo, value: id }));
          this.selectedVehicle = this.vehicleSelectOptions.length ? this.vehicleSelectOptions[0].value : null;          
          this.loading = false;
        } catch (error) {
          this.uiService.showToast('error', 'Error', 'Failed to fetch device list');
          this.loading = false;
        }
      }

      loadReport() {
        this.loading = true
        console.log(this.date);
        
      }
}
