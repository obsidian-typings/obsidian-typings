interface PositionedReference extends Reference {
    /**
     * Position of the reference in the file
     */
    position: {
        start: Loc;
        end: Loc;
    };
}
