import { DeviceService } from '@/app/core/services/device.service';
import { DropdownService } from '@/app/core/services/dropdown.service';
import { HttpService } from '@/app/core/services/http.service';
import { UiService } from '@/app/core/services/ui.service';
import { UserService } from '@/app/core/services/user.service';
import { FormData, FormField, GenericFormComponent } from '@/app/shared/components/generic-form/generic-form.component';
import { GenericTableComponent } from '@/app/shared/components/generic-table/generic-table.component';
import { deviceTableConfig, userTableConfig } from '@/app/shared/config/table.config';
import { NEW_DEVICE_FORM_JSON } from '@/app/shared/constants/device';
import { NEW_USER_FORM_JSON } from '@/app/shared/constants/user';
import { IDevice, IMutateDevice } from '@/app/shared/interfaces/device.interfaces';
import { TableConfig } from '@/app/shared/interfaces/table.interface';
import { IUser, IUserMutate } from '@/app/shared/interfaces/user.interfaces';
import { Component, signal, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-device',
  imports: [GenericTableComponent, GenericFormComponent],
  templateUrl: './device.component.html',
  styleUrl: './device.component.css'
})
export class DeviceComponent {

   @ViewChild("createUpdateDeviceContent") createUpdateDeviceContent!: TemplateRef<any>;
   @ViewChild("updateLinkedUserContent") updateLinkedUserContent!: TemplateRef<any>;

  
  
    tableConfig: TableConfig = deviceTableConfig;
    tableData: IDevice[] = [];
    loading: boolean = false;
    deviceFormFields = signal<FormField[]>(NEW_DEVICE_FORM_JSON);
    initialData: FormData = {};
    nestedInitialData: FormData = {};
    device!: FormData;
    nestedDevice!: FormData;
    expandedRows: { [key: string]: boolean } = {};
    expandLoading: { [key: string]: boolean } = {};
    loadedExpandedData: { [key: string]: boolean } = {}; // Track which rows have loaded data
    userFormFields = signal<FormField[]>(NEW_USER_FORM_JSON);

  
    constructor(private uiService: UiService, private httpService: HttpService, private userService: UserService, 
                private deviceService:DeviceService, private dropdownService:DropdownService) { }
  
    ngOnInit(): void {
      this.loadDeviceService();
    }
  
  
    async loadDeviceService() {
      await this.operateDeviceList();
    }
  
  
    async operateDeviceList() {
      this.loading = true;
      try {
        const data: IDevice[] = await this.deviceService.getDeviceList();
        this.tableData = data;
        this.loading = false;
      } catch (error) {
        this.uiService.showToast('error', 'Error', 'Failed to fetch device list');
        this.loading = false;
      }
    }
  
  
  
    async handleNewUpdateDevice(): Promise<void> {
      this.initialData = {};
      await this.updateFormField();
      this.uiService.openDrawer(this.createUpdateDeviceContent, "Device Management");
    }
  
    async handleConfigActionClick(event : {action: string, item: any}): Promise<void> {
      console.log(event);
      this.initialData = this.device = event.item;
      await this.updateFormField();
      this.uiService.openDrawer(this.createUpdateDeviceContent, "Device Management");
    }
  
    async handleFormSubmit(formData: FormData): Promise<void> {
      console.log('Form submitted:', formData);

      const { id } = formData
    
      await this.handleCreateUpdateDevice(formData, id);
    }
  
    async handleCreateUpdateDevice(payload: IMutateDevice | FormData, id: number ) : Promise<void> {
      try {
        const response = id ? await this.deviceService.updateDevice(id, payload as IMutateDevice) : await this.deviceService.createDevice(payload as IMutateDevice);
        console.log(response);
        this.uiService.closeDrawer();
        this.uiService.showToast('success', 'Success', `User ${id ? 'updated' : 'created'} successfully`);
        this.loadDeviceService();
      } catch (error: any) {
        console.log(error);
        this.uiService.showToast('error', 'Error', 'Failed to create user');
      }
    }


