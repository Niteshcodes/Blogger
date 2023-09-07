import { InputText } from "primereact/inputtext";
import { Control, Controller, FieldValues } from "react-hook-form";

export interface IInput {
    name: string;
    className?: string;
    label?: string;
    placeholder?: string;
    type?: string;
    control?: Control<FieldValues>;
    defaultValue?:string | undefined
}

export default function MInput(props: IInput) {
    return (
        <div className={props.className}>
            <label htmlFor={props.name}>{props.label}</label>
            <span className="p-float-label">
                {props.control ? (
                    <Controller
                        name={props.name}
                        control={props.control}                       
                        defaultValue={props.defaultValue}

                        render={({ field }) => (
                            <InputText
                                id={props.name}
                                type={props.type || "text"}
                                placeholder={props.placeholder}
                                {...field}
                                className="w-full"
                               
                                
                            />
                        )}
                    />
                ) : (
                    <InputText
                        id={props.name}
                        type={props.type || "text"}
                        placeholder={props.placeholder}
                        className="w-full"                       
                        defaultValue={"props.defaultValue"}


                    />
                )}
            </span>
        </div>
    );
}
