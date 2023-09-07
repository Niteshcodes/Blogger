import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface IEditor {
  getValue: CallableFunction;
  defaultValue?: string | undefined
}

function MEditor(props: IEditor) {

  const handleChange = (content: string) => {

    props.getValue(content);
  };

  return <ReactQuill theme="snow" onChange={handleChange} defaultValue={props.defaultValue} />;
}

export default MEditor;
