import { FileUpload, FileUploadFilesEvent } from 'primereact/fileupload';
interface IUpload {
    name: string,
    className?: string
    label: string

    onFileSelect: (file: File) => void;
}

export default function MUpload(props: IUpload) {


    const handleFileSelect = (event: FileUploadFilesEvent) => {
        const selectedFile = event.files[0];
        props.onFileSelect(selectedFile);
    };

    return (
        <div className={props.className}>
            <FileUpload
                mode="basic"
                {...props}
                accept="image/*"
                maxFileSize={2000000}
                chooseLabel={props.label}
                className={props.className}
                onSelect={handleFileSelect}
                onValidationFail={() => alert("File must be <2MB")}
            />

        </div>
    );
}
