import { Button } from 'primereact/button';
interface IButton {
  type: "button" | "reset" | "submit",
  label: string
  className?: string
}

export default function MButton(props: IButton) {
  return (

    <Button {...props} />

  )
}
