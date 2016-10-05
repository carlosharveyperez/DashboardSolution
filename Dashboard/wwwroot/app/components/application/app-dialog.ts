import {Component, ViewChild} from '@angular/core';

import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

import { Modal } from 'ng2-modal';

@Component({
    moduleId: module.id,
    selector: 'application-dialog',
    templateUrl: 'app-dialog.html',
    styleUrls: ['app-dialog.css']
})
export class AppDialogComponent {
    @ViewChild('mainDialog') mainDialog: Modal;
    
    private message: string;
    private header: string;
    private commitLabel: string = 'YES';
    private cancelLabel: string = 'NO';
    private subs: Subscription;
    private isCloseButtonVisible : boolean = true;
   
    showYesNoMessage(header: string, msg: string) {
        this.header = header;
        this.message = msg;
        this.isCloseButtonVisible = true;
        this.commitLabel = 'YES';
        this.cancelLabel = 'NO';
        this.mainDialog.open();
    }

    showOKMessage(header: string, msg: string) {
        this.header = header;
        this.message = msg;
        this.isCloseButtonVisible = false;
        this.commitLabel = 'OK';
        this.mainDialog.open();
    }

    isCommitButton(event: any): boolean {
        return event[0] === this.commitLabel;
    }

    isCancelButton(event: any): boolean {
        return event[0] === this.cancelLabel;
    }

    ngOnInit(): void {
        
    }

    ngOnDestroy(): void {
        this.subs.unsubscribe();
    }

    onAfterCloseEvent() : Observable<boolean> {
        return Observable.create((observer) => {
            this.subs = this.mainDialog.onClose.subscribe((param) => {
                this.subs.unsubscribe();

                if (this.isCommitButton(param)) {
                    observer.next(true);
                } else {
                    observer.next(false);    
                }
            });
        });
    }
}