    async updateFormField(): Promise<void> {
      const [deviceTypes, vehicleTypes, operatorTypes] = await Promise.all([
        this.dropdownService.getDeviceTypeOptions(),
        this.dropdownService.getVehicleTypeOptions(),
        this.dropdownService.getOperatorTypeOptions()
      ]);
       // Update the signal with the fetched options
       this.deviceFormFields.update((fields) => {
        return fields.map((field) => {
          if (field.type === 'dropdown') {
            switch (field.name) {
              case 'fkDeviceType':
                return { ...field, options: deviceTypes.map((devicetype) => {
                  return {
                    ...devicetype,
                    value: devicetype.id
                  }
                }) };

              case 'fkVehicleType':
                return {... field, options: vehicleTypes.map((vehicletype) => {
                  return {
                    ...vehicletype,
                    value: vehicletype.id
                  }
                })}
              
                default :
                return {... field, options: operatorTypes.map((operatortype) => {
                  return {
                    ...operatortype,
                    value: operatortype.id
                  }
                })}
            }
          }
          return field;
        });
      });
    }


    async onRowExpand(event: any): Promise<void> {
      console.log(event);
      
      const item = event.data;
      const itemId = item.id;
  
      // Check if data is already loaded for this row
      if (!this.loadedExpandedData[itemId]) {
        this.expandLoading[itemId] = true;
  
        try {
          const response = await this.deviceService.getUsersByDeviceId(itemId);
          item.nested = response;
          this.loadedExpandedData[itemId] = true;
        } catch (error: any) {
          this.uiService.showToast('error', 'Error', error.error.data || 'Failed to create user');
          item.nested = []; // Set empty array on error
        } finally {
          this.expandLoading[itemId] = false;
        }
      }
      // console.log(this.loadedExpandedData);
      
    }
  
    onRowCollapse(event: any) {
      // Optional: You can free memory here if needed for large datasets
      const itemId = event.data.id;
      // Uncomment the following line if you want to clear data when collapsed
      delete this.loadedExpandedData[itemId];
    }

    async handleLinkedDeviceFormSubmit(formData: FormData): Promise<void> {
      console.log('Form submitted:', formData);
      const { id , loginId, userName, email, mobileNo, password, userType } = formData;
      const payload: IUserMutate = {
        loginId, fkParentId: 0, fkCustomerId: 0,
        userName, email, password, mobileNo, userType, timezone: "05:30",
        creationTime: Math.floor(Date.now() / 1000).toString(), // Current timestamp in seconds
        lastUpdateOn: Math.floor(Date.now() / 1000).toString(), // Current timestamp in seconds
        isActive: 1
      };
  
       await this.handleCreateUpdateUser(id ? formData : payload, id);
    }

    async handleCreateUpdateUser(payload: IUserMutate | FormData, id: number ) : Promise<void> {
      try {
        const response = id ? await this.userService.updateUser(id, payload as IUserMutate) : await this.userService.createUser(payload as IUserMutate);
        console.log(response);
        this.uiService.closeDrawer();
        this.uiService.showToast('success', 'Success', `User ${id ? 'updated' : 'created'} successfully`);
        await this.loadDeviceService();
        this.expandedRows = {};
        this.loadedExpandedData = {};
      } catch (error: any) {
        console.log(error);
        this.uiService.showToast('error', 'Error', 'Failed to create user');
      }
    }

    async handleNestedConfigActionClick(event : {action: string, item: any}): Promise<void> {
      switch (event.action) {
        case 'nested_edit':
          this.nestedInitialData = this.nestedDevice = event.item;
          this.uiService.openDrawer(this.updateLinkedUserContent, "Linked User Management");
          break;

        case 'nested_unlink':
          console.log('Unlink clicked');
          break;
      }
    }

}
