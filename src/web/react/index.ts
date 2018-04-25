/**
 * test target Component is a stateless component
 *
 * ref: https://github.com/solkimicreb/react-easy-state
 *
 * @param Comp
 */
export const isStatelessComp = (Comp: any) => !(Comp.prototype && Comp.prototype.isReactComponent)

/**
 * get wrapped component's display name
 * @param WrappedComponent
 */
export function getDisplayName(WrappedComponent: Function & { displayName: string }) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}
