import { EventRef } from "./EventRef.d.ts";

export default interface Component {
    /**
     * Child Components attached to current component, will be unloaded on unloading parent component
     */
    _children: Component[];
    /**
     * Events that are attached to the current component, will be detached on unloading parent component
     */
    _events: EventRef[];
    /**
     * Whether the component and its children are loaded
     */
    _loaded: boolean;
}
