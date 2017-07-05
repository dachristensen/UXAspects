import { DashboardModule } from './../../../../../../src/components/dashboard/dashboard.module';
import { SparkModule } from './../../../../../../src/components/spark/spark.module';
import { NgModule, ComponentFactoryResolver } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DocumentationComponentsModule } from '../../../../components/components.module';
import { ComponentsPdfExportComponent } from './pdf-export/pdf-export.component';
import { DocumentationCategoryComponent } from '../../../../components/documentation-category/documentation-category.component';
import { ResolverService, DocumentationPage } from '../../../../services/resolver/resolver.service';
import { PdfExportModule } from '../../../../../../src/components/pdf-export/pdf-export.module';
import { ChartsModule } from 'ng2-charts';
import { CommonModule } from '@angular/common';
import { TabsModule } from 'ngx-bootstrap/tabs';

const SECTIONS = [
    ComponentsPdfExportComponent
];

const ROUTES = [
    {
        path: '**',
        component: DocumentationCategoryComponent,
        data: {
            category: ResolverService.resolveCategoryData(DocumentationPage.Components, 'PDF Export')
        }
    }
];

@NgModule({
    imports: [
        TabsModule,
        DocumentationComponentsModule,
        PdfExportModule,
        ChartsModule,
        DashboardModule,
        SparkModule,
        CommonModule,
        RouterModule.forChild(ROUTES)
    ],
    exports: SECTIONS,
    declarations: SECTIONS,
    entryComponents: SECTIONS
})
export class ComponentsPdfExportModule {

    constructor(componentFactoryResolver: ComponentFactoryResolver, resolverService: ResolverService) {
        resolverService.registerResolver(componentFactoryResolver);
    }
}