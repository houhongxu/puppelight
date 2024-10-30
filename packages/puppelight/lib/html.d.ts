import { Browser } from 'puppeteer';
export declare function outputHtml(html: string): Promise<void>;
export declare function generatePureHtml(html: string, browser: Browser): Promise<string>;
