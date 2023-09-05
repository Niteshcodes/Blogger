import  { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface IEditor {
  getValue: CallableFunction;
  defaultValue?:string | undefined
}

function MEditor(props: IEditor) {
  const [value, setValue] = useState('');

  
  const handleChange = (content: string) => {
    setValue(content);
    props.getValue(content);
  };

  return <ReactQuill theme="snow"  onChange={handleChange} defaultValue={props.defaultValue}/>;
}

export default MEditor;
