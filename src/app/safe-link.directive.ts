import { Directive, ElementRef, inject, input } from "@angular/core";
import { LogDirective } from "./log.directive";

@Directive({
    selector: 'a[appSafeLink]',
    standalone: true,
    host: {
        '(click)': 'onAlartLeavePage($event)'
    },
    hostDirectives: [LogDirective]
})

export class SafeLinkDirective {
    queryParam = input('myapp', {alias: 'appSafeLink'});
    private hostElementRef = inject<ElementRef<HTMLAnchorElement>>(ElementRef);

    constructor(){
        console.log('SafeLinkDirective is active');
    }

    onAlartLeavePage(event: MouseEvent) {
        const wantsToLeave = window.confirm('do you want to leave the app?');

        if (wantsToLeave){
            const address = this.hostElementRef.nativeElement.href;
            this.hostElementRef.nativeElement.href = address + '?from=' + this.queryParam();
            return;
        }

        event?.preventDefault();
    }
}