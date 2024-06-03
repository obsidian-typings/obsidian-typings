export { };

declare module "obsidian" {
    interface EventRef {
        /**
         * Context applied to the event callback
         */
        ctx?: unknown;
        /**
         * Events object the event was registered on
         */
        e: Events;
        /**
         * Event name the event was registered on
         */
        name: string;

        /**
         * Function to be called on event trigger on the events object
         */
        fn(...arg: unknown[]): void;
    }
}
