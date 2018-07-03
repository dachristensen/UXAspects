import { Component } from '@angular/core';
import { Conduit, ConduitZoneComponent } from '@ux-aspects/ux-aspects';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent extends ConduitZoneComponent {
    zoneId: string = 'root-zone';

    @Conduit({ id: 'show-zones', producesOutput: false })
    showZones = new BehaviorSubject(false);
}