import { Injectable, signal, type TemplateRef } from "@angular/core"
import { ConfirmationService, MessageService } from "primeng/api"


export interface ConfirmDialogOptions {
  message: string;
  header?: string;
  icon?: string;
  acceptLabel?: string;
  rejectLabel?: string;
  acceptButtonStyleClass?: string;
  rejectButtonStyleClass?: string;
  acceptVisible?: boolean;
  rejectVisible?: boolean;
  rejectButtonProps?: any;
  acceptButtonProps?: any;  
}


@Injectable({
  providedIn: "root",
})
export class UiService {
  private isDrawerOpenSignal = signal(false)
  private drawerContentSignal = signal<TemplateRef<any> | null>(null)
  private drawerHeaderSignal = signal<string>("Drawer")

  isDrawerOpen = this.isDrawerOpenSignal.asReadonly()
  drawerContent = this.drawerContentSignal.asReadonly()
  drawerHeader = this.drawerHeaderSignal.asReadonly()

  constructor(private messageService: MessageService, private confirmationService: ConfirmationService) {}

  openDrawer(content: TemplateRef<any>, header = "Drawer") {
    this.drawerContentSignal.set(content)
    this.drawerHeaderSignal.set(header)
    this.isDrawerOpenSignal.set(true)
  }

  closeDrawer() {
    this.isDrawerOpenSignal.set(false)
    this.drawerContentSignal.set(null)
    this.drawerHeaderSignal.set("Drawer")
  }

  showToast(severity: "success" | "info" | "warn" | "error", summary: string, detail: string) {
    this.messageService.add({ severity, summary, detail })
  }


  /**
   * Open a confirmation dialog with default or custom options
   * @param options Confirmation dialog configuration
   * @returns Observable that emits true if confirmed, false if rejected
   */
  confirm(options: ConfirmDialogOptions): Promise<boolean> {
    // Default options
    const defaultOptions = {
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Yes',
      rejectLabel: 'No',
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Save',
        severity: 'primary',
        outlined: false
      },
    
      acceptVisible: true,
      rejectVisible: true,
      closeOnEscape: true,
    };

    // Merge default and provided options
    const mergedOptions = { ...defaultOptions, ...options };

    return new Promise<boolean>((resolve) => {
      this.confirmationService.confirm({
        message: mergedOptions.message,
        header: mergedOptions.header,
        icon: mergedOptions.icon,
        acceptLabel: mergedOptions.acceptLabel,
        rejectLabel: mergedOptions.rejectLabel,
        rejectButtonProps: mergedOptions.rejectButtonProps,
        acceptButtonProps: mergedOptions.acceptButtonProps,
        accept: () => {
          resolve(true);
        },
        reject: () => {
          resolve(false);
        }
      });
    });
  }

  /**
   * Predefined confirmation dialogs with specific use cases
   */
  confirmDelete(itemName: string): Promise<boolean> {
    return this.confirm({
      message: `Are you sure you want to delete ${itemName}?`,
      header: 'Delete Confirmation',
      icon: 'pi pi-trash text-red-500',
      acceptLabel: 'Delete',
      acceptButtonStyleClass: 'p-button-danger'
    });
  }

  confirmUpdate(itemName: string): Promise<boolean> {
    return this.confirm({
      message: `Do you want to update ${itemName}?`,
      header: 'Update Confirmation',
      icon: 'pi pi-pencil text-blue-500',
      acceptLabel: 'Update',
      acceptButtonStyleClass: 'p-button-primary'
    });
  }

  confirmAction(action: string, details?: string): Promise<boolean> {
    return this.confirm({
      message: `Are you sure you want to ${action}?${details ? ` ${details}` : ''}`,
      header: 'Action Confirmation',
      icon: 'pi pi-info-circle text-yellow-500'
    });
  }
}

