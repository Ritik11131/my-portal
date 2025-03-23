import { DeviceService } from '@/app/core/services/device.service';
import { DropdownService } from '@/app/core/services/dropdown.service';
import { HttpService } from '@/app/core/services/http.service';
import { UiService } from '@/app/core/services/ui.service';
import { UserService } from '@/app/core/services/user.service';
import { FormData, FormField, GenericFormComponent } from '@/app/shared/components/generic-form/generic-form.component';
import { GenericTableComponent } from '@/app/shared/components/generic-table/generic-table.component';
import { userTableConfig } from '@/app/shared/config/table.config';
import { NEW_DEVICE_FORM_JSON } from '@/app/shared/constants/device';
import { NEW_USER_FORM_JSON } from '@/app/shared/constants/user';
import { IMutateDevice } from '@/app/shared/interfaces/device.interfaces';
import { TableConfig } from '@/app/shared/interfaces/table.interface';
import { IUser, IUserMutate } from '@/app/shared/interfaces/user.interfaces';
import { Component, signal, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-user',
  imports: [GenericTableComponent, GenericFormComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

  @ViewChild("createUpdateUserContent") createUpdateUserContent!: TemplateRef<any>;
  @ViewChild("updateLinkedDeviceContent") updateLinkedDeviceContent!: TemplateRef<any>;



  tableConfig: TableConfig = userTableConfig;
  tableData: IUser[] = [];
  loading: boolean = false;
  userFormFields = signal<FormField[]>(NEW_USER_FORM_JSON);
  initialData: FormData = {};
  nestedInitialData: FormData = {};
  user!: FormData;
  nestedUser!: FormData;
  expandedRows: { [key: string]: boolean } = {};
  expandLoading: { [key: string]: boolean } = {};
  loadedExpandedData: { [key: string]: boolean } = {}; // Track which rows have loaded data
  deviceFormFields = signal<FormField[]>(NEW_DEVICE_FORM_JSON);
  

  constructor(private uiService: UiService, private httpService: HttpService, private userService: UserService, private deviceService:DeviceService, private dropdownService:DropdownService) { }

  ngOnInit(): void {
    this.loadUserService();
  }


  async loadUserService() {
    await this.operateUsersList();
  }


  async operateUsersList() {
    this.loading = true;
    try {
      const data: IUser[] = await this.userService.getUsersList();
      this.tableData = data;
      this.loading = false;
    } catch (error) {
      this.uiService.showToast('error', 'Error', 'Failed to fetch user list');
      this.loading = false;
    }
  }



  handleNewUpdateUser() {
    this.initialData = {};
    this.uiService.openDrawer(this.createUpdateUserContent, "User Management");
  }

  async handleConfigActionClick(event : {action: string, item: any}): Promise<void> {
    console.log(event);
    try { 
      const response: IUserMutate = await this.userService.getUserById(event?.item?.id);
      console.log(response);      
      this.initialData = this.user = response;
      console.log(this.user,'user');
    } catch (error) {
      
    }
    this.uiService.openDrawer(this.createUpdateUserContent, "User Management");

  }


  async handleNestedConfigActionClick(event : {action: string, item: any}): Promise<void> {
    this.nestedInitialData = this.nestedUser = event.item;
    await this.updateFormField();
    this.uiService.openDrawer(this.updateLinkedDeviceContent, "Linked Device Management");
  }

  async handleFormSubmit(formData: FormData): Promise<void> {
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


   async handleLinkedDeviceFormSubmit(formData: FormData): Promise<void> {
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
          await this.loadUserService();
          this.expandedRows = {};
          this.loadedExpandedData = {};
        } catch (error: any) {
          console.log(error);
          this.uiService.showToast('error', 'Error', 'Failed to create user');
        }
      }



  async handleCreateUpdateUser(payload: IUserMutate | FormData, id: number ) : Promise<void> {
    try {
      const response = id ? await this.userService.updateUser(id, payload as IUserMutate) : await this.userService.createUser(payload as IUserMutate);
      console.log(response);
      this.uiService.closeDrawer();
      this.uiService.showToast('success', 'Success', `User ${id ? 'updated' : 'created'} successfully`);
      await this.loadUserService();
    } catch (error: any) {
      console.log(error);
      this.uiService.showToast('error', 'Error', 'Failed to create user');
    }
  }

  async onRowExpand(event: any): Promise<void> {
    console.log(event);
    
    const item = event.data;
    this.user = item;
    const itemId = item.id;

    // Check if data is already loaded for this row
    if (!this.loadedExpandedData[itemId]) {
      this.expandLoading[itemId] = true;

      try {
        const response = await this.deviceService.getDevicesByUserId(itemId);
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

}
