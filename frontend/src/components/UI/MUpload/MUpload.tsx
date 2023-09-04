
import { FileUpload } from 'primereact/fileupload';
import { Control, Controller, FieldValues } from "react-hook-form";

interface IUpload {
    name: string,
    className?: string
    label: string
    control?: Control<FieldValues>;
    onFileSelect: (file: File) => void;
}

export default function MUpload(props: IUpload) {


    const handleFileSelect = (event) => {
        const selectedFile = event.files[0];
        props.onFileSelect(selectedFile);
    };

    return (
        <div className={props.className}>

            {props.control && (
                <Controller
                    name={props.name}
                    control={props.control}
                    defaultValue=""
                    render={({ field }) => (
                        <FileUpload
                            mode="basic"
                            {...field}
                            name={props.name}
                            accept="image/*"
                            // maxFileSize={1000000}
                            chooseLabel={props.label}
                            className={props.className}
                            onSelect={handleFileSelect}
                        />
                    )}
                />
            )}
        </div>
    );
}
