export default PropertyWidgetType;

/**
 * @todo Documentation incomplete
 */
type PropertyWidgetType =
    | "aliases"
    | "checkbox"
    | "date"
    | "datetime"
    | "multitext"
    | "number"
    | "tags"
    | "text"
    | (string & any);
