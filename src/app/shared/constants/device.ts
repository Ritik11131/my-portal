export const NEW_DEVICE_FORM_JSON = [
    {
      label: "Unique Id",
      name: "deviceId",
      placeholder: "Enter unique ID",
      type: "text",
      isRequired: true,
    },
    {
      label: "Device IMEI",
      name: "deviceImei",
      placeholder: "Enter device IMEI",
      type: "text",
      isRequired: true,
    },
    {
      label: "Device Type",
      name: "fkDeviceType",
      placeholder: "Select device type",
      type: "dropdown",
      options: [
        { label: "GIPL-04", value: "GIPL-04" },
        // Add more device types if needed
      ],
      isRequired: true,
    },
    {
      label: "Vehicle Type",
      name: "fkVehicleType",
      placeholder: "Select vehicle type",
      type: "dropdown",
      options: [
        { label: "Car", value: "Car" },
        // Add more vehicle types if needed
      ],
      isRequired: true,
    },
    {
      label: "Primary Sim Number",
      name: "simPhoneNumber",
      placeholder: "Enter primary SIM number",
      type: "text",
      isRequired: true,
      validate: (value: string) => {
        return !/^\d{10,15}$/.test(value) ? "Primary SIM number must be 10-15 digits" : null;
      },
    },
    {
      label: "Select Primary Sim Operator",
      name: "fkSimOperator",
      placeholder: "Select primary SIM operator",
      type: "dropdown",
      options: [
        { label: "Airtel", value: "Airtel" },
        { label: "Jio", value: "Jio" },
        { label: "VI", value: "VI" },
        // Add more operators if needed
      ],
      isRequired: true,
    },
    {
      label: "Secondary Sim Number",
      name: "simSecPhoneNumber",
      placeholder: "Enter secondary SIM number",
      type: "text",
      isRequired: true,
      validate: (value: string) => {
        return value && !/^\d{10,15}$/.test(value) ? "Secondary SIM number must be 10-15 digits" : null;
      },
    },
    {
      label: "Select a Secondary Sim Operator",
      name: "fkSecSimOperator",
      placeholder: "Select secondary SIM operator",
      type: "dropdown",
      options: [
        { label: "Airtel", value: "Airtel" },
        { label: "Jio", value: "Jio" },
        { label: "VI", value: "VI" },
        // Add more operators if needed
      ],
      isRequired: true,
    },
    {
      label: "Vehicle Number",
      name: "vehicleNo",
      placeholder: "Enter vehicle number",
      type: "text",
      isRequired: true,
    },
    {
      label: "Description",
      name: "description",
      placeholder: "Enter description",
      type: "textarea",
      isRequired: false,
    },
  ];


  export const SEND_COMMAND_FORM_JSON = [
    {
      label: "Send Command",
      name: "command",
      placeholder: "Command to Send?",
      type: "text",
      isRequired: true,
    },
  ];

  export const LINK_DEVICE_FORM_JSON = [
    {
      label: "Device IMEI",
      name: "deviceImei",
      placeholder: "Enter device IMEI",
      type: "text",
      isRequired: true,
    },
    {
      label: "Device Type",
      name: "fkDeviceType",
      placeholder: "Select device type",
      type: "dropdown",
      options: [
        { label: "GIPL-04", value: "GIPL-04" },
        // Add more device types if needed
      ],
      isRequired: true,
    },
  ]
  