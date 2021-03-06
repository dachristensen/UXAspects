import { Component } from '@angular/core';
import { ChartOptions } from 'chart.js';
import { ColorService } from '@ux-aspects/ux-aspects';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    colors = [
        {
            backgroundColor: [
                this._colorService.getColor('accent').toRgb(),
                this._colorService.getColor('accent').setAlpha(0.5).toRgba(),
                this._colorService.getColor('grey5').toRgb()
            ]
        }
    ];

    options: ChartOptions = {
        tooltips: {
            enabled: false
        },
        elements: {
            arc: {
                borderWidth: 0
            }
        },
        responsive: false,
        cutoutPercentage: 70
    };

    fixedCards: FixedCard[] = [
        {
            title: 'All',
            count: 8
        },
        {
            title: 'No Category',
            count: 2
        }
    ];

    draggableCards: DraggableCard[] = [
        {
            title: 'Protected',
            count: 6,
            subtitle: '15% unique, 10% shared',
            description: 'NYC Preliminary Production 1 created from the protected items.',
            chart: {
                count: 13.2,
                segments: [45, 25, 30]
            }
        },
        {
            title: 'Privileged',
            count: 4,
            subtitle: '7% unique, 10% shared',
            description: 'NYC Production 2 created as a follow up to Production 1.',
            chart: {
                count: 6.5,
                segments: [10, 5, 85]
            }
        },
        {
            title: 'Relevant',
            count: 2,
            subtitle: '65% unique, 12% shared',
            description: 'NYC Production 3 Lorem ipsum dolor sit amet, consectetur…',
            chart: {
                count: 33.2,
                segments: [60, 15, 25]
            }
        },
        {
            title: 'Proprietary',
            count: 3,
            subtitle: '7% unique, 10% shared',
            description: 'NYC Production 4 Lorem ipsum dolor sit amet, consectetur…',
            chart: {
                count: 5.4,
                segments: [10, 5, 85]
            }
        },
        {
            title: 'Reviewed',
            count: 2,
            subtitle: '65% unique, 12% shared',
            description: 'NYC Production 3 Lorem ipsum dolor sit amet, consectetur…',
            chart: {
                count: 33.2,
                segments: [60, 10, 30]
            }
        }
    ];

    active: FixedCard | DraggableCard = this.draggableCards[0];

    constructor(private _colorService: ColorService) { }

    remove(card: DraggableCard): void {
        this.draggableCards = this.draggableCards.filter(_card => _card !== card);
    }

    moveDown(card: DraggableCard): void {
        const index = this.draggableCards.indexOf(card);
        this.swap(index, index + 1);
    }

    moveUp(card: DraggableCard): void {
        const index = this.draggableCards.indexOf(card);
        this.swap(index, index - 1);
    }

    private swap(source: number, target: number): void {

        // perform boundary checks
        if (target < 0 || target > this.draggableCards.length - 1) {
            return;
        }

        const temp = this.draggableCards[target];
        this.draggableCards[target] = this.draggableCards[source];
        this.draggableCards[source] = temp;
    }
}

export interface FixedCard {
    title: string;
    count: number;
}

export interface DraggableCard {
    title: string;
    count: number;
    subtitle: string;
    description: string;
    chart: {
        count: number;
        segments: number[];
    };
}