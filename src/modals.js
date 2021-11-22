import { Modal } from 'react-overlays';

export default function StyledModal(props) {
    return <Modal className="bg-white rounded p-6 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-96" {...props} renderBackdrop={props => {
        return <div {...props} className="bg-black-opacity-50 fixed top-0 left-0 bottom-0 right-0 backdrop-filter backdrop-blur-sm z-40" />;
    }} />;
}