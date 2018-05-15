import * as React from 'react';
import * as ReactDOM from 'react-dom';

const modalRoot = document.getElementById('modal-root')!;

class Modal extends React.Component<{}> {
  modalElement: HTMLElement;
  modalRoot: HTMLElement;

  constructor(props: {}) {
    super(props);
    // Create a div that we'll render the modal into. Because each
    // Modal component has its own element, we can render multiple
    // modal components into the modal container.
    this.modalElement = document.createElement('div');
  }

  componentDidMount() {
    // Append the element into the DOM on mount. We'll render
    // into the modal container element (see the HTML tab).
    modalRoot.appendChild(this.modalElement);
  }

  componentWillUnmount() {
    // Remove the element from the DOM when we unmount
    modalRoot.removeChild(this.modalElement);
  }

  render() {
    // Use a portal to render the children into the element
    return ReactDOM.createPortal(
      // Any valid React child: JSX, strings, arrays, etc.
      (
        <div className="modal">
          {this.props.children}
        </div>
      ),
      // A DOM element
      this.modalElement,
    );
  }
}

export default Modal;