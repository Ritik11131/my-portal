import { LeafletModule } from '@bluehalo/ngx-leaflet';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { SelectButtonModule } from 'primeng/selectbutton';
import { LeafletMarkerClusterModule } from '@bluehalo/ngx-leaflet-markercluster';
import { icon, latLng, marker, polyline, tileLayer, point, Map, markerClusterGroup, MarkerClusterGroup } from 'leaflet';
import 'leaflet.markercluster';
import { IstatusCards } from '@/app/shared/interfaces/dashboard.interfaces';
import { statusCards } from '@/app/shared/constants/dashboard';
import { IResponse } from '@/app/shared/interfaces/api.interfaces';
import { DashboardService } from '@/app/core/services/dashboard.service';
import { TagModule } from 'primeng/tag';



@Component({
  selector: 'app-tracking',
  imports: [CommonModule, AvatarModule, BadgeModule, IconField, InputIcon, FormsModule, InputTextModule, SelectButtonModule, LeafletModule, LeafletMarkerClusterModule, TagModule],
  templateUrl: './tracking.component.html',
  styleUrl: './tracking.component.css'
})
export class TrackingComponent {
  map!: Map;
  markerClusters!: MarkerClusterGroup;
  // Set the initial set of displayed layers (we could also use the leafletLayers input binding for this)
  mapOptions = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; Open Street',
        maxZoom: 18,
      })
    ],
    zoom: 5,
    center: latLng(27.54095593, 79.16035184)
  };
  statusCards: IstatusCards[] = statusCards;
  loading: boolean = false;


  options: string[] = ['Chat', 'Call'];
  vehicleList: any[] = [];
  search: string = '';
  activeVehicle: string = '';
  chats = Array.from({ length: 50 }, (_, i) => ({
    name: `User ${i + 1}`,
    capName: `U${i + 1}`,
    image: i % 5 === 0 ? '' : `https://i.pravatar.cc/150?img=${i + 1}`,
    time: `${Math.floor(Math.random() * 12) + 1}:${Math.floor(Math.random() * 59) + 1} ${Math.random() > 0.5 ? 'AM' : 'PM'}`,
    lastMessage: `This is a sample message from User ${i + 1}.`,
    unreadMessageCount: Math.random() > 0.7 ? Math.floor(Math.random() * 10) + 1 : 0,
    active: Math.random() > 0.5,
  }));


  constructor(private dashboardService: DashboardService) { }

  onMapReady(map: Map) {
    this.map = map;
    setTimeout(() => {
      this.markerClusters = markerClusterGroup();
      this.map.invalidateSize();
      this.loadDashboardService();

    }, 100);
  }

  async loadDashboardService() {
    this.loading = true;
    try {
      const response: IResponse = await this.dashboardService.fetchVehicleList();
      console.log(response);

      // Update Status Cards
      this.statusCards = this.updateStatusCards(response?.data, statusCards);

      // // Create Table Data
      // const {tableData,ignTrueCount } = this.createTableData(response?.data);
      // this.tableData = tableData;
      // this.activeOnes = `${ignTrueCount} Vehicles with IgnitionOn`;

      this.fillVehicleList(response?.data);

      // Plot Markers
      this.plotMarkers(response?.data);

      this.loading = false;

    } catch (error) {
      console.error(error);
      this.loading = false;
    }
  }

  updateStatusCards = (data: any[], statusCards: IstatusCards[]): IstatusCards[] => {
    // Reset counts to zero for all cards
    statusCards.forEach(card => (card.count = 0));

    // Iterate through response and update status card counts
    data.forEach(({ position }) => {
      const status = position.status.status; // E.g., "Customer recharge expired"
      switch (status) {
        case 'Customer recharge expired':
          statusCards.find(card => card.status === 'Offline')!.count++;
          break;
        case 'running':
          statusCards.find(card => card.status === 'Running')!.count++;
          break;
        case 'stop':
          statusCards.find(card => card.status === 'Stopped')!.count++;
          break;
        case 'Offline':
          statusCards.find(card => card.status === 'Offline')!.count++;
          break;
        case 'Never Connected':
          statusCards.find(card => card.status === 'Never Connected')!.count++;
          break;
        case 'dormant':
          statusCards.find(card => card.status === 'Idle')!.count++;
      }
    });

    // Update the Total card with the sum of all other card counts
    const totalCount = statusCards
      .filter(card => card.status !== 'Total')
      .reduce((sum, card) => sum + card.count, 0);
    statusCards.find(card => card.status === 'Total')!.count = totalCount;

    return statusCards;
  };


  plotMarkers = (response: any[]) => {
    this.map.removeLayer(this.markerClusters);
    this.markerClusters.clearLayers();

    response.forEach(item => {
      const { latitude, longitude } = item.position;
      const status = item.position.status.status;

      // Define marker colors based on status
      let markerColor = 'gray'; // Default color
      switch (status) {
        case 'Customer recharge expired':
          markerColor = 'red';
          break;
        case 'Running':
          markerColor = 'green';
          break;
        case 'stop':
          markerColor = 'red';
          break;
        case 'Offline':
          markerColor = 'grey';
          break;
        case 'dormant':
          markerColor = 'blue';
          break;
        default:
          markerColor = 'gray';
      }

      if (latitude && longitude) {
        // Create a marker
        const Marker = marker([latitude, longitude], {
          icon: icon({
            iconSize: [25, 41],
            iconAnchor: [13, 41],
            iconUrl: 'marker-icon.png',
            shadowUrl: 'marker-shadow.png',
            className: `marker-${markerColor}` // Add a class for custom styling
          })
        });

        // Add a tooltip to the marker
        Marker.bindTooltip(
          `Vehicle No: <b>${item.device.vehicleNo}</b><br>Status: ${status}<br>Last Update: ${item.position.deviceTime}`,
          { permanent: false }
        );

        // Add the marker to the cluster group
        this.markerClusters.addLayer(Marker);
      }
    });

    // Add the marker cluster group to the map
    this.map.addLayer(this.markerClusters);

    // Optionally fit the map bounds to the markers
    if (response.length > 0) {
      const bounds = this.markerClusters.getBounds();
      this.map.fitBounds(bounds, {
        maxZoom: 10,
      });
    }
  };

  fillVehicleList = (response: any[]) => {
    this.vehicleList = response.map(({ device, position }) => ({
      vehicleNo: device.vehicleNo,
      vehicleStatus: position?.status.status === 'Customer recharge expired' ? 'Offline' : position?.status.status,
      vehicleDuration: position?.status.duration,
      severity: (() => {
        switch (position?.status.status) {
          case 'Customer recharge expired':
            return 'secondary'; // Grey
          case 'stop':
            return 'danger'; // Red
          case 'Running':
            return 'success'; // Green
          case 'Offline':
            return 'secondary'; // Grey
          case 'dormant':
            return 'primary'; // Blue
          default:
            return 'contrast'; // Default Gray
        }
      })()
      
    }));
  };
  

}
