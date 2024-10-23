import { Directive, input } from "@angular/core";

@Directive({
    selector: 'a[appSafeLink]',
    standalone: true,
    host: {
        '(click)': 'onAlartLeavePage($event)'
    }
})

export class SafeLinkDirective {
    queryParam = input('myapp');

    constructor(){
        console.log('SafeLinkDirective is active');
    }

    onAlartLeavePage(event: MouseEvent) {
        const wantsToLeave = window.confirm('do you want to leave the app?');

        if (wantsToLeave){
            const address = (event.target as HTMLAnchorElement).href;
            (event.target as HTMLAnchorElement).href = address + '?from=' + this.queryParam();
            return;
        }

        event?.preventDefault();
    }
}