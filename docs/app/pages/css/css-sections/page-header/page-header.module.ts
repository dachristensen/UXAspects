import { NgModule, ComponentFactoryResolver } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DocumentationComponentsModule } from '../../../../components/components.module';
import { ResolverService, DocumentationPage } from '../../../../services/resolver/resolver.service';
import { DocumentationCategoryComponent } from '../../../../components/documentation-category/documentation-category.component';
import { TabsModule } from 'ngx-bootstrap/tabs';

import { CssNavigationHeaderComponent } from './navigation-header/navigation-header.component';
import { CssBreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { CssBreadcrumbFromStatesComponent } from './breadcrumb-from-states/breadcrumb-from-states.component';
import { CssBreadcrumbWithTabStateComponent } from './breadcrumb-with-tab-state/breadcrumb-with-tab-state.component';
import { CssCondensedHeaderComponent } from './condensed-header/condensed-header.component';
import { CssStandardHeaderComponent } from './standard-header/standard-header.component';
import { CssProductNameLogoComponent } from './product-name-logo/product-name-logo.component';
import { CssHeaderContentPanelComponent } from './header-content-panel/header-content-panel.component';
import { CssBackButtonComponent } from './back-button/back-button.component';
import { CssDynamicNameCalloutComponent } from './dynamic-name-callout/dynamic-name-callout.component';
import { CssStandardHeaderToolbarComponent } from './standard-header-toolbar/standard-header-toolbar.component';
import { CssHeaderNavTabToolbarComponent } from './header-nav-tab-toolbar/header-nav-tab-toolbar.component';
import { CssPageHeaderExampleComponent } from './page-header-example/page-header-example.component';
import { CssCondensedHeaderToolbarComponent } from './condensed-header-toolbar/condensed-header-toolbar.component';

const SECTIONS = [
    CssNavigationHeaderComponent,
    CssBreadcrumbComponent,
    CssBreadcrumbFromStatesComponent,
    CssBreadcrumbWithTabStateComponent,
    CssCondensedHeaderComponent,
    CssStandardHeaderComponent,
    CssCondensedHeaderToolbarComponent,
    CssProductNameLogoComponent,
    CssHeaderContentPanelComponent,
    CssBackButtonComponent,
    CssDynamicNameCalloutComponent,
    CssStandardHeaderToolbarComponent,
    CssHeaderNavTabToolbarComponent,
    CssPageHeaderExampleComponent
];

const ROUTES = [
    {
        path: '**',
        component: DocumentationCategoryComponent,
        data: {
            category: ResolverService.resolveCategoryData(DocumentationPage.Css, 'Page Header')
        }
    }
];

@NgModule({
    imports: [
        DocumentationComponentsModule,
        TabsModule,
        RouterModule.forChild(ROUTES)
    ],
    exports: SECTIONS,
    declarations: SECTIONS,
    entryComponents: SECTIONS
})
export class CssPageHeaderModule {

    constructor(componentFactoryResolver: ComponentFactoryResolver, resolverService: ResolverService) {
        resolverService.registerResolver(componentFactoryResolver);
    }
}