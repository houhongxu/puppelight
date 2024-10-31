export declare function run({ url, isGenerateHtml, isOpenServe, isHeadless, email, smtp, port, }: {
    url: string;
    isGenerateHtml?: boolean;
    isOpenServe?: boolean;
    isHeadless?: boolean;
    email?: string;
    port?: string;
    smtp?: string;
}): Promise<void>;
