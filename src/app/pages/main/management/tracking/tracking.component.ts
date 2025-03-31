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



@Component({
  selector: 'app-tracking',
  imports: [CommonModule,AvatarModule,BadgeModule,IconField, InputIcon, FormsModule, InputTextModule, SelectButtonModule, LeafletModule, LeafletMarkerClusterModule],
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
  
  options: string[] = ['Chat', 'Call'];
  search: string = '';
  activeChat: string = '';
  chats = Array.from({ length: 50 }, (_, i) => ({
    name: `User ${i + 1}`,
    capName: `U${i + 1}`,
    image: i % 5 === 0 ? '' : `https://i.pravatar.cc/150?img=${i + 1}`,
    time: `${Math.floor(Math.random() * 12) + 1}:${Math.floor(Math.random() * 59) + 1} ${Math.random() > 0.5 ? 'AM' : 'PM'}`,
    lastMessage: `This is a sample message from User ${i + 1}.`,
    unreadMessageCount: Math.random() > 0.7 ? Math.floor(Math.random() * 10) + 1 : 0,
    active: Math.random() > 0.5,
  }));

   onMapReady(map: Map) {
      this.map = map;
      setTimeout(() => {
        this.markerClusters = markerClusterGroup();
        this.map.invalidateSize();
      }, 100);
    }

}
