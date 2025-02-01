export const NEW_USER_FORM_JSON = [
    {
      label: "Username",
      name: "userName",
      placeholder: "Enter your username",
      type: "text",
      isRequired: true,
      validate: (value: string) => {        
        if (value.length < 3) {
          return "Username must be at least 3 characters long";
        }
        return null;
      },
    },
    {
      label: "Email",
      name: "email",
      placeholder: "Enter your email",
      type: "email",
      isRequired: true,
      validate: (value: string) => {
        const emailPattern = /\S+@\S+\.\S+/;
        return !emailPattern.test(value) ? "Please enter a valid email" : null;
      },
    },
    {
      label: "Contact No",
      name: "mobileNo",
      placeholder: "Enter your contact number",
      type: "text",
      isRequired: true,
      validate: (value: string) => {
        return !/^\d{10}$/.test(value) ? "Contact number must be 10 digits" : null;
      },
    },
    {
      label: "Login ID",
      name: "loginId",
      placeholder: "Enter your login ID",
      type: "text",
      isRequired: true,
      validate: (value: string) => (value.length < 3 ? "Login ID must be at least 3 characters long" : null),
    },
    {
      label: "Password",
      name: "password",
      placeholder: "Enter your password",
      type: "text",
      isRequired: true,
      validate: (value: string) => {
        if (value.length < 6) {
          return "Password must be at least 6 characters long";
        }
        if (!/[A-Z]/.test(value)) {
          return "Password must contain at least one uppercase letter";
        }
        if (!/\d/.test(value)) {
          return "Password must contain at least one number";
        }
        return null;
      },
    },
    {
      label: "User Type",
      name: "userType",
      placeholder: "",
      type: "radio",
      options: [
        {
          label: "Customer",
          name: "customer",
          value: 2
        },
        {
          label: "Dealer",
          name: "dealer",
          value: 1
        },
      ],
    },
  ];
  