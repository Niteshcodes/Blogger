import { Icon } from '@iconify/react';

interface ICard {
    image: string
    title: string
    description: string
    id: string
    onClick?: CallableFunction;
    handleDelete?: CallableFunction
    handleEdit?: CallableFunction

}

export default function Card(props: ICard) {
    const url = (props.image) ? `http://localhost:8000/api/profile/${props.image}` : "/logo.png"
    const handleOnClick = () => {
        if (props.onClick) {
            props.onClick(props.id)
        }
    }
    const handleDelete = () => {
        if (props.handleDelete) {
            props.handleDelete(props.id)
        }
    }
    const handleEdit = () => {
        if (props.handleEdit) {
            props.handleEdit(props.id)
        }
    }

    return (
        <div className="shadow-md hover:cursor-pointer hover:scale-105 rounded-lg">
            <div onClick={handleOnClick}>
                <div className="w-full h-[32vh] overflow-hidden flex justify-center items-center" id={props.id} >
                    <img src={url} className=' w-full rounded-lg' />
                </div>
                <div className='p-6'>
                    <h2 className='text-2xl font-mono font-bold '>{props.title}</h2>
                    <div className="text-sm h-[4vw] overflow-hidden">
                        <p className="line-clamp-3">
                            {props.description}
                        </p>
                    </div>

                </div>

            </div>
            <div className="flex justify-end p-4 gap-2">
                <Icon icon="iconamoon:edit-bold" className="flex hover:scale-105 justify-end items-end  p-2 border  rounded-[40px] h-[40px] w-[40px] bg-[#74ff3d] text-white " onClick={handleEdit} />
                <Icon icon="ic:baseline-delete" className="flex hover:scale-105 justify-end items-end  p-2 border  rounded-[40px] h-[40px] w-[40px] bg-[#ff3a3a] text-white " onClick={handleDelete} />
            </div>

        </div>
    )
}
