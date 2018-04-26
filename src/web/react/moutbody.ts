/* tslint:disable:no-implicit-dependencies */
// @ts-ignore
import { Component } from 'react'
// @ts-ignore
import ReactDOM from 'react-dom'

export default class MountBody extends Component {
    el: any
    props: any

    constructor(props: any) {
        super(props)
        this.el = document.createElement('div')
    }
    componentWillMount() {
        document.body.appendChild(this.el)
    }

    componentWillUnmount() {
        document.body.removeChild(this.el)
    }

    render() {
        return ReactDOM.createPortal(this.props.children, this.el)
    }
}
