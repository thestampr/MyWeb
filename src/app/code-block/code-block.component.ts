import { Component, Input, AfterViewInit, ViewChild } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';


async function delay(ms: number): Promise<unknown> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function getRandomRange(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

function makeid(length: number): string {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}


@Component({
    selector: 'code-block',
    templateUrl: './code-block.component.html',
    styleUrls: ['./code-block.component.css']
})
export class CodeBlockComponent implements AfterViewInit {
    @ViewChild('copyTooltip') copyTooltip: MatTooltip;

    @Input() public lines: string[] = [];
    @Input() public format: string = "";
    @Input() public showHeader: boolean = true;
    @Input() public autoOneline: boolean = true;
    @Input() public allowCopy: boolean = true;

    @Input() public class: string = "";
    @Input() public showLinenumber: boolean = false;
    @Input() public displayCursor: boolean = false;
    @Input() public typingAnimation: boolean = false;

    public el_id: string = makeid(6);

    public displayLines: string[] = [];
    public tooltipCopyMessage: string = "Copy";

    constructor() {}

    async ngAfterViewInit() {
        if (this.allowCopy) {
            const i = document.getElementById(`copy-btn-${this.el_id}`)!;
            if (i) {
                i.addEventListener("click", () => {
                    this.tooltipCopyMessage = "Coppied";
                    this.copyTooltip.show();
                });
                i.addEventListener("mouseleave", () => {
                    setTimeout(() => {
                        this.tooltipCopyMessage = "Copy";
                    }, 100);
                });
            }
        }

        if (this.typingAnimation) {
            await this.Typing(this.lines);
        } else {
            this.displayLines = this.lines;
        }
    }

    private async Typing(lines: string[]) {
        let index = this.displayLines.length;
        let scrollX: boolean = false;
        let isAgain: boolean = false;

        this.displayLines[index] = "";
        
        await delay(2000);
        let wrapperX = document.getElementById(`code-${this.el_id}`)!;
        let wrapperY = document.getElementById(`code-wrapper-${this.el_id}`)!;

        for (let line of lines) {
            let lineText = "";
            this.displayLines[index] = "";

            if (isAgain && !(line === lines[index-1])) {
                await delay(500);
            }

            scrollX = false;
            if (index != 0) {
                isAgain = line === lines[index-1];
            } else {
                isAgain = false;
            }
            
            for (let c of line) {
                await delay(getRandomRange(50, 100));
                lineText += c;
                this.displayLines[index] = lineText;
                
                let cursor = document.getElementById(`code-cursor-${this.el_id}-${index}`)!;
                if (cursor) {
                    if (wrapperX && wrapperX.offsetWidth < cursor.offsetLeft+128) {
                        wrapperX.scrollTo({
                            left: cursor.offsetLeft
                        });
                        scrollX = true;
                    }
                    if (wrapperY) {
                        wrapperY.scrollTo({
                            top: cursor.offsetTop
                        });
                    }
                }
            }
            index += 1;
            this.displayLines[index] = "";

            if (wrapperX && scrollX) {
                wrapperX.scrollTo({
                    left: 0, 
                    behavior: "smooth"
                });
                await delay(500);
            } else {
                if (isAgain) {
                    await delay(50);
                } else {
                    await delay(getRandomRange(200, 250));
                }
            }
        }
    }
}