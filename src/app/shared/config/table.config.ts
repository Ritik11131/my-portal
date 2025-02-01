import { TableConfig } from "@/app/shared/interfaces/table.interface";

export const dashboardTableConfig: TableConfig = {
    columns: [
      { field: 'vehicleNo', header: 'Vehice No', displayType:'chip' },
      { field: 'deviceId', header: 'Imei', },
      {
        field: 'ign',
        header: 'Ignition',
        displayType: 'icon',
      },
      { field: 'extVolt', header: 'Battery Voltage', },
      { field: 'deviceTime', header: 'Last Update',  displayType:'date' },

    ],
    rows:5,
    size:'small',
    paginator: true,
    globalFilter: true,
    selectionMode: 'single',
    minWidth:'55rem',
    showCurrentPageReport: true,
    rowHover: true,
    responsive: true
  };

  export const userTableConfig: TableConfig = {
    columns: [
      { field: 'userName', header: 'User Name', },
      { field: 'loginId', header: 'Login ID' },
      { field: 'email', header: 'Email', },
      { field: 'mobileNo', header: 'Mobile Number', },
      { field: 'userType', header: 'User Type', displayType: 'chip' },
      { field: 'isActive', header: 'Status', displayType: 'icon' },

    ],
    toolbar: {
      showNew: true,
    },
    actions: {
      customButtons: [
        {
          id: 1,
          key: 'edit',
          tooltip: 'Update',
          icon: 'pi pi-user-edit',
          severity: 'contrast'
        }
      ]
    },
    size:'small',
    paginator: true,
    globalFilter: true,
    selectionMode: 'single',
    minWidth:'75rem',
    showCurrentPageReport: true,
    rowHover: true,
    responsive: true
  };