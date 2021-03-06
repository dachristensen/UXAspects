import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { ICodePenProvider } from '../../../../../interfaces/ICodePenProvider';
import { ICodePen } from '../../../../../interfaces/ICodePen';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';

@Component({
    selector: 'uxd-components-tree-view-ng1',
    templateUrl: './tree-view-ng1.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
@DocumentationSectionComponent('ComponentsTreeViewNg1Component')
export class ComponentsTreeViewNg1Component extends BaseDocumentationSection implements ICodePenProvider {

    codepen: ICodePen = {
        html: this.snippets.raw.sampleHtml,
        htmlAttributes: {
            'ng-controller': 'TreeViewDocumentationCtrl as vm'
        },
        js: [this.snippets.raw.sampleJs]
    };
    
    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }
}