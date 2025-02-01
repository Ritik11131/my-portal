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

  @ViewChild("createUserContent") createUserContent!: TemplateRef<any>;


  tableConfig: TableConfig = userTableConfig;
  tableData: IUser[] = [];
  loading: boolean = false;
  userFormFields = signal<FormField[]>(NEW_USER_FORM_JSON);

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



  handleNewUser() {
    this.uiService.openDrawer(this.createUserContent, "User Management");
  }

  async handleFormSubmit(formData: FormData): Promise<void> {
    console.log('Form submitted:', formData);
    const { loginId, userName, email, mobileNo, password, userType } = formData;

    const payload: IUserMutate = {
      id: 0, loginId, fkParentId: 0, fkCustomerId: 0,
      userName, email, password, mobileNo, userType, timezone: "05:30",
      creationTime: Math.floor(Date.now() / 1000).toString(), // Current timestamp in seconds
      lastUpdateOn: Math.floor(Date.now() / 1000).toString(), // Current timestamp in seconds
      isActive: 1
    };

     try {
          const response = await this.userService.createUser(payload);
          console.log(response);
          this.uiService.closeDrawer();
          this.uiService.showToast('success', 'Success', 'Parent created successfully');
          this.loadUserService();
        } catch (error: any) {
          console.log(error);
          this.uiService.showToast('error', 'Error', 'Failed to create parent');
        }

  }

}
