import  { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface IEditor {
  getValue: CallableFunction;
}

function MEditor(props: IEditor) {
  const [value, setValue] = useState('');

  
  const handleChange = (content: string) => {
    setValue(content);
    props.getValue(content);
  };

  return <ReactQuill theme="snow" value={value} onChange={handleChange} />;
}

export default MEditor;
