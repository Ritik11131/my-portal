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
          label:'Edit',
          tooltip: 'Update',
          icon: 'pi pi-pen-to-square',
          severity: 'contrast'
        }
      ]
    },
    rows:10,
    size:'small',
    paginator: true,
    globalFilter: true,
    selectionMode: 'single',
    minWidth:'75rem',
    showCurrentPageReport: true,
    rowHover: true,
    responsive: true,
    expandable: true,
    showExpandableActions: true,
    expandableColumns: [
      { field: 'vehicleNo', header: 'Vehicle No.', displayType:'chip' },
      { field: 'deviceImei', header: 'Imei', },
      { field: 'deviceId', header: 'Device ID' },
      { field: 'simPhoneNumber', header: 'Primary Mob Number', },
      { field: 'installationOn', header: 'Installation Date', displayType: 'date' },
    ],
    expandableActions: {
      customButtons: [
        {
          id: 1,
          key: 'nested_edit',
          label:'Edit',
          tooltip: 'Update',
          icon: 'pi pi-pen-to-square',
          severity: 'contrast'
        }
      ]
    }

  };

  export const deviceTableConfig: TableConfig = {
    columns: [
      { field: 'vehicleNo', header: 'Vehice No', displayType:'chip' },
      { field: 'deviceImei', header: 'Imei', },
      { field: 'simPhoneNumber', header: 'Primary Mob Number', },
      { field: 'simSecPhoneNumber', header: 'Secondary Mob Number', },
      { field: 'installationOn', header: 'Installation Date', displayType:'date' },
      // { field: 'creationTime', header: 'Created On', displayType:'date' },
    ],
    toolbar: {
      showNew: true,
      showExport: true,
      customButtons: [
        {
          id: 1,
          key: 'link_command',
          label:'Link / Command',
          tooltip: 'Link Device / Send Command',
          makeDisabledWithCheckboxes: true,
          severity: 'contrast'
        }
      ]
    },
    actions: {
      customButtons: [
        {
          id: 1,
          key: 'edit',
          label:'Edit',
          tooltip: 'Update',
          icon: 'pi pi-pen-to-square',
          severity: 'contrast'
        }
      ]
    },
    rows:10,
    size:'small',
    paginator: true,
    globalFilter: true,
    selectionMode: 'multiple',
    minWidth:'75rem',
    showCurrentPageReport: true,
    rowHover: true,
    responsive: true,
    expandable: true,
    showExpandableActions: true,
    expandableColumns: [
      { field: 'userName', header: 'User Name', },
      { field: 'loginId', header: 'Login ID' },
      { field: 'email', header: 'Email', },
      { field: 'mobileNo', header: 'Mobile Number', },
    ],
    expandableActions: {
      customButtons: [
        {
          id: 1,
          key: 'nested_edit',
          label:'Edit',
          tooltip: 'Update',
          icon: 'pi pi-pen-to-square',
          severity: 'contrast'
        },
        {
          id: 2,
          key: 'nested_unlink',
          label:'Unlink',
          tooltip: 'Unlink User',
          icon: 'pi pi-link',
          severity: 'contrast'
        }
      ]
    }
  };

  export const reportTableConfig: TableConfig = {
    columns: [
      { field: 'vehicleNo', header: 'Vehice No', displayType:'chip' },
      { field: 'dateDis', header: 'Date', displayType:'date' },
      { field: 'distance', header: 'Distance'}
    ],
    rows:10,
    size:'small',
    paginator: true,
    globalFilter: true,
    selectionMode: 'single',
    minWidth:'75rem',
    showCurrentPageReport: true,
    rowHover: true,
    responsive: true
  };

  export const rawDataTableConfig: TableConfig = {
    columns: [
      { field: 'vehicleNo', header: 'Last Time', displayType:'chip' },
      { field: 'dateDis', header: 'Device ID', displayType:'date' },
      { field: 'distance', header: 'Raw Data'}
    ],
    toolbar: {
      showDropdown: {
        enabled: true,
        options:[],
        placeholder:'Select a Vehicle'
      },
    },
    rows:10,
    size:'small',
    paginator: true,
    globalFilter: true,
    selectionMode: 'single',
    minWidth:'75rem',
    showCurrentPageReport: true,
    rowHover: true,
    responsive: true
  };