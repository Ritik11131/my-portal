export interface ColumnConfig {
    field: string;
    header: string;
    filter?: boolean;
    filterType?: 'text' | 'select' | 'date';
    displayType?: 'text' | 'image' | 'chip' | 'avatar' | 'rating' | 'currency' | 'date' | 'icon';
    width?: string;
    styleClass?: string;
    imageConfig?: {
      baseUrl?: string;
      width?: "normal" | "large" | "xlarge" | undefined;
      height?: string;
      alt?: string;
    };
    currencyCode?: string;
  }
  
  export interface ToolbarConfig {
    showNew?: boolean;
    showDropdown?:{ enabled:true, options:{name:any, value:any}[], placeholder:string};
    showDelete?: boolean;
    showImport?: boolean;
    showExport?: boolean;
    newLabel?: string;
    deleteLabel?: string;
    importLabel?: string;
    exportLabel?: string;
    customButtons?: {
      id:number;
      key:string;
      label?:string;
      tooltip: string;
      icon?: string;
      makeDisabledWithCheckboxes?: boolean;
      severity?: "success" | "info" | "warn" | "danger" | "help" | "primary" | "secondary" | "contrast" | null | undefined;
    }[];
  }
  
  export interface ActionsConfig {
    showEdit?: boolean;
    customButtons?: {
      id:number;
      key:string;
      tooltip: string;
      icon?: string;
      label?:string;
      severity?: "success" | "info" | "warn" | "danger" | "help" | "primary" | "secondary" | "contrast" | null | undefined;
    }[];
  }
  
  export interface TableConfig {
    columns: ColumnConfig[];
    toolbar?: ToolbarConfig;
    actions?:ActionsConfig;
    size: 'small' | 'large' | undefined;
    expandableActions?:ActionsConfig;
    showExpandableActions?:boolean;
    paginator?: boolean;
    minWidth:string;
    rows?: number;
    globalFilter?: boolean;
    selectionMode?: 'single' | 'multiple';
    showCurrentPageReport?: boolean;
    responsive?: boolean;
    styleClass?: string;
    rowHover?: boolean;
    expandableRowHover?: boolean;
    loading?: boolean;
    scrollable?: boolean;
    scrollHeight?: string;
    expandable?: boolean;
    expandableColumns?: ColumnConfig[];
  }