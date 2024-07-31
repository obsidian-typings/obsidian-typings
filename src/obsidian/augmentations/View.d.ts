export {};

declare module "obsidian" {
    /** @todo Documentation incomplete */
    interface View extends Component {
        /**
         * Whether the leaf may close the view
         */
        closeable: boolean;
    }
}
