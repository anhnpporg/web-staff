import { NgModule } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzTagModule } from 'ng-zorro-antd/tag';

@NgModule({
  declarations: [],
  exports: [
    NzButtonModule,
    NzLayoutModule,
    NzAvatarModule,
    NzAutocompleteModule,
    NzInputModule,
    NzIconModule,
    NzDividerModule,
    NzBadgeModule,
    NzSelectModule,
    NzInputNumberModule,
    NzNotificationModule,
    NzFormModule,
    NzModalModule,
    NzSpinModule,
    NzMenuModule,
    NzTagModule
    
  ]
})
export class AntdModule { }
