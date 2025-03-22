import { HttpService } from '@/app/core/services/http.service';
import { UiService } from '@/app/core/services/ui.service';
import { UserService } from '@/app/core/services/user.service';
import { FormData, FormField, GenericFormComponent } from '@/app/shared/components/generic-form/generic-form.component';
import { GenericTableComponent } from '@/app/shared/components/generic-table/generic-table.component';
import { userTableConfig } from '@/app/shared/config/table.config';
import { NEW_USER_FORM_JSON } from '@/app/shared/constants/user';
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


  tableConfig: TableConfig = userTableConfig;
  tableData: IUser[] = [];
  loading: boolean = false;
  userFormFields = signal<FormField[]>(NEW_USER_FORM_JSON);
  initialData: FormData = {};
  user!: FormData;
  expandedRows: { [key: string]: boolean } = {};
  expandLoading: { [key: string]: boolean } = {};
  loadedExpandedData: { [key: string]: boolean } = {}; // Track which rows have loaded data

  constructor(private uiService: UiService, private httpService: HttpService, private userService: UserService) { }

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

  async handleCreateUpdateUser(payload: IUserMutate | FormData, id: number ) : Promise<void> {
    try {
      const response = id ? await this.userService.updateUser(id, payload as IUserMutate) : await this.userService.createUser(payload as IUserMutate);
      console.log(response);
      this.uiService.closeDrawer();
      this.uiService.showToast('success', 'Success', `User ${id ? 'updated' : 'created'} successfully`);
      this.loadUserService();
    } catch (error: any) {
      console.log(error);
      this.uiService.showToast('error', 'Error', 'Failed to create user');
    }
  }

  async onRowExpand(event: any): Promise<void> {
    console.log(event);
    
    const item = event.data;
    const itemId = item.id;

    // Check if data is already loaded for this row
    if (!this.loadedExpandedData[itemId]) {
      this.expandLoading[itemId] = true;

      try {
        const response = await this.userService.getUserById(itemId);
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

}
