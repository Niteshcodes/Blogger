import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const profileImage = localStorage.getItem("profileImage")
  const url = `http://localhost:8000/api/profile/${profileImage}`
  const navigate = useNavigate()
  const items = [
    {
      label: 'Home',
      // icon: 'pi pi-fw pi-file',
      visible: true,
      active: true,
      command: () => {
        navigate("/")
      }

    },
    {
      label: 'Write',
      // icon: 'pi pi-fw pi-pencil',
      visible: true,
      command: () => {
        localStorage.clear()
        navigate('/write')
      }


    },
    {
      // label: 'Profile',
      icon: <img src={url} className='w-[42px] h-[42px] rounded-[42px] border ' />,
      visible: true,
      items: [
        {
          label: 'logout',
          icon: 'pi pi-fw pi-user-plus',
          command: () => {
            localStorage.clear()
            navigate('/login')
          }

        },

      ]
    },

  ];
  // const navItem = items.filter((item) => item.isVisible)

  const start = <div className='flex justify-center items-center'>
    <Link to={"/"}><img alt="logo" src="/logo.png" height="10" className="w-[4vw] mr-9"></img></Link>
    <InputText placeholder="Search" type="text" className="w-full mr-8 h-10" />
  </div>;


  return (

    <Menubar model={items} start={start} className='h-[10vh] px-6 flex justify-between items-center ' />

  )
}
