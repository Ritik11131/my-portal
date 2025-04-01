export const sideWindowVehicleDetails = [
    { 
      label: 'Last Update', 
      value: '7mins 42secs ago', 
      color: 'text-gray-800', 
      key: 'servertime', 
      apiValue: '2024-04-18T11:31:13' 
    },
    { 
      label: 'Status', 
      value: 'Customer recharge expired', 
      color: 'text-red-600', 
      key: 'status', 
      apiValue: 'Customer recharge expired' 
    },
    { 
      label: 'Ignition', 
      value: 'Off', 
      color: 'text-red-500', 
      key: 'ign', 
      apiValue: false 
    },
    { 
      label: 'Expires In', 
      value: '13 days', 
      color: 'text-gray-800', 
      key: 'nextRechargeDate', 
      apiValue: '2025-04-15' 
    },
    { 
      label: 'Location', 
      value: '147 m from Galaxy - Noida Greater Noida Link Road, Techzone 4, Greater Noida West, Greater Noida, Uttar Pradesh', 
      color: 'text-gray-800', 
      key: 'position', 
      apiValue: { lat: 28.605074, lng: 77.43158 } 
    },
    { 
      label: 'Power', 
      value: 'Not Found / Off', 
      color: 'text-red-600', 
      key: 'charge', 
      apiValue: false 
    },
    { 
      label: 'Ext. Battery', 
      value: '0.02V', 
      color: 'text-gray-800', 
      key: 'extVolt', 
      apiValue: 0.02 
    },
    { 
      label: 'Int. Battery', 
      value: '3.61V', 
      color: 'text-gray-800', 
      key: 'intVolt', 
      apiValue: 3.61 
    },
    { 
      label: 'GPS', 
      value: 'Available', 
      color: 'text-green-600', 
      key: 'sat', 
      apiValue: 14 
    },
    { 
      label: 'Speed', 
      value: '0.00 km/hr', 
      color: 'text-gray-800', 
      key: 'speed', 
      apiValue: 0 
    },
    { 
      label: 'Odometer', 
      value: '73.62 km', 
      color: 'text-gray-800', 
      key: 'totalDistance', 
      apiValue: 73618.28690310774 
    },
    { 
      label: 'Today KMs', 
      value: '0.00 km', 
      color: 'text-gray-800', 
      key: 'distance', 
      apiValue: 0 
    }
  ];


  export const sideWindowVehicleActions = [
    {
      label: 'Immobilize',
      icon: 'pi pi-lock',
      color: 'bg-red-500',
      action: 'immobilizeVehicle',
      description: 'Immobilize the vehicle'
    },
    {
      label: 'View History',
      icon: 'pi pi-history',
      color: 'bg-blue-500',
      hoverColor: 'hover:bg-blue-600',
      action: 'viewVehicleHistory',
      description: 'View the vehicle history'
    },
    {
      label: 'View on Google Maps',
      icon: 'pi pi-map',
      color: 'bg-green-500',
      hoverColor: 'hover:bg-green-600',
      action: 'navigateToGoogleMaps',
      description: 'Navigate to Google Maps'
    },
    {
        label: 'Immobilize',
        icon: 'pi pi-lock',
        color: 'bg-red-500',
        action: 'immobilizeVehicle',
        description: 'Immobilize the vehicle'
      },
      {
        label: 'View History',
        icon: 'pi pi-history',
        color: 'bg-blue-500',
        hoverColor: 'hover:bg-blue-600',
        action: 'viewVehicleHistory',
        description: 'View the vehicle history'
      },
      {
        label: 'View on Google Maps',
        icon: 'pi pi-map',
        color: 'bg-green-500',
        hoverColor: 'hover:bg-green-600',
        action: 'navigateToGoogleMaps',
        description: 'Navigate to Google Maps'
      }
  ];
  
  