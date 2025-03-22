import { DeviceService } from '@/app/core/services/device.service';
import { RawDataService } from '@/app/core/services/raw-data.service';
import { UiService } from '@/app/core/services/ui.service';
import { GenericTableComponent } from '@/app/shared/components/generic-table/generic-table.component';
import { rawDataTableConfig } from '@/app/shared/config/table.config';
import { IDevice } from '@/app/shared/interfaces/device.interfaces';
import { TableConfig } from '@/app/shared/interfaces/table.interface';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-raw-data',
  imports: [GenericTableComponent],
  templateUrl: './raw-data.component.html',
  styleUrl: './raw-data.component.css'
})
export class RawDataComponent implements OnInit {

  tableConfig: TableConfig = rawDataTableConfig;
  loading: boolean = false;
  selectedVehicle: number | null = null;
  vehicleSelectOptions: { name: string, value: any }[] = [];


  constructor(private deviceService: DeviceService, private uiService: UiService, private rawDataService: RawDataService) { }

  ngOnInit(): void {
    this.fetchandOperateVehicles()
  }

  async fetchandOperateVehicles(): Promise<void> {
    this.loading = true;
    try {
      const data: IDevice[] = await this.deviceService.getDeviceList();
      this.vehicleSelectOptions = data.map(({ deviceImei, vehicleNo }) => ({ name: vehicleNo, value: deviceImei }));
      this.selectedVehicle = this.vehicleSelectOptions.length ? this.vehicleSelectOptions[0].value : null;
      if (this.tableConfig.toolbar?.showDropdown) {
        this.tableConfig.toolbar.showDropdown.options = this.vehicleSelectOptions;
      }
      this.loading = false;
    } catch (error) {
      this.uiService.showToast('error', 'Error', 'Failed to fetch device list');
      this.loading = false;
    }
  }


  async handleVehicleChange(event: { originalEventy: PointerEvent, value: { name: any, value: any } }): Promise<void> {
    console.log(event);
    const { value } = event?.value
    console.log(value);
    
    this.loading = true;
    try {
      const response = await this.rawDataService.fetchRawLastPoint({ deviceId: value });
      console.log(response);
      this.loading = false;
    } catch (error: any) {
      this.uiService.showToast('error', 'Error', error.error.data ?? 'Failed to fetch device list');
      this.loading = false;
    }

  }

}
